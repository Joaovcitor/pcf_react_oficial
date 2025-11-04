import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';

const VisitasPDFGenerator = ({ visitas, stats, periodoLabel }) => {
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

  const statusVisita = (v) => {
    const finished = v?.isFinished === true || v?.visita_marcada_finalizada === true;
    const invalid = v?.isFakeVisit === true || v?.visita_mentirosa === true;
    const pending = v?.isValidationPending === true || v?.isFinished === false || v?.visita_marcada_finalizada === false;
    const label = finished ? 'Finalizada' : invalid ? 'Inválida' : pending ? 'Pendente' : 'Em andamento';
    const color = finished ? [48, 140, 80] : invalid ? [220, 53, 69] : pending ? [255, 165, 0] : [33, 150, 243];
    return { finished, invalid, pending, label, color };
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 36;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const ensureSpace = (needed = 0) => {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const drawTitle = (text) => {
      doc.setTextColor(34, 34, 34);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(text, margin, y);
      y += 18;
    };

    const text = (value, x, yPos, options = {}) => {
      const lineHeight = options.lineHeight || 16;
      const safeText = value == null ? '-' : String(value);
      const lines = doc.splitTextToSize(safeText, options.maxWidth || contentWidth);
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
    doc.text('Relatório de Visitas', margin, 38);
    doc.setFontSize(11);
    doc.text(`Gerado em ${formatDate(new Date())}`, pageWidth - margin - 160, 38);

    // Período e resumo
    y = 80;
    drawTitle('Período');
    y = text(periodoLabel || 'Período completo (sem filtro)', margin, y, { maxWidth: contentWidth });

    y += 8;
    drawTitle('Resumo');
    const kpiData = [
      { label: 'Total de visitas', value: stats?.total || visitas.length },
      { label: 'Finalizadas', value: stats?.finalizadas ?? visitas.filter((v) => statusVisita(v).finished).length },
      { label: 'Pendentes', value: stats?.pendentes ?? visitas.filter((v) => statusVisita(v).pending).length },
      { label: 'Inválidas', value: stats?.invalidas ?? visitas.filter((v) => statusVisita(v).invalid).length },
    ];
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
    y += Math.ceil(kpiData.length / 2) * (kpiHeight + 10) + 12;

    // Mapa simplificado
    drawTitle('Mapa Simplificado das Coordenadas');
    const points = visitas.filter((v) => typeof v.latitude === 'number' && typeof v.longitude === 'number');
    if (points.length > 0) {
      const minLat = Math.min(...points.map((p) => p.latitude));
      const maxLat = Math.max(...points.map((p) => p.latitude));
      const minLng = Math.min(...points.map((p) => p.longitude));
      const maxLng = Math.max(...points.map((p) => p.longitude));
      const mapWidth = contentWidth;
      const mapHeight = 180;
      ensureSpace(mapHeight + 60);
      const mapX = margin;
      const mapY = y;
      doc.setDrawColor(180);
      doc.roundedRect(mapX, mapY, mapWidth, mapHeight, 6, 6);

      const scaleX = (lng) => {
        const span = maxLng - minLng || 1e-9;
        return mapX + 10 + ((lng - minLng) / span) * (mapWidth - 20);
      };
      const scaleY = (lat) => {
        const span = maxLat - minLat || 1e-9;
        // Y cresce para baixo; invertendo para que maior latitude fique acima
        return mapY + 10 + (1 - (lat - minLat) / span) * (mapHeight - 20);
      };

      points.forEach((p) => {
        const { color } = statusVisita(p);
        doc.setFillColor(...color);
        doc.circle(scaleX(p.longitude), scaleY(p.latitude), 3, 'F');
      });

      // Legenda
      const legendY = mapY + mapHeight + 18;
      const legendItems = [
        { label: 'Finalizadas', color: [48, 140, 80] },
        { label: 'Pendentes', color: [255, 165, 0] },
        { label: 'Inválidas', color: [220, 53, 69] },
        { label: 'Em andamento', color: [33, 150, 243] },
      ];
      let lx = margin;
      legendItems.forEach((item) => {
        doc.setFillColor(...item.color);
        doc.rect(lx, legendY - 8, 10, 10, 'F');
        doc.setTextColor(60);
        doc.text(item.label, lx + 16, legendY);
        lx += 110;
      });

      y = legendY + 20;
    } else {
      y = text('Sem coordenadas válidas para exibir.', margin, y, { maxWidth: contentWidth });
      y += 10;
    }

    // Tabela de detalhes
    drawTitle('Detalhes das Visitas');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    ensureSpace(32);
    const col = [
      { key: 'data', label: 'Data', width: 80 },
      { key: 'visitador', label: 'Visitador', width: 140 },
      { key: 'beneficiario', label: 'Beneficiário', width: 140 },
      { key: 'cuidador', label: 'Cuidador', width: 120 },
      { key: 'status', label: 'Status', width: 90 },
      { key: 'coords', label: 'Lat/Lng', width: contentWidth - 80 - 140 - 140 - 120 - 90 },
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

    const rows = (visitas || []).map((v) => {
      const s = statusVisita(v);
      return {
        data: formatDate(v?.createdAt || v?.data || v?.date),
        visitador: v?.visitor?.name || v?.visitador_name || '-',
        beneficiario: v?.child?.name || v?.crianca_name || '-',
        cuidador: v?.caregiver?.name || v?.cuidador_name || '-',
        status: s.label,
        coords: typeof v?.latitude === 'number' && typeof v?.longitude === 'number' ? `${v.latitude.toFixed(5)}, ${v.longitude.toFixed(5)}` : '-',
      };
    });

    rows.forEach((row) => {
      ensureSpace(24);
      let cx = margin;
      const lineHeight = 14;
      const linesData = doc.splitTextToSize(row.data, col[0].width - 8);
      const linesVisitador = doc.splitTextToSize(row.visitador, col[1].width - 8);
      const linesBenef = doc.splitTextToSize(row.beneficiario, col[2].width - 8);
      const linesCuidador = doc.splitTextToSize(row.cuidador, col[3].width - 8);
      const linesStatus = doc.splitTextToSize(row.status, col[4].width - 8);
      const linesCoords = doc.splitTextToSize(row.coords, col[5].width - 8);
      const maxLines = Math.max(
        linesData.length,
        linesVisitador.length,
        linesBenef.length,
        linesCuidador.length,
        linesStatus.length,
        linesCoords.length
      );
      const rowHeight = maxLines * lineHeight + 10;
      ensureSpace(rowHeight + 8);
      doc.setDrawColor(235);
      doc.roundedRect(cx, y - 12, contentWidth, rowHeight, 3, 3);

      doc.text(linesData, cx + 4, y);
      cx += col[0].width;
      doc.text(linesVisitador, cx + 4, y);
      cx += col[1].width;
      doc.text(linesBenef, cx + 4, y);
      cx += col[2].width;
      doc.text(linesCuidador, cx + 4, y);
      cx += col[3].width;
      doc.text(linesStatus, cx + 4, y);
      cx += col[4].width;
      doc.text(linesCoords, cx + 4, y);
      y += rowHeight + 10;
    });

    // Rodapé
    doc.setTextColor(120);
    doc.setFontSize(9);
    ensureSpace(20);
    doc.text('Relatório exportado com base no endpoint /visitasporgeolo/coordenador/all.', margin, pageHeight - margin);

    doc.save('Relatorio_Visitas.pdf');
  };

  return (
    <Button variant="contained" startIcon={<PdfIcon />} onClick={generatePDF} sx={{ ml: 1 }}>
      Exportar PDF
    </Button>
  );
};

VisitasPDFGenerator.propTypes = {
  visitas: PropTypes.array,
  stats: PropTypes.shape({
    total: PropTypes.number,
    finalizadas: PropTypes.number,
    pendentes: PropTypes.number,
    invalidas: PropTypes.number,
  }),
  periodoLabel: PropTypes.string,
};

VisitasPDFGenerator.defaultProps = {
  visitas: [],
  stats: { total: 0, finalizadas: 0, pendentes: 0, invalidas: 0 },
  periodoLabel: '',
};

export default VisitasPDFGenerator;