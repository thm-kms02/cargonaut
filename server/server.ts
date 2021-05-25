import express = require('express');
import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";
import { Request, Response } from 'express';
class Anzeige {
    userId: number;
    angges: boolean;

    beschreibung: string;
    preis: number;
    start: string;
    ziel: string;
    personen: number;
    ladeflaeche: number;
    ladungsgewicht: number;
    ladehoehe: number;

    constructor(userId: number, angges: boolean, beschreibung: string, preis: number, start: string, ziel: string, personen: number, ladeflaeche: number, ladungsgewicht: number, ladehoehe: number) {
        this.userId = userId;
        this.angges = angges;
        this.beschreibung = beschreibung;
        this.preis = preis;
        this.start = start;
        this.ziel = ziel;
        this.personen = personen;
        this.ladeflaeche = ladeflaeche;
        this.ladungsgewicht = ladungsgewicht;
        this.ladehoehe = ladehoehe;
    }
}


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

app.get('/anzeige', (req: Request, res: Response) => {

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
   const anzeige: Anzeige = new Anzeige(req.body.anzeige.userId, req.body.anzeige.angges, req.body.anzeige.beschreibung, req.body.anzeige.preis, req.body.anzeige.start, req.body.anzeige.ziel, req.body.anzeige.personen, req.body.anzeige.ladeflaeche, req.body.anzeige.ladungsgewicht, req.body.anzeige.ladehoehe)

    let data = [anzeige.userId, anzeige.angges, anzeige.preis, anzeige.start, anzeige.ziel, anzeige.beschreibung]

    let cQuery: string = "INSERT INTO anzeige (user_id, ang_ges,preis, start, ziel, beschreibung ) VALUES (?, ?, ?, ?, ?, ?);";
    database.query(cQuery, data, (err, results: any) => {
            console.log(results.insertId)
        if(anzeige.personen==0&&anzeige.ladeflaeche!=0&&anzeige.ladehoehe!=0&&anzeige.ladungsgewicht!=0) {
            data = [results.insertId, anzeige.ladeflaeche, anzeige.ladungsgewicht, anzeige.ladehoehe];
            cQuery = "INSERT INTO lieferung(anz_ID, ladeflaeche, ladungsgewicht, ladehoehe) VALUES (?,?,?,?)";
        } else if(anzeige.personen!=0&&anzeige.ladeflaeche==0&&anzeige.ladehoehe==0&&anzeige.ladungsgewicht==0){
            data = [results.insertId, anzeige.personen];
            cQuery = "INSERT INTO personenbefoerderung(anz_ID, personen) VALUES (?,?)";
        } else {
            data = [results.insertId];
            cQuery = "DELETE from anzeige WHERE id=?)";
        }
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
    const cQuery: string = "INSERT INTO anzeige_bild (anz_ID, b_id ) VALUES (?, ?);";
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