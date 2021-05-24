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

app.get('/create/anzeige', (req: Request, res: Response) => {

    const query: string = 'SELECT * FROM anzeige';
    database.query(query, (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                result: rows
            });
        }
    })
});


app.post('/create/anzeige', (req: Request, res: Response) => {
    const user_ID: string = req.body.user_ID;
    const preis: string = req.body.preis;
    const ang_ges: string = req.body.ang_ges;
    const start: string = req.body.start;
    const ziel: string = req.body.ziel;
    const datum:string =req.body.datum;
    const beschreibung: string = req.body.beschreibung;



    const data = [user_ID, ang_ges,datum, preis ,start,ziel,beschreibung];

    const cQuery: string = "INSERT INTO anzeige (user_id, ang_ges, datum,preis, start, ziel, beschreibung ) VALUES (?, ?, ?, ?, ?, ?,?);";
    database.query(cQuery, data, (err) => {
        if (err === null) {
            res.status(201);
            res.send(" anzeige wurde erstellt");
        } else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });

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

app.post('/create/lieferung', (req: Request, res: Response) => {
    const anz_ID: string = req.body.anz_ID;
    const ladefläche: string = req.body.ladefläche;
    const ladungsgewicht: string = req.body.ladungsgewicht;
    const ladehoehe: string = req.body.ladehoehe;



    const data = [anz_ID,ladefläche,ladungsgewicht,ladehoehe]

    const cQuery: string = "INSERT INTO lieferung (anz_ID,ladeflaeche,ladungsgewicht,ladehoehe ) VALUES (?, ?, ?, ?);";
    database.query(cQuery, data, (err) => {
        if (err === null) {
            res.status(201);
            res.send(" Lieferung wurde erstellt");
        } else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });

});

app.post('/create/bild', (req: Request, res: Response) => {
    const bild_ID: string = req.body.bild_ID;
    const pfad: string = req.body.pfad;



    const data = [bild_ID,pfad]

    const cQuery: string = "INSERT INTO bild (bild_ID, pfad ) VALUES (?, ?);";
    database.query(cQuery, data, (err) => {
        if (err === null) {
            res.status(201);
            res.send(" bild wurde hinzugefügt");
        } else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });

});


app.post('/create/anzeige_bild', (req: Request, res: Response) => {
    const anz_ID: string = req.body.anz_ID;
    const b_id: string = req.body.b_id;



    const data = [anz_ID,b_id]

    const cQuery: string = "INSERT INTO bild (anz_ID, b_id ) VALUES (?, ?);";
    database.query(cQuery, data, (err) => {
        if (err === null) {
            res.status(201);
            res.send(" anzeige von Bilder  wurde erstellt");
        } else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });

});