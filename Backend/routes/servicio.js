const express = require('express');
const router = express.Router();

const pool = require('../views/database');

// Varios servicios
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM SERVICIO'
    pool.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

//Un servicio
router.get('/:CODIGO_SERVICIO',(req,res)=>{
    const{CODIGO_SERVICIO} = req.params;
    let sql = 'SELECT * FROM SERVICIO WHERE CODIGO_SERVICIO= ?'
    pool.query(sql,[CODIGO_SERVICIO], (err, rows, fields)=>{
       if(err)throw err;
       else{
        res.json(rows)
       } 
    })
})

//Insertar proveedor
router.post('/', (req,res)=>{
    const {CODIGO_SERVICIO, NOMBRE_SERVICIO	, COSTO_SERVICIO} = req.body
    let sql =`INSERT INTO SERVICIO(CODIGO_SERVICIO, NOMBRE_SERVICIO, COSTO_SERVICIO) 
    values ('${CODIGO_SERVICIO}','${NOMBRE_SERVICIO}','${COSTO_SERVICIO}')`
    pool.query(sql, (err, rows,fields)=>{
        if(err) throw err
        else {
            res.json({status: 'servicio agregado'})
        }
    })
})


//Delete
router.delete('/:CODIGO_SERVICIO', (req,res)=>{
    const {CODIGO_SERVICIO} = req.params

    let sql = `DELETE FROM SERVICIO WHERE CODIGO_SERVICIO = '${CODIGO_SERVICIO}'`
    pool.query(sql,(err,rows,fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Se elimino el servicio'})
        }
    })
})

//Modificar 
router.put(':/CODIGO_SERVICIO', (req,res)=>{
    const {CODIGO_SERVICIO} = req.params
    const {NOMBRE_SERVICIO	, COSTO_SERVICIO} = req.body

    let sql = `UPDATE SERVICIO set
    NOMBRE_SERVICIO = '${NOMBRE_SERVICIO}',
    COSTO_SERVICIO = '${COSTO_SERVICIO}'
    WHERE CODIGO_SERVICIO = '${CODIGO_SERVICIO}'`

    pool.query(sql,(err,rows,fields)=>{
        if (err) { 
        console.log(sql);
    }
        else{
            res.json({status: 'Se modifico la informacion del servicio'})
        }
    })
})
module.exports = router;