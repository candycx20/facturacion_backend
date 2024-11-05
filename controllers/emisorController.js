'user strict'

const Sequelize = require('sequelize');
const db = require('../models')
const Emisor = db.emisores;
const xml2js = require('xml2js');
const xmlbuilder = require('xmlbuilder');

module.exports = {

    async findNit(req, res){
        try {
            const nit = req.body.emisor?.nit?.[0];
            console.log("Contenido de req.body:", req.body);

            if (!nit) {
                return res.status(400).send({ error: "NIT no proporcionado en la solicitud" });
            }
    
            const emisor = await Emisor.findOne({ where: { nit } });
            if (!emisor) {
                return res.status(404).send({ error: "Emisor no encontrado" });
            }
    
            const { nombre, nit: nit_Emisor, direccion, id } = emisor.dataValues;
    
            const xml = xmlbuilder.create('emisores')
                .ele('Emisor', { nit: nit_Emisor })
                    .ele('id', id).up()
                    .ele('nombre', nombre).up()
                    .ele('direccion', direccion).up()
                .end({ pretty: true });
    
            res.setHeader('Content-Type', 'application/xml');
            res.send(xml);
        } catch (error) {
            console.error("Error en el servidor:", error);
            res.status(500).send({ error: "Error interno del servidor" });
        }
    }
}