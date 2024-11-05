'use strict';

const Sequelize = require('sequelize');
const db = require('../models');
const Factura = db.facturas;
const Emisor = db.emisores;
const Receptor = db.receptores;
const Establecimiento = db.establecimientos;
const xmlbuilder = require('xmlbuilder');

module.exports = {

    async create(req, res) {
        try {
            const total = req.body.factura?.total?.[0];
            const id_emisor = req.body.factura?.id_emisor?.[0];
            const id_receptor = req.body.factura?.id_receptor?.[0];
            console.log("Contenido de req.body:", req.body);

            console.log(total)

            if (!total || !id_emisor || !id_receptor) {

                return res.status(400).send({ error: "Faltan datos requeridos en la solicitud" });
            }

            // Generar números de autorización, serie, y acceso (lógica simple de ejemplo)
            const no_autorizacion = Math.floor(100000 + Math.random() * 900000).toString();
            const serie = 'A-' + Math.floor(100 + Math.random() * 900).toString();
            const no_acceso = 'AC-' + Math.floor(100000 + Math.random() * 900000).toString();

            // Crear la fecha y hora de emisión y certificación
            const fecha_hora_emision = new Date();
            const fecha_hora_certificacion = new Date();

            const impuesto = total * 0.12;

            const nuevaFactura = await Factura.create({
                total,
                no_autorizacion,
                serie,
                no_acceso,
                fecha_hora_emision,
                fecha_hora_certificacion,
                impuesto,
                id_emisor,
                id_receptor
            });

            const emisor = await Emisor.findByPk(id_emisor);
            const receptor = await Receptor.findByPk(id_receptor, {
                include: [
                    {
                        model: Establecimiento,
                        as: 'establecimiento'
                    }
                ]
            });

            if (!emisor || !receptor) {
                return res.status(404).send({ error: "Emisor o Receptor no encontrado" });
            }

            const establecimiento = receptor.establecimiento;
            const establecimientoNombre = establecimiento ? establecimiento.nombre : 'No disponible';
            const establecimientoDireccion = establecimiento ? establecimiento.direccion : 'No disponible';
            const { id } = nuevaFactura;

            const xml = xmlbuilder.create('factura')
                .ele('id', id).up()
                .ele('no_autorizacion', no_autorizacion).up()
                .ele('serie', serie).up()
                .ele('no_acceso', no_acceso).up()
                .ele('fecha_hora_emision', fecha_hora_emision.toISOString()).up()
                .ele('fecha_hora_certificacion', fecha_hora_certificacion.toISOString()).up()
                .ele('total', total).up()
                .ele('impuesto', impuesto.toFixed(2)).up()
                .ele('emisor')
                    .ele('nit', emisor.nit).up()
                    .ele('Nombre', emisor.nombre).up()
                .up()
                .ele('receptor')
                    .ele('nit', receptor.nit).up()
                    .ele('nombre', receptor.nombre).up()
                    .ele('direccion', receptor.direccion).up()
                .up()
                .ele('establecimiento')
                    .ele('nombre', establecimientoNombre).up()
                    .ele('direccion', establecimientoDireccion).up()
                .up()
                .end({ pretty: true });

            res.setHeader('Content-Type', 'application/xml');
            res.send(xml);
        } catch (error) {
            console.error("Error en el servidor:", error);
            res.status(500).send({ error: "Error al crear la Factura" });
        }
    }
};
