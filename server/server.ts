import express = require('express');
import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";
import {Request, Response} from 'express';
import {Anzeige} from "../class/anzeige";
import {User} from "../class/user";
import {Anzeige_bild} from "../class/anzeige_bild";
import {Fahrzeug} from "../class/fahrzeug";
import {AnzeigeRender} from "../class/anzeigeRender";
import {log} from "util";

const app = express();
const database: Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cargo'
});
const basedir: string = __dirname + '/../'
app.use("/", express.static(basedir + '/client/'));
app.use("/", express.static(basedir + '/CSS/'));
app.use("/", express.static(basedir + '/bilder/'));
app.use("/", express.static(basedir));

app.use(express.json());

app.listen(8080, () => {
    console.log('Server started at http://localhost:8080');
});

database.connect((err: MysqlError) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Database is connected');
    }
});

app.get('/anzeige', (req: Request, res: Response) => {
    let offerslist: AnzeigeRender[] = [];
    let offers: any[];
    let taxi: any[];
    let cargo: any[];
    const query: string = 'SELECT anzeige.id, anzeige.user_id, ang_ges, datum, preis, start, ziel, beschreibung, name, bild_pfad FROM anzeige join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id;';
    database.query(query, (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            offers = rows;
            const query2 = 'SELECT * FROM personenbefoerderung';
            const query3 = 'SELECT * FROM lieferung';
            database.query(query2, (err: MysqlError, rows: any) => {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                } else {
                    taxi = rows;
                }
            });
            database.query(query3, (err: MysqlError, rows: any) => {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                } else {
                    cargo = rows;
                }
                for (let offer of offers) {
                    let store = findbyId(offer.id, cargo);
                    if (store != false) {
                        offerslist.push(new AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, 1, null, store.ladeflaeche, offer.marke, store.ladungsgewicht, store.ladehoehe, store.name,store.bild_pfad));
                    } else {
                        store = findbyId(offer.id, taxi);
                        if (store != false) {
                            offerslist.push(new AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, 1, store.personen, 0, 0, 0, offer.name, offer.bild_pfad));
                        }
                    }
                }
                res.status(200).send({

                    result: offerslist
                });
            });

        }
    })
});

app.get('/fahrzeug', (req: Request, res: Response) => {
    let fahrzeug: Fahrzeug[] = [];
    const query: string = 'SELECT * FROM fahrzeug';
    database.query(query, (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            fahrzeug = rows
            res.status(200).send({
                result: fahrzeug
            });

        }
    });
});

app.get('/anzeige_bild', (req: Request, res: Response) => {
    let offerslist: Anzeige_bild[] = [];
    let an_bild: any[];
    let bild: any[];

    const query: string = 'SELECT * FROM bild';
    database.query(query, (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            bild = rows;

            const query3 = 'SELECT * FROM anzeige_bild';
            database.query(query3, (err: MysqlError, rows: any) => {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                } else {
                    an_bild = rows;
                }
                for (let abild of bild) {
                    let store = findbyId(abild.bild_id, an_bild);
                    if (store != false) {
                        offerslist.push(new Anzeige_bild(abild.bild_id, abild.pfad));
                    }
                }
                res.status(200).send({
                    result: offerslist
                });
            });

        }
    })
});

function findbyId(id: number, list: any[]) {
    for (let elem of list) {
        if (elem.anz_ID == id) {
            return elem;
        }
    }
    return false;
}

app.post('/create/anzeige', (req: Request, res: Response) => {
    const anzeige: Anzeige = new Anzeige(req.body.user_id, req.body.ang_ges, req.body.datum, req.body.preis,
        req.body.start, req.body.ziel, req.body.beschreibung, req.body.id_fahrzeug, req.body.personen, req.body.ladeflaeche,
        req.body.ladungsgewicht, req.body.ladehoehe);
    let data = [anzeige.user_id, anzeige.ang_ges, anzeige.datum, anzeige.preis, anzeige.start, anzeige.ziel, anzeige.beschreibung,
        anzeige.id_fahrzeug]
    let cQuery: string = "INSERT INTO anzeige (user_id, ang_ges, datum, preis, start, ziel, beschreibung, id_fahrzeug) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    database.query(cQuery, data, (err, results: any) => {
        if (anzeige.personen == 0 && anzeige.ladeflaeche != 0 && anzeige.ladehoehe != 0 && anzeige.ladungsgewicht != 0) {
            data = [results.insertId, anzeige.ladeflaeche, anzeige.ladungsgewicht, anzeige.ladehoehe];
            cQuery = "INSERT INTO lieferung(anz_ID, ladeflaeche, ladungsgewicht, ladehoehe) VALUES (?,?,?,?)";
        } else if (anzeige.personen != 0 && anzeige.ladeflaeche == 0 && anzeige.ladehoehe == 0 && anzeige.ladungsgewicht == 0) {
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
app.post('/create/fahrzeug', (req: Request, res: Response) => {
    const fahrzeug: Fahrzeug = new Fahrzeug(req.body.user_id, req.body.name, req.body.jahr, req.body.volumen,
        req.body.gewicht, req.body.bild_pfad);
    let data = [fahrzeug.user_id, fahrzeug.name, fahrzeug.jahr, fahrzeug.volumen, fahrzeug.gewicht, fahrzeug.bild_pfad]

    const cQuery: string = "INSERT INTO fahrzeug (user_id, name, jahr, volumen, gewicht, bild_pfad ) VALUES (?, ?, ?, ?, ?, ?);";
    database.query(cQuery, data, (err) => {
        if (err === null) {
            res.status(201);
            res.send(" Fahrzeug wurde erstellt");
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
    const data = [bild_ID, pfad]

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
    const data = [anz_ID, b_id]
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
