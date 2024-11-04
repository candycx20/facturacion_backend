'use strict';

const Sequelize = require('sequelize');
const db = require('../models');
const Item = db.items;
const Factura = db.facturas;
const xmlbuilder = require('xmlbuilder');

module.exports = {

    async create(req, res) {
        try {
            const nombre = req.body.item?.nombre?.[0];
            const tipo_item = req.body.item?.tipo_item?.[0];
            const cantidad = req.body.item?.cantidad?.[0];
            const descripcion = req.body.item?.descripcion?.[0];
            const precio = parseFloat(req.body.item?.precio?.[0]);
            const descuento = parseFloat(req.body.item?.descuento?.[0] || 0);
            const otros_descuento = parseFloat(req.body.item?.otros_descuento?.[0] || 0);
            const id_factura = req.body.item?.id_factura?.[0];
            console.log("Contenido de req.body:", req.body);

            if (!nombre || !tipo_item || !cantidad || !precio || !id_factura) {
                return res.status(400).send({ error: "Faltan datos requeridos en la solicitud" });
            }

            // Calcular el total con descuentos
            const subtotal = cantidad * precio;
            const total_descuento = descuento + otros_descuento;
            const total = subtotal - total_descuento;
            const impuesto = total * 0.12;

            // Crear el nuevo item
            const nuevoItem = await Item.create({
                nombre,
                tipo_item,
                cantidad,
                descripcion,
                precio,
                descuento,
                otros_descuento,
                total,
                impuesto,
                id_factura
            });

            // Obtener la factura asociada
            const factura = await Factura.findByPk(id_factura);
            if (!factura) {
                return res.status(404).send({ error: "Factura no encontrada" });
            }

            // Crear la respuesta en formato XML
            const xml = xmlbuilder.create('item')
                .ele('nombre', nombre).up()
                .ele('tipo_item', tipo_item).up()
                .ele('cantidad', cantidad).up()
                .ele('descripcion', descripcion).up()
                .ele('precio', precio.toFixed(2)).up()
                .ele('descuento', descuento.toFixed(2)).up()
                .ele('otros_descuento', otros_descuento.toFixed(2)).up()
                .ele('total', total.toFixed(2)).up()
                .ele('impuesto', impuesto.toFixed(2)).up()
                .ele('factura')
                    .ele('id', factura.id).up()
                    .ele('no_autorizacion', factura.no_autorizacion).up()
                    .ele('serie', factura.serie).up()
                    .ele('no_acceso', factura.no_acceso).up()
                .up()
                .end({ pretty: true });

            res.setHeader('Content-Type', 'application/xml');
            res.send(xml);
        } catch (error) {
            console.error("Error en el servidor:", error);
            res.status(500).send({ error: "Error al crear el Item" });
        }
    }
};
