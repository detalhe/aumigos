const Database = require('../utils/database');
const excel = require('exceljs');
const json2csv = require('json2csv').parse;
const PdfPrinter = require('pdfmake');

class RelatorioController {
  async exibirFormularioRelatorio(req, res) {
    try {
      res.render('relatorio/formulario');
    } catch (error) {
      res.status(500).send("Erro ao exibir formulário de relatório: " + error.message);
    }
  }

  async gerarRelatorio(req, res) {
    try {
      const { tipoRelatorio, formatoRelatorio } = req.body;

      const db = new Database();
      let dados = [];

      switch (tipoRelatorio) {
        case 'usuarios':
          dados = await db.ExecutaComando('SELECT id, nome, email, tipo, cargo, status FROM usuarios');
          break;
        case 'doadores':
          dados = await db.ExecutaComando('SELECT * FROM doadores');
          break;
        case 'empresas_parceiras':
          dados = await db.ExecutaComando('SELECT * FROM empresas_parceiras');
          break;
        case 'produtos':
          dados = await db.ExecutaComando('SELECT * FROM produtos');
          break;
        case 'animais':
          dados = await db.ExecutaComando('SELECT * FROM animais');
          break;
          case 'saidas_eventos':
            dados = await db.ExecutaComando(`
              SELECT se.*, 
                GROUP_CONCAT(DISTINCT u.nome SEPARATOR ', ') AS responsaveis,
                GROUP_CONCAT(DISTINCT CONCAT(p.nome, ' (', pse.quantidade, ' ', p.unidade_medida, ')') SEPARATOR ', ') AS produtos
              FROM saidas_eventos se
              LEFT JOIN responsaveis_saidas_eventos rse ON se.id = rse.saida_evento_id
              LEFT JOIN usuarios u ON rse.usuario_id = u.id
              LEFT JOIN produtos_saidas_eventos pse ON se.id = pse.saida_evento_id
              LEFT JOIN produtos p ON pse.produto_id = p.id
              GROUP BY se.id
            `);
            break;
        default:
          throw new Error('Tipo de relatório inválido');
      }

      if (dados.length === 0) {
        throw new Error('Nenhum dado encontrado para o tipo de relatório selecionado');
      }

      switch (formatoRelatorio) {
        case 'pdf':
          await this.gerarRelatorioPDF(tipoRelatorio, dados, res);
          break;
        case 'excel':
          await this.gerarRelatorioExcel(tipoRelatorio, dados, res);
          break;
        case 'csv':
          await this.gerarRelatorioCSV(tipoRelatorio, dados, res);
          break;
        default:
          throw new Error('Formato de relatório inválido');
      }
    } catch (error) {
      res.status(500).send("Erro ao gerar relatório: " + error.message);
    }
  }

  async gerarRelatorioPDF(tipoRelatorio, dados, res) {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };

    const printer = new PdfPrinter(fonts);

    let tableHeaders = [];
    let tableWidths = [];

    switch (tipoRelatorio) {
      case 'usuarios':
        tableHeaders = ['Id', 'Nome', 'Email', 'Tipo', 'Cargo', 'Status'];
        tableWidths = ['auto', '*', '*', 'auto', 'auto', 'auto'];
        break;
      case 'doadores':
        tableHeaders = ['ID', 'Nome', 'Email', 'Telefone', 'Endereco'];
        tableWidths = ['auto', '*', '*', 'auto', '*'];
        break;
      case 'empresas_parceiras':
        tableHeaders = ['ID', 'Nome', 'Email', 'Telefone', 'Website', 'Tipo_Parceria'];
        tableWidths = ['auto', '*', '*', 'auto', '*', 'auto'];
        break;
      case 'produtos':
        tableHeaders = ['ID', 'Nome', 'Categoria', 'Quantidade', 'Unidade_Medida', 'Data_Validade'];
        tableWidths = ['auto', '*', '*', 'auto', 'auto', 'auto'];
        break;
      case 'animais':
        tableHeaders = ['ID', 'Nome', 'Tipo', 'Sexo', 'Porte', 'Temperamento', 'Status'];
        tableWidths = ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'];
        break;
      case 'saidas_eventos':
        tableHeaders = ['ID', 'Evento', 'Data_Saida', 'Hora_Saida', 'Responsaveis', 'Produtos'];
        tableWidths = ['auto', '*', 'auto', 'auto', '*', '*'];
        break;
      default:
        throw new Error('Tipo de relatório inválido');
    }

    const nomeRelatorio = {
      'saidas_eventos': 'Relatório de saída de eventos',
      'empresas_parceiras': 'Relatório de empresas parceiras',
      'usuarios': 'Relatório de usuários',
      'doadores': 'Relatório de doadores',
      'produtos': 'Relatório de produtos',
      'animais': 'Relatório de animais'
    };

    const content = [
      { text: nomeRelatorio[tipoRelatorio] || `Relatório de ${tipoRelatorio}`, style: 'header', alignment: 'center' },
      {
        table: {
          headerRows: 1,
          widths: tableWidths,
          body: [
            tableHeaders.map(header => ({ text: header.replace('_', ' '), style: 'tableHeader' })),
            ...dados.map((item, index) => tableHeaders.map(header => {
              let value = item[header.toLowerCase().replace(' ', '_')];
              if ((header === 'Data_Validade' || header === 'Data_Saida') && value) {
                const date = new Date(value);
                value = date.toLocaleDateString();
              }
              if (header === 'Responsaveis') {
                value = item.responsaveis;
              }
              if (header === 'Produtos') {
                value = item.produtos;
              }
              return {
                text: value,
                style: index % 2 === 0 ? 'tableRowEven' : 'tableRowOdd'
              };
            }))
          ]
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? '#f5b942;' : '#e0e0e0';
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? '#f5b942;' : '#e0e0e0';
          },
          paddingLeft: function (i, node) { return 8; },
          paddingRight: function (i, node) { return 8; },
          paddingTop: function (i, node) { return 4; },
          paddingBottom: function (i, node) { return 4; },
        }
      }
    ];

    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
      content,
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 20],
          color: '#121212;'
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          color: 'white',
          fillColor: '#f5b942;',
          alignment: 'center'
        },
        tableRowEven: {
          fillColor: '#f2f2f2'
        },
        tableRowOdd: {
          fillColor: 'white'
        }
      },
      defaultStyle: {
        font: 'Helvetica',
        fontSize: 12,
        alignment: 'center'
      }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  async gerarRelatorioExcel(tipoRelatorio, dados, res) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(tipoRelatorio);

    worksheet.columns = Object.keys(dados[0]).map(column => ({ header: column, key: column }));
    worksheet.addRows(dados);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }

  async gerarRelatorioCSV(tipoRelatorio, dados, res) {
    const fields = Object.keys(dados[0]);
    const csv = json2csv(dados, { fields });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.csv');
    res.send(csv);
  }
}

module.exports = RelatorioController;