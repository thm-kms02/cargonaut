import express = require('express');
import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";
import { Request, Response } from 'express';



const app = express();
const database : Connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cargo'
});
const basedir: string = __dirname + '/../'
app.use("/", express.static(basedir + '/client/'));
app.use("/", express.static(basedir + '/CSS/'));
app.use("/", express.static(basedir));

app.use(express.json());

app.listen(8080, () => {
    console.log('Server started at http://localhost:8080');
});

database.connect( (err: MysqlError) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Database is connected');
    }
});

app.post('/create/Personenbefoerderung', (req: Request, res: Response) => {
    const user_ID: string = req.body.user_ID;
    const anzahlPersonen: string = req.body.anzahlPersonen;
    const preis: string = req.body.preis;
    const ang_ges: string = req.body.ang_ges;
    const start: string = req.body.start;
    const ziel: string = req.body.ziel;
    const beschreibung: string = req.body.beschreibung;
    const bild: string = req.body.beschreibung;


    const data = [user_ID, ang_ges, preis ,start,ziel,beschreibung];

        const cQuery: string = "INSERT INTO Anzeige (user_ID, ang_ges, preis, start, ziel, beschreibung ) VALUES (?, ?, ?, ?, ?, ?);";
        database.query(cQuery, data, (err) => {
            if (err === null) {
                res.status(201);
                res.send(" Anzeige wurde erstellt");
            } else if (err.errno === 1062) {
                res.status(500);
                res.send("Fehler");
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        });

});
