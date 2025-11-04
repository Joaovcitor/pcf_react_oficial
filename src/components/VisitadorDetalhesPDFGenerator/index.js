import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';

const VisitadorDetalhesPDFGenerator = ({
  visitador,
  childrens,
  planos,
  visitasFeitas,
  inicioMes,
  fimMes,
}) => {
  const formatDate = (value) => {
    try {
      if (!value) return '-';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return String(value);
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    } catch (e) {
      return String(value);
    }
  };

  const getStatus = (visita) => {
    const finished = visita?.isFinished === true || visita?.visita_marcada_finalizada === true;
    const invalid = visita?.isFakeVisit === true || visita?.visita_mentirosa === true || Boolean(visita?.motivo_da_invalidacao);
    const pending = visita?.isValidationPending === true || visita?.visita_marcada_finalizada === false || (!finished && !invalid);
    return {
      finished,
      invalid,
      pending,
      label: finished ? 'Finalizada' : invalid ? 'Inválida' : 'Pendente',
    };
  };

  const drawSectionTitle = (doc, text, x, y) => {
    doc.setTextColor(34, 34, 34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(text, x, y);
    return y + 18; // espaço extra após título
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 36; // ~1,27cm
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const ensureSpace = (needed = 0) => {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const text = (value, x, yPos, options = {}) => {
      const lineHeight = options.lineHeight || 16;
      const safeText = value == null ? '-' : String(value);
      const lines = doc.splitTextToSize(safeText, options.maxWidth || contentWidth);
      // desenha linha a linha para garantir espaçamento consistente
      let cy = yPos;
      lines.forEach((ln) => {
        doc.text(ln, x, cy);
        cy += lineHeight;
      });
      return cy;
    };

    // Cabeçalho
    doc.setFillColor(17, 180, 217);
    doc.rect(0, 0, pageWidth, 60, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Relatório Técnico do Visitador', margin, 38);
    doc.setFontSize(11);
    doc.text(`Gerado em ${formatDate(new Date())}`, pageWidth - margin - 160, 38);

    // Identificação
    y = 80;
    y = drawSectionTitle(doc, 'Identificação', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const idLines = [
      `Nome: ${visitador?.name || '-'}`,
      `Email: ${visitador?.email || '-'}`,
      `Território: ${visitador?.territorio || '-'}`,
      `CRAS: ${visitador?.cras || '-'}`,
      `Status: ${visitador?.isActive ? 'Ativo' : 'Inativo'}${visitador?.isPending ? ' • Pendente' : ''}`,
    ];
    ensureSpace(idLines.length * 18);
    idLines.forEach((line) => {
      y = text(line, margin, y, { maxWidth: contentWidth, lineHeight: 16 });
    });

    // Período aplicado
    y += 12;
    y = drawSectionTitle(doc, 'Período do Relatório', margin, y);
    y = text(
      inicioMes && fimMes
        ? `${formatDate(inicioMes)} a ${formatDate(fimMes)}`
        : 'Período completo (sem filtro de datas) ',
      margin,
      y,
      { maxWidth: contentWidth, lineHeight: 16 }
    );

    // KPIs principais
    y += 6;
    y = drawSectionTitle(doc, 'Resumo Técnico', margin, y);
    const visitasStatus = visitasFeitas.map(getStatus);
    const totalVisitas = visitasFeitas.length;
    const totalFinalizadas = visitasStatus.filter((v) => v.finished).length;
    const totalPendentes = visitasStatus.filter((v) => v.pending).length;
    const totalInvalidas = visitasStatus.filter((v) => v.invalid).length;
    const taxaFinalizacao = totalVisitas > 0 ? Math.round((totalFinalizadas / totalVisitas) * 100) : 0;
    const taxaInvalidacao = totalVisitas > 0 ? Math.round((totalInvalidas / totalVisitas) * 100) : 0;

    const kpiData = [
      { label: 'Beneficiários vinculados', value: childrens?.length || 0 },
      { label: 'Planos criados', value: planos?.length || 0 },
      { label: 'Visitas registradas', value: totalVisitas },
      { label: 'Taxa de finalização', value: `${taxaFinalizacao}%` },
      { label: 'Taxa de invalidação', value: `${taxaInvalidacao}%` },
    ];

    // Blocos de KPIs (2 colunas)
    const colWidth = (contentWidth - 16) / 2;
    const kpiHeight = 60;
    ensureSpace(kpiData.length / 2 * (kpiHeight + 10));
    doc.setFontSize(11);
    kpiData.forEach((kpi, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = margin + col * (colWidth + 16);
      const boxY = y + row * (kpiHeight + 10);
      doc.setDrawColor(220);
      doc.setFillColor(245);
      doc.roundedRect(x, boxY, colWidth, kpiHeight, 6, 6, 'F');
      doc.setTextColor(80);
      doc.setFont('helvetica', 'bold');
      doc.text(String(kpi.value), x + 10, boxY + 26);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(110);
      doc.text(kpi.label, x + 10, boxY + 46);
    });
    y += Math.ceil(kpiData.length / 2) * (kpiHeight + 10) + 6;

    // Gráfico de barras – Status das visitas
    y = drawSectionTitle(doc, 'Status das Visitas', margin, y);
    const chartMax = Math.max(totalFinalizadas, totalPendentes, totalInvalidas, 1);
    const chartWidth = contentWidth;
    const chartHeight = 130;
    ensureSpace(chartHeight + 40);
    const barWidth = 50;
    const gap = (chartWidth - barWidth * 3) / 4;
    const labelArea = 28;
    const baseY = y + chartHeight - labelArea; // reserva área de labels
    const startX = margin + gap;

    const drawBar = (x, value, colorRGB, label) => {
      const h = Math.round(((chartHeight - 40) * value) / chartMax);
      doc.setFillColor(...colorRGB);
      doc.rect(x, baseY - h, barWidth, h, 'F');
      doc.setTextColor(60);
      doc.setFont('helvetica', 'bold');
      doc.text(String(value), x + barWidth / 2, baseY - h - 8, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(90);
      doc.text(label, x + barWidth / 2, baseY + labelArea - 10, { align: 'center' });
    };

    drawBar(startX, totalFinalizadas, [48, 140, 80], 'Finalizadas');
    drawBar(startX + gap + barWidth, totalPendentes, [255, 165, 0], 'Pendentes');
    drawBar(startX + (gap + barWidth) * 2, totalInvalidas, [220, 53, 69], 'Inválidas');
    y += chartHeight + 30; // espaço extra após gráfico

    // Motivos de invalidação (top N)
    const motivos = {};
    visitasFeitas.forEach((v) => {
      const motivo = v?.motivo_da_invalidacao || v?.motivoDaInvalidacao || v?.motivo_da_nao_realizacao || null;
      const status = getStatus(v);
      if (status.invalid && motivo) motivos[motivo] = (motivos[motivo] || 0) + 1;
    });
    const motivosArr = Object.entries(motivos)
      .map(([motivo, qtd]) => ({ motivo, qtd }))
      .sort((a, b) => b.qtd - a.qtd)
      .slice(0, 6);

    y = drawSectionTitle(doc, 'Principais Motivos de Invalidação', margin, y);
    if (motivosArr.length === 0) {
      y = text('Sem registros de invalidação no período.', margin, y, { maxWidth: contentWidth, lineHeight: 16 });
    } else {
      motivosArr.forEach(({ motivo, qtd }) => {
        ensureSpace(20);
        y = text(`• ${motivo} (${qtd})`, margin, y, { maxWidth: contentWidth, lineHeight: 16 });
      });
    }

    // Detalhes das visitas (tabela enxuta)
    y += 12;
    y = drawSectionTitle(doc, 'Detalhes das Visitas', margin, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    ensureSpace(32);
    const col = [
      { key: 'data', label: 'Data', width: 90 },
      { key: 'beneficiario', label: 'Beneficiário', width: contentWidth - 90 - 90 - 120 },
      { key: 'status', label: 'Status', width: 90 },
      { key: 'motivo', label: 'Motivo', width: 120 },
    ];
    let x = margin;
    const headerY = y;
    col.forEach((c) => {
      doc.text(c.label, x + 4, headerY);
      x += c.width;
    });
    y += 16;
    doc.setDrawColor(220);
    doc.line(margin, y - 12, margin + contentWidth, y - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    const rows = visitasFeitas.map((v) => {
      const s = getStatus(v);
      const childName = v?.child?.name || v?.crianca_name || v?.nome_crianca || '-';
      const motivo = v?.motivo_da_invalidacao || v?.motivoDaInvalidacao || v?.motivo_da_nao_realizacao || '';
      return {
        data: formatDate(v?.createdAt || v?.data || v?.date),
        beneficiario: childName,
        status: s.label,
        motivo: s.invalid ? motivo : '',
      };
    });

    rows.forEach((row) => {
      ensureSpace(18);
      let cx = margin;
      const lineHeight = 14;
      const linesData = doc.splitTextToSize(row.data, col[0].width - 8);
      const linesBenef = doc.splitTextToSize(row.beneficiario, col[1].width - 8);
      const linesStatus = doc.splitTextToSize(row.status, col[2].width - 8);
      const linesMotivo = doc.splitTextToSize(row.motivo || '-', col[3].width - 8);
      const maxLines = Math.max(
        linesData.length,
        linesBenef.length,
        linesStatus.length,
        linesMotivo.length
      );
      const rowHeight = maxLines * lineHeight + 10;
      ensureSpace(rowHeight + 6);
      // Caixa da linha
      doc.setDrawColor(235);
      doc.roundedRect(cx, y - 12, contentWidth, rowHeight, 3, 3);

      // Colunas
      doc.text(linesData, cx + 4, y);
      cx += col[0].width;
      doc.text(linesBenef, cx + 4, y);
      cx += col[1].width;
      doc.text(linesStatus, cx + 4, y);
      cx += col[2].width;
      doc.text(linesMotivo, cx + 4, y);
      y += rowHeight + 10;
    });

    // Rodapé
    doc.setTextColor(120);
    doc.setFontSize(9);
    ensureSpace(20);
    doc.text(
      'Relatório técnico gerado para análise de produtividade e conformidade.',
      margin,
      pageHeight - margin
    );

    doc.save(`Relatorio_${(visitador?.name || 'visitador').replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <Button variant="contained" startIcon={<PdfIcon />} onClick={generatePDF} sx={{ ml: 1 }}>
      Exportar PDF
    </Button>
  );
};

VisitadorDetalhesPDFGenerator.propTypes = {
  visitador: PropTypes.object,
  childrens: PropTypes.array,
  planos: PropTypes.array,
  visitasFeitas: PropTypes.array,
  inicioMes: PropTypes.string,
  fimMes: PropTypes.string,
};

VisitadorDetalhesPDFGenerator.defaultProps = {
  visitador: {},
  childrens: [],
  planos: [],
  visitasFeitas: [],
  inicioMes: '',
  fimMes: '',
};

export default VisitadorDetalhesPDFGenerator;