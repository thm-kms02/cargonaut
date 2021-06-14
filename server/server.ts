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
import {Bewertung} from "../class/bewertung";
import {domainToASCII} from "url";

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


// routs for sign up, login and logout

app.post('/create/account', (req: Request, res: Response) => {
    const user: User = new User(req.body.email, req.body.name, req.body.password, req.body.birthday, req.body.img);
    let data = [user.email, user.name, user.passwort, user.geburtsdatum, user.profil_bild]
    let cQuery: string = "INSERT INTO user (email, name, passwort, geburtsdatum, bild) VALUES (?, ?, ?, ?, ?);";
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

app.delete('/logout',(req:Request,res:Response)=>{
    session.destroy;
        res.clearCookie('connect.sid', { path: '/' });
        res.send("Sie wurden abgemeldet");
});

// routs for get all Offers, create Offers, read a offer, filter offers
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
                        offerslist.push(new AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, null, store.ladeflaeche, store.ladungsgewicht, store.ladehoehe, offer.name, offer.bild_pfad,offer.id));
                    } else {
                        store = findbyId(offer.id, taxi);
                        if (store != false) {
                            offerslist.push(new AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, store.personen, 0, 0, 0, offer.name, offer.bild_pfad,offer.id));
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

app.get('/read/offer/:id', (req: Request, res: Response) => {
    const query = 'SELECT * FROM anzeige, user, fahrzeug WHERE anzeige.id = ? AND anzeige.user_id = user.user_id AND anzeige.id_fahrzeug = fahrzeug.id';
    const data = [req.params.id];
    database.query(query, data, (err: MysqlError, results: any) => {
        if(err) {
            res.status(500).send({err});
        } else {
            res.status(200).send({"result":results[0]});
        }
    });
});

app.get('/difUser/:id', (req: Request, res: Response) => {
    let user : User;
    let carsList: Fahrzeug[] = [];
    const query: string = "SELECT * FROM user WHERE user_id=?";
    database.query(query, [req.params.id], (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            user = new User(rows[0].email, rows[0].name, rows[0].passwort, rows[0].geburtsdatum, rows[0].bild);
            const query1: string = "SELECT * FROM fahrzeug WHERE fahrzeug.user_id=?";
            const data1 = [req.params.id];
            database.query(query1, data1,(err: MysqlError, rows:any) => {
                if(err) {
                    res.status(500).send({err});
                } else {
                    rows.forEach((row) => {
                        let car: Fahrzeug = new Fahrzeug(row.name, row.jahr, row.volumen, row.gewicht, row.bild_pfad, row.id)
                        carsList.push(car);
                    });
                    res.status(200).send({"user":user, "cars":carsList});
                }
            });
        }
    });
});

function findbyId(id: number, list: any[]) {
    for (let elem of list) {
        if (elem.anz_ID == id) {
            return elem;
        }
    }
    return false;
}

