import express = require('express');
import mysql = require('mysql');
import {Connection, MysqlError, Query} from "mysql";
import {query, Request, response, Response} from 'express';
import {Anzeige} from "../class/anzeige";
import {User} from "../class/user";
import {Anzeige_bild} from "../class/anzeige_bild";
import {Fahrzeug} from "../class/fahrzeug";
import {AnzeigeRender} from "../class/anzeigeRender";
import {Kasse} from "../class/kasse";
import {Buchen} from "../class/buchen";
import * as session from "express-session";

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
// Session-Route
app.use(session({cookie: {expires: new Date(Date.now() + 1000 * 60 * 60)}, secret: Math.random().toString()}))

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

app.post('/login', (req: express.Request, res: express.Response) => {
    let email: string = req.body.email;
    let passwort: string = req.body.passwort;

    const query: string = 'SELECT user_id, passwort from user where email = email'
    database.query(query, (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Diese Emailadresse ist nicht registriert',
                result: false
            })
        } else {
            if (passwort === rows[0].passwort) {
                session.email = email;
                session.user_id = rows[0].user_id;
                res.status(200).send({

                    message: 'Anmeldung war erfolgreich'
                })
            } else {
                res.status(400).send({
                    message: 'Passwort ist falsch'
                })
            }
        }

    })
});

app.delete('/car/:carId', (req: Request, res: Response) => {
    let id: number = Number(req.params.userMail);
    let query: string = 'DELETE FROM fahrzeug WHERE fahrzeug.id=?';
    database.query(query, [id], (err: MysqlError) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Fahrzeug gelöscht '
            });
        }
    });
});

app.get('/anzeige', (req: Request, res: Response) => {

    let offerslist: AnzeigeRender[] = [];
    let offers: any[];
    let taxi: any[];
    let cargo: any[];
    const query: string = 'SELECT anzeige.id, anzeige.user_id, ang_ges, datum, preis, start, ziel, beschreibung, name, bild_pfad FROM anzeige left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id';
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
                        offerslist.push(new AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, null, store.ladeflaeche, store.ladungsgewicht, store.ladehoehe, offer.name, offer.bild_pfad));
                    } else {
                        store = findbyId(offer.id, taxi);
                        if (store != false) {
                            offerslist.push(new AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, store.personen, 0, 0, 0, offer.name, offer.bild_pfad));
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

app.get('/user', (req: Request, res: Response) => {

    const query: string = "SELECT * FROM user WHERE user_id=?";
    database.query(query, [session.user_id], (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                result: rows[0]
            });

        }
    });
});

app.get('/fahrzeug', (req: Request, res: Response) => {

    let fahrzeug: Fahrzeug[] = [];
    const query: string = 'SELECT fahrzeug.name FROM fahrzeug left join user on user.user_id = fahrzeug.user_id where user.email = ?';
    database.query(query, [session.email], (err: MysqlError, rows: any) => {
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

app.get('/messages/:userMail', (req: Request, res: Response) => {
    let id: string = req.params.userMail;
    let query: string = "SELECT * FROM nachricht WHERE empfaenger_id=?"
    let data = [id];
    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err === null) {
            res.status(200).send({result: rows});
        } else {
            res.status(500).send({err});
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

    const anzeige: Anzeige = new Anzeige(session.user_id, req.body.ang_ges, req.body.datum, req.body.preis,
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
            cQuery = "DELETE from anzeige WHERE id=?";
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
    const fahrzeug: Fahrzeug = new Fahrzeug(session.user_id, req.body.name, req.body.year, req.body.vol,
        req.body.weight, req.body.pic_path);
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

app.post('/create/message', (req: Request, res: Response) => {
    let absender: string = req.body.absender;
    let empfaenger: string = req.body.empfaenger;
    let inhalt: string = req.body.inhalt;
    let cquery: string = "INSERT INTO nachricht (absender_id, empfaenger_id, inhalt) VALUES (?,?,?);";
    let data = [absender, empfaenger, inhalt];
    database.query(cquery, data, (err: MysqlError) => {
        if (err === null) {
            res.status(201).send({"message": "Message created"});
        } else {
            res.status(500).send({err});
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

app.put('/update/user', (req: Request, res: Response) => {
    let email: string = req.body.email;
    let name: string = req.body.name;
    let phonenmbr: string = req.body.handyNr;

    let query: string = "UPDATE user SET name=?, handyNr=? WHERE user.email=?";
    let data = [name, phonenmbr, email];
    database.query(query, data, (err: MysqlError, results: any) => {
        if (err === null) {
            res.status(200).send({"message": "User updated."});
        } else {
            res.status(500).send({err});
        }
    });
});

app.post('/kasse', (req: Request, res: Response) => {
    const kasse: Kasse = new Kasse(req.body.user_id, req.body.anz_ID);
    let data = [kasse.user_id, kasse.anz_ID]
    let cQuery: string = "INSERT INTO kasse (user_id, anz_ID) VALUES (?, ?);";
    database.query(cQuery, data, (err, results: any) => {
        if (err === null) {
            res.status(201);
            res.send(" Anzeige wurde in die Kasse gelegt");
        } else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.post('/buchen', (req: Request, res: Response) => {
    const buchen: Buchen = new Buchen(req.body.id_kasse);
    let data = [buchen.id_kasse]
    let cQuery: string = "INSERT INTO buchungen (id_kasse) VALUES (?);";
    database.query(cQuery, data, (err, results: any) => {
        if (err === null) {
            res.status(201);
            res.send(" Anzeige wurde gebucht");
        } else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.post('/anzeige/filter', (req: Request, res: Response) => {
    let anzeigen:AnzeigeRender[]=[];
    let ang_ges: boolean =req.body.ang_ges;
    let kategorie: number = req.body.kategorie; //1 = ladungsbeförderung, 2 = personenbeförderung
    let cQuery: string;

    if (kategorie == 1) {
        if (ang_ges == true) {  // ang = False  ges = true
            cQuery = "SELECT * from anzeige right join lieferung on anzeige.id = lieferung.anz_ID where ang_ges = 1";
        } else { // ang_ges == false
            cQuery = "SELECT * from anzeige right join lieferung on anzeige.id = lieferung.anz_ID where ang_ges = 0";
        }
    } else {
        //kategorie 2
        if (ang_ges == true) {  // ang = False  ges = true
            cQuery = "SELECT * from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID where ang_ges = 1";
        } else { // ang_ges == false
            cQuery = "SELECT * from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID where ang_ges = 0";
        }
    }
    database.query(cQuery, (err, results: any) => {
        if (err === null) {
            res.status(200);

               for(let i=0;i<results.length;i++){
                   anzeigen[i]= results[i];
               }
            res.send(anzeigen);
            }

         else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

