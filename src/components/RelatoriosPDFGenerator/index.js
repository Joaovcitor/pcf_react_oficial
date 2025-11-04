import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';

// Util: formatar data AAAA-MM-DD -> DD/MM/AAAA
const formatDate = (value) => {
  if (!value) return null;
  try {
    const d = new Date(value);
    if (!isNaN(d)) {
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
    // fallback para valores tipo '2024-10-01'
    const [yyyy, mm, dd] = String(value).split('-');
    if (yyyy && mm && dd) return `${dd}/${mm}/${yyyy}`;
  } catch (e) {
    // Fallback seguro em caso de erro de parsing
    return String(value);
  }
  return String(value);
};

const drawKpiCard = (doc, x, y, w, h, title, value, color) => {
  doc.setDrawColor(230);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x, y, w, h, 3, 3, 'FD');
  // título
  doc.setTextColor(80);
  doc.setFontSize(10);
  doc.text(title, x + 8, y + 14);
  // valor destacado
  const [r, g, b] = color;
  doc.setTextColor(r, g, b);
  doc.setFontSize(20);
  doc.text(String(value), x + 8, y + 34);
};

const drawProgressBar = (doc, x, y, w, h, pct, color) => {
  // moldura
  doc.setDrawColor(180);
  doc.roundedRect(x, y, w, h, 2, 2, 'S');
  // preenchimento
  const fillWidth = Math.max(0, Math.min(w, (pct / 100) * w));
  const [r, g, b] = color;
  doc.setFillColor(r, g, b);
  doc.roundedRect(x, y, fillWidth, h, 2, 2, 'F');
};

const computeVisitStatusCounts = (visitas = []) => {
  const finalizadas = visitas.filter(v => v?.isFinished).length;
  const pendentes = visitas.filter(v => v?.isValidationPending).length;
  const invalidas = visitas.filter(v => v?.isFakeVisit || v?.visita_mentirosa).length;
  return { finalizadas, pendentes, invalidas, total: visitas.length };
};

// Chip com largura dinâmica
const drawChip = (doc, x, y, label, value, rgb) => {
  const padX = 6;
  const padY = 3;
  const content = `${label}: ${value}`;
  doc.setFontSize(10);
  const tw = doc.getTextWidth(content);
  const w = tw + padX * 2;
  const h = 10;
  doc.setDrawColor(220);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x, y, w, h, 2, 2, 'FD');
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  doc.text(content, x + padX, y + h - padY);
  return w; // retorna a largura ocupada para posicionamento sequencial
};

// Gráfico de barras horizontais simples
const drawStatusBarChart = (doc, x, y, w, h, data) => {
  // Moldura
  doc.setDrawColor(210);
  doc.roundedRect(x, y, w, h, 3, 3, 'S');
  const innerPad = 8;
  const gx = x + innerPad;
  const gy = y + innerPad;
  const gh = h - innerPad * 2;
  const rowH = Math.floor(gh / data.length);
  const maxVal = Math.max(1, ...data.map(d => d.value));

  doc.setFontSize(9);
  doc.setTextColor(60);

  data.forEach((d, i) => {
    const rowY = gy + i * rowH + 2;
    const barW = Math.max(4, Math.round(((d.value / maxVal) * (w - innerPad * 2 - 80))));
    const [r, g, b] = d.color;
    // rótulo
    doc.text(d.label, gx, rowY + 6);
    // barra
    doc.setFillColor(r, g, b);
    doc.roundedRect(gx + 50, rowY, barW, 8, 2, 2, 'F');
    // valor
    doc.setTextColor(100);
    doc.text(String(d.value), gx + 50 + barW + 6, rowY + 6);
  });
};

