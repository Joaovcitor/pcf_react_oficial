import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';

const PlanoVisitasPDFGenerator = ({ visitData, planoData }) => {
  // Carrega e retorna um canvas a partir de uma URL de imagem, com múltiplos fallbacks
  const loadCanvasFromUrl = (url) => {
    return new Promise((resolve, reject) => {
      const makeCanvasFromImage = (img) => {
        const canvas = document.createElement('canvas');
        const w = img.naturalWidth || img.width || 0;
        const h = img.naturalHeight || img.height || 0;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        console.log('[PlanoVisitasPDFGenerator] canvas criado:', w, 'x', h);
        resolve(canvas);
      };

      const attemptDirect = () => {
        try {
          console.log('[PlanoVisitasPDFGenerator] carregando Image() direto:', url);
          const img = new Image();
          img.onload = () => {
            console.log('[PlanoVisitasPDFGenerator] Image onload direto:', url, 'size=', img.naturalWidth, 'x', img.naturalHeight);
            makeCanvasFromImage(img);
          };
          img.onerror = (e) => {
            console.warn('[PlanoVisitasPDFGenerator] Image onerror direto, tentando fetch+createImageBitmap:', url, e);
            attemptFetchBitmap();
          };
          img.src = url;
        } catch (err) {
          console.error('[PlanoVisitasPDFGenerator] exceção ao criar Image() direto', err);
          attemptFetchBitmap();
        }
      };

      const attemptFetchBitmap = async () => {
        try {
          console.log('[PlanoVisitasPDFGenerator] fetch para createImageBitmap:', url);
          const res = await fetch(url);
          if (!res.ok) {
            console.error('[PlanoVisitasPDFGenerator] fetch falhou', url, res.status, res.statusText);
            return reject(new Error(`Falha ao buscar imagem: ${res.status}`));
          }
          const blob = await res.blob();
          console.log('[PlanoVisitasPDFGenerator] blob para bitmap:', url, 'type=', blob.type, 'size~', blob.size);
          if (typeof createImageBitmap === 'function') {
            try {
              const bitmap = await createImageBitmap(blob);
              const canvas = document.createElement('canvas');
              canvas.width = bitmap.width;
              canvas.height = bitmap.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(bitmap, 0, 0);
              console.log('[PlanoVisitasPDFGenerator] createImageBitmap sucesso:', bitmap.width, 'x', bitmap.height);
              return resolve(canvas);
            } catch (e) {
              console.warn('[PlanoVisitasPDFGenerator] createImageBitmap falhou, tentando objectURL:', e);
            }
          }
          // Fallback: objectURL + Image
          const objUrl = URL.createObjectURL(blob);
          const img2 = new Image();
          img2.onload = () => {
            console.log('[PlanoVisitasPDFGenerator] Image onload via objectURL:', url, 'size=', img2.naturalWidth, 'x', img2.naturalHeight);
            URL.revokeObjectURL(objUrl);
            makeCanvasFromImage(img2);
          };
          img2.onerror = (e) => {
            console.error('[PlanoVisitasPDFGenerator] Image onerror via objectURL:', url, e);
            URL.revokeObjectURL(objUrl);
            reject(e);
          };
          img2.src = objUrl;
        } catch (err) {
          console.error('[PlanoVisitasPDFGenerator] exceção em fetch+bitmap', err);
          reject(err);
        }
      };

      attemptDirect();
    });
  };

  const generatePDF = async () => {
    // Criar nova instância do jsPDF (A4, mm)
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    // Configurações de fonte e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 54; // ~1.9cm para se aproximar do DOCX
    const contentWidth = pageWidth - margin * 2;
    const lineHeight = 16; // compatível com fonte 11–12pt
    let currentY = margin;

    // URLs das imagens no public/ (caminhos absolutos servidos pelo dev server)
    const headerUrl = `/images/header.png`;
    const footerUrl = `/images/footer.png`;

    // Tenta carregar ambas as imagens antes de desenhar
    let headerCanvas = null;
    let footerCanvas = null;
    console.log('[PlanoVisitasPDFGenerator] iniciar generatePDF');
    console.log('[PlanoVisitasPDFGenerator] headerUrl=', headerUrl, 'footerUrl=', footerUrl);
    try {
      const [headerCv, footerCv] = await Promise.all([
        loadCanvasFromUrl(headerUrl),
        loadCanvasFromUrl(footerUrl),
      ]);
      headerCanvas = headerCv;
      footerCanvas = footerCv;
      console.log('[PlanoVisitasPDFGenerator] headerCanvas?', !!headerCanvas, 'footerCanvas?', !!footerCanvas);
    } catch (_) {
      // Se falhar, apenas segue sem imagens (não altera estrutura dos textos)
      console.warn('[PlanoVisitasPDFGenerator] falha ao preparar imagens, prosseguindo sem banners');
    }

    // Tentativa extra: imagens alternativas conhecidas do diretório, caso os arquivos principais sejam inválidos
    if (!headerCanvas) {
      const altHeader = '/images/image.png';
      console.warn('[PlanoVisitasPDFGenerator] tentando header alternativo:', altHeader);
      try {
        headerCanvas = await loadCanvasFromUrl(altHeader);
      } catch (e) {
        console.warn('[PlanoVisitasPDFGenerator] header alternativo também falhou:', e?.message);
      }
    }
    if (!footerCanvas) {
      const altFooter = '/images/Brasao.png';
      console.warn('[PlanoVisitasPDFGenerator] tentando footer alternativo:', altFooter);
      try {
        footerCanvas = await loadCanvasFromUrl(altFooter);
      } catch (e) {
        console.warn('[PlanoVisitasPDFGenerator] footer alternativo também falhou:', e?.message);
      }
    }

    // Inserir cabeçalho com imagem no topo (sem alterar o Y do conteúdo)
    if (headerCanvas) {
      // Dimensões preservando aspecto: encaixar no pageWidth e limitar altura
      const maxHeaderHeight = 80; // limite de altura do banner superior
      const hW = headerCanvas.width || 1;
      const hH = headerCanvas.height || 1;
      const headerRatio = hW / hH;
      let headerDrawWidth = pageWidth;
      let headerDrawHeight = headerDrawWidth / headerRatio;
      if (headerDrawHeight > maxHeaderHeight) {
        headerDrawHeight = maxHeaderHeight;
        headerDrawWidth = headerDrawHeight * headerRatio;
      }
      const headerX = (pageWidth - headerDrawWidth) / 2; // centralizar
      try {
        console.log('[PlanoVisitasPDFGenerator] inserindo header via canvas PNG');
        console.log('[PlanoVisitasPDFGenerator] header size canvas=', hW, 'x', hH, 'draw=', headerDrawWidth, 'x', headerDrawHeight);
        doc.addImage(headerCanvas, 'PNG', headerX, 0, headerDrawWidth, headerDrawHeight);
        console.log('[PlanoVisitasPDFGenerator] header PNG inserido');
      } catch (e) {
        console.warn('[PlanoVisitasPDFGenerator] falha ao inserir header PNG, tentando JPEG', e?.message);
        try {
          console.log('[PlanoVisitasPDFGenerator] inserindo header via canvas JPEG');
          doc.addImage(headerCanvas, 'JPEG', headerX, 0, headerDrawWidth, headerDrawHeight);
          console.log('[PlanoVisitasPDFGenerator] header JPEG inserido');
        } catch (e2) {
          console.error('[PlanoVisitasPDFGenerator] falha ao inserir header JPEG', e2?.message);
        }
      }
    }
    doc.setLineHeightFactor(1.15);

    // Função auxiliar para adicionar texto com quebra de linha
    const addText = (text, x, y, maxWidth, fontSize = 11, isBold = false) => {
      const safe = text == null ? '' : String(text);
      doc.setFontSize(fontSize);
      doc.setFont('times', isBold ? 'bold' : 'normal');
      const lines = doc.splitTextToSize(safe, maxWidth);
      doc.text(lines, x, y);
      return y + lines.length * (lineHeight - 2);
    };

    // Função auxiliar para adicionar linha horizontal
    const addLine = (y) => {
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);
      return y + 6;
    };

    const formatDate = (value) => {
      try {
        if (!value) return '-';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return String(value);
        const months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = months[d.getMonth()];
        const ano = d.getFullYear();
        return { dia, mes, ano, label: `${dia}/${mes} ${ano}` };
      } catch (e) {
        return { dia: '-', mes: '-', ano: '-', label: String(value) };
      }
    };

    const getFaixaEtaria = (idadeAnos) => {
      if (typeof idadeAnos !== 'number') return '';
      if (idadeAnos < 1) return '00 a 01 ano';
      if (idadeAnos < 2) return '01 a 02 anos';
      if (idadeAnos < 3) return '02 a 03 anos';
      if (idadeAnos < 4) return '03 a 04 anos';
      if (idadeAnos < 5) return '04 a 05 anos';
      return `${Math.floor(idadeAnos)} anos`;
    };

    // Cabeçalho: Título centralizado
    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    const titulo = 'PLANO DE VISITAS';
    doc.text(titulo, pageWidth / 2, currentY, { align: 'center' });
    currentY += 22;

    // Local e Data
    doc.setFontSize(11);
    doc.setFont('times', 'normal');
    const ag = formatDate(visitData?.scheduledDay);
    const localDataStr = `Quixadá-Ce. ${ag.dia}/${ag.mes} ${ag.ano}`;
    // Alinhar à direita com recuo específico próximo à margem (pageWidth - 70)
    doc.text(localDataStr, pageWidth - 70, currentY, { align: 'right' });
    currentY += 16;

    // Período e Faixa Etária
    const idadeFaixa = visitData?.faixaEtaria || getFaixaEtaria(visitData?.idade);
    // Solicitação: remover a linha de período (ex.: "29 a 32 de setembro")
    // Em vez disso, mantenho apenas um pequeno espaçamento antes dos campos do beneficiário
    currentY += 8;

    // Informações do Beneficiário
    doc.setFontSize(11);
    doc.setFont('times', 'normal');
    
    // NIS
    const nisLabel = 'Número de Identificação Social (NIS):';
    const nisValue = visitData?.nis || '';
    doc.text(nisLabel, margin, currentY);
    doc.line(margin + doc.getTextWidth(nisLabel) + 4, currentY + 1, pageWidth - margin, currentY + 1);
    if (nisValue) {
      doc.text(String(nisValue), margin + doc.getTextWidth(nisLabel) + 8, currentY);
    }
    currentY += 18;
    
    // Nome completo
    const nomeLabel = 'Nome completo do beneficiário:';
    const nomeValue = visitData?.nomeBeneficiario || '';
    doc.text(nomeLabel, margin, currentY);
    doc.line(margin + doc.getTextWidth(nomeLabel) + 4, currentY + 1, pageWidth - margin, currentY + 1);
    if (nomeValue) {
      doc.text(String(nomeValue), margin + doc.getTextWidth(nomeLabel) + 8, currentY);
    }
    currentY += 18;
    
    // Idade e Gestante na mesma linha (conforme modelo)
    const idadeLabel = 'Idade:';
    const idadeValue = visitData?.idade || '';
    const gestanteLabel = 'Gestante:';
    const semanasValue = visitData?.semanasGestante || '';
    const semanasLabel = 'semanas';
    
    // Idade
    doc.text(idadeLabel, margin, currentY);
    doc.line(margin + doc.getTextWidth(idadeLabel) + 4, currentY + 1, margin + 90, currentY + 1);
    if (idadeValue || idadeValue === 0) {
      const valor = typeof idadeValue === 'number' ? `${idadeValue} anos` : `${idadeValue} anos`;
      doc.text(valor, margin + doc.getTextWidth(idadeLabel) + 8, currentY);
    }
    
    // Gestante
    doc.text(gestanteLabel, margin + 120, currentY);
    doc.line(margin + 120 + doc.getTextWidth(gestanteLabel) + 4, currentY + 1, margin + 220, currentY + 1);
    if (semanasValue) {
      doc.text(String(semanasValue), margin + 120 + doc.getTextWidth(gestanteLabel) + 8, currentY);
    }
    doc.text(semanasLabel, margin + 226, currentY);

    currentY += 22;

    // Seções do Plano
    if (planoData?.objective) {
      doc.setFontSize(12);
      doc.setFont('times', 'bold');
      doc.text('OBJETIVO(S):', margin, currentY);
      currentY += 10;
      
      doc.setFont('times', 'normal');
      currentY = addText(planoData.objective, margin, currentY, pageWidth - 2 * margin, 11);
      currentY += 10;
    }

    if (planoData?.etapa1) {
      doc.setFontSize(12);
      doc.setFont('times', 'bold');
      doc.text('MOMENTO I – Organização e acolhimento:', margin, currentY);
      currentY += 10;
      
      doc.setFont('times', 'normal');
      currentY = addText(planoData.etapa1, margin, currentY, contentWidth, 11);
      currentY += 10;
    }

    // Removido: seção "Material utilizado" conforme solicitação

    if (planoData?.etapa2) {
      doc.setFontSize(12);
      doc.setFont('times', 'bold');
      doc.text('MOMENTO II – Desenvolvimento:', margin, currentY);
      currentY += 10;
      
      doc.setFont('times', 'normal');
      currentY = addText(planoData.etapa2, margin, currentY, contentWidth, 11);
      currentY += 10;
    }

    if (planoData?.etapa3) {
      doc.setFontSize(12);
      doc.setFont('times', 'bold');
      doc.text('MOMENTO FINAL – Avaliação das atividades pelas famílias:', margin, currentY);
      currentY += 10;
      
      doc.setFont('times', 'normal');
      currentY = addText(planoData.etapa3, margin, currentY, contentWidth, 11);
      currentY += 10;
    }

    // Observações (título e bloco de espaço em branco)
    doc.setFontSize(12);
    doc.setFont('times', 'bold');
    doc.text('OBSERVAÇÕES SOBRE A VISITA:', margin, currentY);
    currentY += 10;
    doc.setDrawColor(220);
    const obsHeight = 100; // espaço para preenchimento
    const obsY = currentY; // início do retângulo abaixo do título
    doc.roundedRect(margin, obsY, contentWidth, obsHeight, 6, 6);
    // Se houver observação, imprime com padding interno
    if (planoData?.observation) {
      doc.setFont('times', 'normal');
      currentY = addText(planoData.observation, margin + 12, obsY + 14, contentWidth - 24, 11);
    }
    currentY = obsY + obsHeight + 12;

    // Não adicionar nova página: manter uma página única

    // Rodapé com assinaturas
    currentY = Math.min(Math.max(currentY, pageHeight - 120), pageHeight - 90);
    
    // Linhas para assinatura
    const visitadorText = visitData?.visitador ? 
      `Visitador: ${visitData.visitador}` : 
      'Visitador: ____________________________';

    const supervisorText = visitData?.supervisor ? 
      `Supervisor: ${visitData.supervisor}` : 
      'Supervisor: ___________________________';

    doc.setFontSize(11);
    doc.setFont('times', 'normal');
    doc.text(visitadorText, margin, currentY);
    doc.text(supervisorText, pageWidth - margin - 220, currentY);
    currentY += 15;

    // Texto explicativo conforme modelo
    doc.setFontSize(9);
    doc.setFont('times', 'normal');
    
    const textoExplicativo = [
      'Esse formulário deve ser preenchido pelo visitador, com apoio do supervisor, para o planejamento de cada visita domiciliar no âmbito do Programa Criança Feliz.',
      'Ao final do formulário, o visitador deve registrar os principais pontos observados durante a visita. Isso facilitará o acompanhamento da família e o trabalho do',
      'supervisor. Sugere-se que esses formulários fiquem arquivados no CRAS'
    ];

    textoExplicativo.forEach((linha, index) => {
      doc.text(linha, margin, currentY + index * 12);
    });
    currentY += 40;

    // Inserir rodapé com imagem na parte de baixo
    if (footerCanvas) {
      // Dimensões preservando aspecto: encaixar no pageWidth e limitar altura
      const maxFooterHeight = 100; // limite de altura do banner inferior
      const fW = footerCanvas.width || 1;
      const fH = footerCanvas.height || 1;
      const footerRatio = fW / fH;
      let footerDrawWidth = pageWidth;
      let footerDrawHeight = footerDrawWidth / footerRatio;
      if (footerDrawHeight > maxFooterHeight) {
        footerDrawHeight = maxFooterHeight;
        footerDrawWidth = footerDrawHeight * footerRatio;
      }
      const footerX = (pageWidth - footerDrawWidth) / 2; // centralizar
      const footerY = pageHeight - footerDrawHeight;
      try {
        console.log('[PlanoVisitasPDFGenerator] inserindo footer via canvas PNG');
        console.log('[PlanoVisitasPDFGenerator] footer size canvas=', fW, 'x', fH, 'draw=', footerDrawWidth, 'x', footerDrawHeight);
        doc.addImage(footerCanvas, 'PNG', footerX, footerY, footerDrawWidth, footerDrawHeight);
        console.log('[PlanoVisitasPDFGenerator] footer PNG inserido');
      } catch (e) {
        console.warn('[PlanoVisitasPDFGenerator] falha ao inserir footer PNG, tentando JPEG', e?.message);
        try {
          console.log('[PlanoVisitasPDFGenerator] inserindo footer via canvas JPEG');
          doc.addImage(footerCanvas, 'JPEG', footerX, footerY, footerDrawWidth, footerDrawHeight);
          console.log('[PlanoVisitasPDFGenerator] footer JPEG inserido');
        } catch (e2) {
          console.error('[PlanoVisitasPDFGenerator] falha ao inserir footer JPEG', e2?.message);
        }
      }
      // Para manter legibilidade sobre imagem, usa texto branco
      doc.setTextColor(255, 255, 255);
    } else {
      // Fallback visual caso imagem não carregue: manter barra azul existente
      console.log('[PlanoVisitasPDFGenerator] sem imagens de rodapé, aplicando barra azul fallback');
      doc.setFillColor(70, 130, 180);
      doc.rect(0, pageHeight - 40, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
    }
    
    // Informações de contato centralizadas
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Rua José de Alencar, 405, Centro, Quixadá -Ceará CEP: 63.900-121', pageWidth / 2, pageHeight - 26, { align: 'center' });
    doc.text('E-mail: social@quixada.ce.gov.br Fone: (88) 981279001', pageWidth / 2, pageHeight - 14, { align: 'center' });
    
    // Informações adicionais no canto direito
    doc.setFontSize(8);
    doc.text('www.quixada.ce.gov.br', pageWidth - 160, pageHeight - 28);
    doc.text('@prefeituraquixadace', pageWidth - 160, pageHeight - 18);
    doc.text('Prefeitura de Quixadá', pageWidth - 160, pageHeight - 8);

    // Resetar cor do texto para preto
    doc.setTextColor(0, 0, 0);

    // Marca d'água diagonal semi-transparente (simulada com cinza claro)
    doc.setTextColor(180, 180, 180);
    doc.setFont('times', 'bold');
    doc.setFontSize(44);
    // Centralizar aproximadamente e rotacionar
    doc.text('em fase piloto', pageWidth / 2, pageHeight / 2, { align: 'center', angle: -30 });
    doc.setTextColor(0, 0, 0);

    // Salvar o PDF
    const fileName = `PLANO_DE_VISITAS_${planoData?.id || 'novo'}.pdf`;
    doc.save(fileName);
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
        py: 1.5,
        px: 3,
        backgroundColor: '#d32f2f',
        '&:hover': {
          backgroundColor: '#b71c1c',
        }
      }}
    >
      Gerar PDF
    </Button>
  );
};

PlanoVisitasPDFGenerator.propTypes = {
  visitData: PropTypes.shape({
    periodo: PropTypes.string,
    faixaEtaria: PropTypes.string,
    nis: PropTypes.string,
    nomeBeneficiario: PropTypes.string,
    idade: PropTypes.number,
    semanasGestante: PropTypes.number,
    visitador: PropTypes.string,
    supervisor: PropTypes.string,
    // Data agendada da visita (string ISO ou Date)
    scheduledDay: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }),
  planoData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    objective: PropTypes.string,
    etapa1: PropTypes.string,
    etapa2: PropTypes.string,
    etapa3: PropTypes.string,
    observation: PropTypes.string,
  }),
};

PlanoVisitasPDFGenerator.defaultProps = {
  visitData: {},
  planoData: {},
};

export default PlanoVisitasPDFGenerator;