app.post('/anzeige/filter', (req: Request, res: Response) => {
    let anzeigen:AnzeigeRender[]=[];
    let ang_ges: number=req.body.ang_ges;
    let kategorie: number = req.body.kategorie; //1 = ladungsbeförderung, 2 = personenbeförderung
    let cQuery: string;
    if (kategorie == undefined){
        if (ang_ges == undefined) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID"
        }if (ang_ges == 0){
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID where ang_ges = 0"
        }
        if (ang_ges == 1){
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID where ang_ges = 1"
        }
    }
    if (kategorie == 2) {
        console.log(" bin 2")
        if (ang_ges == 1) {
            console.log(" bin 2,1")
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,fahrzeug.name,fahrzeug.bild_pfad from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID   left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id where ang_ges = 1";
        } else {
            console.log(" bin 2,2")
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,fahrzeug.name,fahrzeug.bild_pfad from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID   left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id where ang_ges = 0";
        }
    } if (kategorie == 1) {
        if (ang_ges == 1) {
            cQuery = "SELECT anzeige.*,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige right join lieferung on anzeige.id = lieferung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id where ang_ges = 1";
        } else {
            cQuery = "SELECT anzeige.*,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige right join lieferung on anzeige.id = lieferung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id where ang_ges = 0";
        }
    }
    database.query(cQuery, (err, results: any) => {
        if (err === null) {
            res.status(200);

            for(let i=0;i<results.length;i++){
                anzeigen.push(new AnzeigeRender(results[i].user_id, results[i].ang_ges, results[i].datum, results[i].preis, results[i].start,
                    results[i].ziel, results[i].beschreibung, results[i].id_fahrzeug, results[i].personen, results[i].ladeflaeche,
                    results[i].ladungsgewicht, results[i].ladehoehe, results[i].name, results[i].bild_pfad, results[i].id));
            }
            console.log(anzeigen.length)
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

// routs for get user and update user

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

// routs for create a car, get a car, delete a car

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

// routs for tracking

app.get('/trackingrole/:trackID', (req: Request, res: Response) => {
    session.user_id=2;
    const query: string = 'SELECT * FROM tracking WHERE tracking.id =?';
    const data = [req.params.trackID];

    database.query(query, data,(err: MysqlError, results: any) => {
        if(err) {
            res.status(500).send({err, "trackRole":0});
        } else {
            if(results[0].writer==session.user_id) {
                res.status(200).send({"trackRole":2});
            } else if(results[0].reader==session.user_id) {
                res.status(200).send({"trackRole":1})
            } else {
                res.status(200).send({"trackRole":0})
            }
        }
    });

});

app.get('/getGPS/:trackID', (req: Request, res: Response) => {
    session.user_id=1;
    const query: string= 'SELECT * FROM tracking WHERE tracking.id =?'
    const data = [req.params.trackID];

    database.query(query, data, (err: MysqlError, results: any) => {
        if(err) {
            res.status(500).send();
        } else {
            if (results[0].reader==session.user_id) {
                res.status(200).send({"lat":results[0].lat, "lng": results[0].lng});
            } else {
                res.status(200).send({"message":"You are not authorized!"});
            }
        }
    });
});

app.post('/create/location', (req: Request, res: Response) => {
    const query: string = 'SELECT * FROM tracking WHERE tracking.id =?';
    const data = [req.body.tracknum];
    database.query(query, data,(err: MysqlError, results: any) => {
        if(err) {
            res.status(500).send({err});
        } else {
            if(results!=undefined) {
                if(results[0].writer==session.user_id) {
                    const query1: string = 'UPDATE tracking SET lat=?, lng=? WHERE tracking.id=?'
                    const data1 = [req.body.lat, req.body.lng, req.body.tracknum];
                    database.query(query1, data1, (err: MysqlError, results:any) => {
                        if(err) {
                            res.status(500).send({err});
                        } else {
                            res.status(200).send();
                        }
                    });
                }
            } else {
                res.status(404).send({"message":"Tracking number could not be found!"});
            }
        }
    });

});

// routs for get and send Messages
/*app.get('/messages', (req: Request, res: Response) => {
    let query: string = "SELECT * FROM nachricht WHERE empfaenger_id=?"
    let data = [session.user_id];
    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err === null) {
            res.status(200).send({result: rows});
        } else {
            res.status(500).send({err});
        }
    });
});*/

/*app.post('/create/message', (req: Request, res: Response) => {
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
});*/

//routs for buying

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
    const anzID: number = req.body.anzID;
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

// routs for get rating and post rating

app.get('/bewertung/get', (req:Request, res:Response)=>{
    let  cQuery = "SELECT *,user.name from bewertung";
    let  bewertung: Bewertung[]=[];
    database.query(cQuery, (err, results: any) => {
        if (err === null) {
            res.status(200);
            bewertung =results;
            res.send(bewertung);
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

app.post('/bewertung/post', (req:Request, res:Response)=>{
    let bewertung:Bewertung = new Bewertung(session.user_id,req.body.id_empfaenger,req.body.bewertung,req.body.kommentar);
    let data = [bewertung.id_verfasser,bewertung.id_empfaenger,bewertung.bewertung,bewertung.kommentar];
    let cQuery = "INSERT INTO bewertung (id_verfasser, id_empfaenger, bewertung, kommentar) VALUES (?, ?, ?, ?) ";
    database.query(cQuery, data,(err, results: any) => {
        if (err === null) {
            res.status(200);
            res.send("Bewertung wurde gespeichert");
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