const RelatoriosPDFGenerator = ({
  visitadores,
  childrens,
  planos,
  visitasFeitas,
  caregivers,
  inicioMes,
  fimMes,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 16;

    // Paleta
    const primary = [25, 118, 210]; // #1976d2
    const success = [56, 142, 60];  // #388e3c
    const warning = [245, 124, 0];  // #f57c00
    const danger = [211, 47, 47];   // #d32f2f
    const purple = [123, 31, 162];  // #7b1fa2

    // Cabeçalho estilizado
    doc.setFillColor(primary[0], primary[1], primary[2]);
    doc.rect(0, 0, pageWidth, 24, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Relatório Geral de Visitadores', margin, 14);
    doc.setFontSize(10);
    const generatedAt = new Date();
    doc.text(`Gerado em ${formatDate(generatedAt)} ${generatedAt.toLocaleTimeString()}`, margin, 20);

    // Período
    let cursorY = 32;
    doc.setTextColor(50);
    doc.setFontSize(12);
    const hasPeriodo = inicioMes && fimMes;
    doc.text('Resumo do Período', margin, cursorY);
    doc.setFontSize(10);
    cursorY += 6;
    doc.text(hasPeriodo ? `Período: ${formatDate(inicioMes)} até ${formatDate(fimMes)}` : 'Período: Todos os dados disponíveis', margin, cursorY);

    // KPIs em grade
    cursorY += 10;
    const cardW = (pageWidth - margin * 2 - 10) / 2;
    const cardH = 28;
    const x1 = margin;
    const x2 = margin + cardW + 10;

    drawKpiCard(doc, x1, cursorY, cardW, cardH, 'Usuários no sistema', visitadores.length, primary);
    drawKpiCard(doc, x2, cursorY, cardW, cardH, 'Crianças cadastradas', childrens.length, success);
    cursorY += cardH + 8;
    drawKpiCard(doc, x1, cursorY, cardW, cardH, 'Planos de visitas', planos.length, warning);
    drawKpiCard(doc, x2, cursorY, cardW, cardH, 'Visitas registradas', visitasFeitas.length, danger);
    cursorY += cardH + 8;
    drawKpiCard(doc, x1, cursorY, cardW, cardH, 'Cuidadores', caregivers.length, purple);

    // Meta de beneficiários
    cursorY += cardH + 12;
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text('Meta de Beneficiários (600)', margin, cursorY);
    cursorY += 6;
    const pctMeta = Math.min(100, Math.round((childrens.length / 600) * 100));
    drawProgressBar(doc, margin, cursorY, pageWidth - margin * 2, 8, pctMeta, success);
    cursorY += 14;
    doc.setFontSize(10);
    doc.text(`${pctMeta}% alcançado • ${Math.max(0, 600 - childrens.length)} restantes`, margin, cursorY);

    // Quebra de status de visitas
    const { finalizadas, pendentes, invalidas, total } = computeVisitStatusCounts(visitasFeitas);
    cursorY += 12;
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text('Status das Visitas', margin, cursorY);
    cursorY += 6;
    let chipsX = margin;
    chipsX += drawChip(doc, chipsX, cursorY, 'Finalizadas', finalizadas, success) + 6;
    chipsX += drawChip(doc, chipsX, cursorY, 'Pendentes', pendentes, warning) + 6;
    drawChip(doc, chipsX, cursorY, 'Inválidas', invalidas, danger);
    cursorY += 20;
    doc.setTextColor(100);
    doc.setFontSize(9);
    doc.text(`Total de visitas: ${total}`, margin, cursorY);

    // Gráfico de barras de status
    cursorY += 8;
    drawStatusBarChart(doc, margin, cursorY, pageWidth - margin * 2, 50, [
      { label: 'Finalizadas', value: finalizadas, color: success },
      { label: 'Pendentes', value: pendentes, color: warning },
      { label: 'Inválidas', value: invalidas, color: danger },
    ]);
    cursorY += 60;

    // Tabela: Top Visitadores (por crianças)
    cursorY += 12;
    doc.setTextColor(50);
    doc.setFontSize(12);
    doc.text('Top Visitadores por Indicadores', margin, cursorY);
    cursorY += 6;
    doc.setFontSize(9);

    const truncate = (t, n) => (t && t.length > n ? `${t.slice(0, n - 1)}…` : t || 'Visitador');
    const rows = (visitadores || [])
      .map(v => ({
        nome: truncate(v?.name || v?.username, 28),
        criancas: Array.isArray(v?.children) ? v.children.length : 0,
        planos: Array.isArray(v?.planosDeVisitas) ? v.planosDeVisitas.length : 0,
        visitas: Array.isArray(v?.visitasPorGeolocalizacaos) ? v.visitasPorGeolocalizacaos.length : 0,
        cuidadores: Array.isArray(v?.visitorCaregivers) ? v.visitorCaregivers.length : 0,
      }))
      .sort((a, b) => b.criancas - a.criancas)
      .slice(0, 8);

    // Cabeçalho da tabela
    const colX = [margin, margin + 90, margin + 120, margin + 150, margin + 180];
    const headerY = cursorY;
    const rowH = 8;
    doc.setTextColor(255);
    doc.setFillColor(primary[0], primary[1], primary[2]);
    doc.rect(margin, headerY - 6, pageWidth - margin * 2, rowH, 'F');
    doc.text('Visitador', colX[0] + 2, headerY);
    doc.text('Crianças', colX[1] + 2, headerY);
    doc.text('Planos', colX[2] + 2, headerY);
    doc.text('Visitas', colX[3] + 2, headerY);
    doc.text('Cuidadores', colX[4] + 2, headerY);

    let tableY = headerY + 6;
    doc.setTextColor(60);
    rows.forEach((r, idx) => {
      if (tableY > pageHeight - margin - 12) {
        doc.addPage();
        tableY = margin + 6;
      }
      // zebra
      if (idx % 2 === 0) {
        doc.setFillColor(245, 247, 249);
        doc.rect(margin, tableY - 6, pageWidth - margin * 2, rowH, 'F');
      }
      doc.setFontSize(9);
      doc.text(r.nome, colX[0] + 2, tableY);
      doc.text(String(r.criancas), colX[1] + 2, tableY);
      doc.text(String(r.planos), colX[2] + 2, tableY);
      doc.text(String(r.visitas), colX[3] + 2, tableY);
      doc.text(String(r.cuidadores), colX[4] + 2, tableY);
      tableY += rowH;
    });

    // Rodapé
    doc.setFontSize(8);
    doc.setTextColor(130);
    const footerY = pageHeight - 10;
    doc.text('PCF - Relatórios de Visitadores • Documento gerado automaticamente', margin, footerY);

    doc.save('Relatorio_Visitadores.pdf');
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<PdfIcon />}
      onClick={generatePDF}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        py: 1,
        px: 2,
        backgroundColor: '#1976d2',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
      }}
    >
      Exportar PDF
    </Button>
  );
};

RelatoriosPDFGenerator.propTypes = {
  visitadores: PropTypes.array,
  childrens: PropTypes.array,
  planos: PropTypes.array,
  visitasFeitas: PropTypes.array,
  caregivers: PropTypes.array,
  inicioMes: PropTypes.string,
  fimMes: PropTypes.string,
};

RelatoriosPDFGenerator.defaultProps = {
  visitadores: [],
  childrens: [],
  planos: [],
  visitasFeitas: [],
  caregivers: [],
  inicioMes: '',
  fimMes: '',
};

export default RelatoriosPDFGenerator;