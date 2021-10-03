const express = require('express');
const router = express.Router();
const MovimientosController = require('../controllers/movimientos')

router.get('/', MovimientosController.movimientos_getAll);

router.get('/:movimientoId', MovimientosController.movimientos_getMovimiento);

router.post('/', MovimientosController.movimientos_createMovimiento);

router.delete('/:movimientoId', MovimientosController.movimientos_deleteMovimiento);

router.patch('/', MovimientosController.movimientos_updateMovimiento);

module.exports = router;