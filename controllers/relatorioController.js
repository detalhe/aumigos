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
                    dados = await db.ExecutaComando('SELECT * FROM usuarios');
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
                    dados = await db.ExecutaComando('SELECT * FROM saidas_eventos');
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

        const content = [
            { text: `Relatório de ${tipoRelatorio}`, style: 'header' },
            {
                table: {
                    headerRows: 1,
                    widths: Object.keys(dados[0]).map(() => '*'),
                    body: [
                        Object.keys(dados[0]),
                        ...dados.map(item => Object.values(item))
                    ]
                }
            }
        ];

        const docDefinition = {
            content,
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                }
            },
            defaultStyle: {
                font: 'Helvetica'
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
