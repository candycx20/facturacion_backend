'use strict';

const Sequelize = require('sequelize');
const db = require('../models');
const Receptor = db.receptores;
const Establecimiento = db.establecimientos; // Importa el modelo de Establecimiento
const xml2js = require('xml2js');
const xmlbuilder = require('xmlbuilder');

module.exports = {

    async findNit(req, res) {
        try {
            const nit = req.body.receptor?.nit?.[0];
            console.log("Contenido de req.body:", req.body);

            if (!nit) {
                return res.status(400).send({ error: "NIT no proporcionado en la solicitud" });
            }
    
            // Buscar el receptor y su establecimiento asociado
            const receptor = await Receptor.findOne({
                where: { nit },
                include: [
                    {
                        model: Establecimiento,
                        as: 'establecimiento', // Asegúrate de que la asociación esté correctamente definida
                    }
                ]
            });

            if (!receptor) {
                return res.status(404).send({ error: "Receptor no encontrado" });
            }
    
            const { nombre, nit: nit_Receptor, direccion } = receptor.dataValues;
            const establecimiento = receptor.establecimiento; // Obtener el establecimiento asociado

            // Verificar si hay un establecimiento asociado
            const establecimientoNombre = establecimiento ? establecimiento.nombre : 'No disponible';
            const establecimientoDireccion = establecimiento ? establecimiento.direccion : 'No disponible';
    
            // Crear la respuesta en formato XML
            const xml = xmlbuilder.create('receptores')
                .ele('Receptor', { nit: nit_Receptor })
                    .ele('nombre', nombre).up()
                    .ele('direccion', direccion).up()
                    .ele('Establecimiento')
                        .ele('nombre', establecimientoNombre).up()
                        .ele('direccion', establecimientoDireccion).up()
                    .up()
                .end({ pretty: true });
    
            res.setHeader('Content-Type', 'application/xml');
            res.send(xml);
        } catch (error) {
            console.error("Error en el servidor:", error);
            res.status(500).send({ error: "Error interno del servidor" });
        }
    }
};
