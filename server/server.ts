import express = require('express');
import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";
import { Request, Response } from 'express';
import {Anzeige} from "../class/anzeige";
import {User} from "../class/user";

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
    let offerslist: Anzeige[] = [];
    let offers: any[];
    let taxi: any[];
    let cargo: any[];
    const query: string = 'SELECT * FROM anzeige';
    database.query(query, (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            offers = rows;
           const query2 = 'SELECT * FROM personenbefoerderung';
            const query3 ='SELECT * FROM lieferung';
            database.query(query2, (err: MysqlError, rows: any) => {
                if(err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                } else {
                    taxi = rows;
                }
            });
            database.query(query3, (err: MysqlError, rows: any) => {
                if(err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                } else {
                    cargo = rows;
                }
                for(let offer of offers) {
                    let store = findbyId(offer.id, cargo);
                    if (store!=false) {
                        offerslist.push(new Anzeige(offer.user_id, offer.ang_ges, offer.beschreibung, offer.preis, offer.start, offer.ziel, 0, store.ladeflaeche, store.ladungsgewicht, store.ladehoehe ));
                    } else {
                        store = findbyId(offer.id, taxi);
                        if(store!=false) {
                        offerslist.push(new Anzeige(offer.user_id, offer.ang_ges, offer.beschreibung, offer.preis, offer.start, offer.ziel, store.personen, 0, 0, 0 ));
                    }}
                }
                res.status(200).send({
                    result: offerslist
                });
            });

        }
    })
});
function findbyId(id: number, list: any[]) {
    for(let elem of list) {
        if (elem.anz_ID == id) {
            return elem;
        }
    }
    return false;
}

app.post('/create/anzeige', (req: Request, res: Response) => {
    const anzeige: Anzeige = new Anzeige(req.body.userId, req.body.angges, req.body.beschreibung, req.body.preis, req.body.start, req.body.ziel, req.body.personen, req.body.ladeflaeche, req.body.ladungsgewicht, req.body.ladehoehe);
    let data = [anzeige.userId, anzeige.angges, anzeige.preis, anzeige.start, anzeige.ziel, anzeige.beschreibung]
    let cQuery: string = "INSERT INTO anzeige (user_id, ang_ges,preis, start, ziel, beschreibung ) VALUES (?, ?, ?, ?, ?, ?);";
    database.query(cQuery, data, (err, results: any) => {
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

app.post('/create/account', (req: Request, res: Response) => {
    const user: User = new User(req.body.email, req.body.name, req.body.handyNr, req.body.passwort);
    let data = [user.email, user.name, user.handyNr, user.passwort]
    let cQuery: string = "INSERT INTO user (email, name, handyNr, passwort) VALUES (?, ?, ?, ?);";
    database.query(cQuery, data, (err, results: any) => {
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
