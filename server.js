const { response } = require('express');
const express = require('express');
const app = express();

const port = 3333;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("compito.db");


app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});

app.post('/biglietto', (req, res)=>{
    const d= new Date().getTime();
    let et = d;
    let id=Math.random().toString().replace("0.", "");
    db.run(`INSERT INTO biglietto (id,entrata) VALUES (?,?)`,id, et,(error,result)=>{
        if(error){
           const response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
       const response = {
            "code": 1,
            "data": result,
            "id":id
        }
        res.status(200).send(response);
    });
    const data = Date(d);
});

app.put('/biglietto/:id', (req, res)=>{
    const id =req.params.id
    const d= new Date().getTime();
    let us= d;
    db.run(`UPDATE biglietto SET uscita=? WHERE id=?`, us, id, (error, rows)=>{
        if(error){
            console.log(error.message);
           const response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
       const response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});
 
app.get('/biglietto/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM biglietto WHERE id=?`, id, (error, rows) => {
        if(error){
            console.log(error.message);
           const response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
       const response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});

app.delete('/biglietto/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM biglietto WHERE id = ?`, id, (error, result) => {
        if(error){
           const response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
       const response = {
            "code": 1,
            "data": result
        }
        res.status(200).send(response);
    });
});
