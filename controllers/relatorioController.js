const Database = require('../utils/database');
const fs = require('fs');
const excel = require('exceljs');
const pdf = require('html-pdf');
const ejs = require('ejs');
const json2csv = require('json2csv').parse;

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
        const html = await ejs.renderFile('views/relatorio/template.ejs', { tipoRelatorio, dados });

        const options = {
            format: 'A4',
            border: {
                top: '1cm',
                right: '1cm',
                bottom: '1cm',
                left: '1cm'
            }
        };

        pdf.create(html, options).toBuffer((err, buffer) => {
            if (err) {
                throw err;
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
            res.send(buffer);
        });
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
