const Movimiento = require("../modules/movimientos");
const mongoose = require('mongoose');
const moment = require('moment');

exports.movimientos_getAll =  (req, res, next) => {
    Movimiento.find()
        .sort('fecha')
        .select('movimiento fecha hora precio _id')
        .exec() //Turns this into a promise
        .then(docs => {

           
            let csvContent = "data:text/csv;charset=utf-8,"
            docs.map(doc => {debugger; csvContent+","+doc.id+";"+doc.precio+";"+doc.fecha+"\r\n"  });
            console.log(csvContent)
            res.status(200).json({
                count: docs.length,
                movimientos: docs.map(doc => {
                    return {
                        _id: doc.id,
                        movimiento: doc.movimiento,
                        fecha: doc.fecha,
                        tiempoAtencion: Math.floor((Math.random() * 200) + 180),
                        nroDePrendas: Math.floor(doc.precio/30),
                        precio: doc.precio
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

exports.movimientos_createMovimiento = (req, res, next) => {
    
    console.log('log: '+ moment().format(req.body.fecha));
    const movimiento = new Movimiento({
        _id: mongoose.Types.ObjectId(),
        fecha: req.body.fecha,
        hora: req.body.hora,
        precio: req.body.precio
    });
    movimiento.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Movimiento stored',
            createdMovimiento: {
                _id:result._id,
                fecha: result.fecha,
                hora: result.hora,
                precio: result.precio
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/movimientos/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};

exports.movimientos_getMovimiento = (req, res, next) => {
    Movimiento.findById(req.params.movimientoId)
        .exec()
        .then(movimiento => {
            if(!movimiento){
                return res.status(404).json({
                    message: 'Movimiento not found'
                })
            }
            res.status(200).json({
                movimiento: movimiento,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/movimientos'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.movimientos_deleteMovimiento = (req, res, next) => {
    const id = req.params.productId;
    Movimiento.deleteOne({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Movimiento deleted',
            request: {
                type: "POST",
                url: "http://localhost:3000/movimientos",
                body: { fecha: 'Date', precio: 'Number' }
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
};

exports.movimientos_updateMovimiento = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    
    Movimiento.updateOne({
        _id: id
    }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Movimiento updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/movimientos/'+ id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

/*
exports.movimientos_getAll =  (req, res, next) => {
    Movimiento.find()
        .select('movimiento fecha hora precio _id')
        .exec() //Turns this into a promise
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                movimientos: docs.map(doc => {
                    return {
                        _id: doc.id,
                        movimiento: doc.movimiento,
                        fecha: doc.fecha,
                        tiempoAtencion: Math.floor((Math.random() * 200) + 180),
                        precio: doc.precio,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/movimientos/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};
*/