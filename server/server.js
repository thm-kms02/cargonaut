"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var anzeige_1 = require("../class/anzeige");
var user_1 = require("../class/user");
var anzeige_bild_1 = require("../class/anzeige_bild");
var app = express();
var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cargo'
});
var basedir = __dirname + '/../';
app.use("/", express.static(basedir + '/client/'));
app.use("/", express.static(basedir + '/CSS/'));
app.use("/", express.static(basedir));
app.use(express.json());
app.listen(8080, function () {
    console.log('Server started at http://localhost:8080');
});
database.connect(function (err) {
    if (err) {
        console.log('Database connection failed: ', err);
    }
    else {
        console.log('Database is connected');
    }
});
app.get('/anzeige', function (req, res) {
    var offerslist = [];
    var offers;
    var taxi;
    var cargo;
    var query = 'SELECT * FROM anzeige';
    database.query(query, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            offers = rows;
            var query2 = 'SELECT * FROM personenbefoerderung';
            var query3 = 'SELECT * FROM lieferung';
            database.query(query2, function (err, rows) {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                }
                else {
                    taxi = rows;
                }
            });
            database.query(query3, function (err, rows) {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                }
                else {
                    cargo = rows;
                }
                for (var _i = 0, offers_1 = offers; _i < offers_1.length; _i++) {
                    var offer = offers_1[_i];
                    var store = findbyId(offer.id, cargo);
                    if (store != false) {
                        offerslist.push(new anzeige_1.Anzeige(offer.user_id, offer.ang_ges, offer.datum, offer.beschreibung, offer.preis, offer.start, offer.ziel, 0, null, store.ladeflaeche, null, store.ladungsgewicht, store.ladehoehe));
                    }
                    else {
                        store = findbyId(offer.id, taxi);
                        if (store != false) {
                            offerslist.push(new anzeige_1.Anzeige(offer.user_id, offer.ang_ges, offer.datum, offer.beschreibung, offer.preis, offer.start, offer.ziel, store.personen, store.fahrzeug, 0, offer.marke, 0, 0));
                        }
                    }
                }
                res.status(200).send({
                    result: offerslist
                });
            });
        }
    });
});
app.get('/anzeige_bild', function (req, res) {
    var offerslist = [];
    var an_bild;
    var bild;
    var query = 'SELECT * FROM bild';
    database.query(query, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            bild = rows;
            var query3 = 'SELECT * FROM anzeige_bild';
            database.query(query3, function (err, rows) {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                }
                else {
                    an_bild = rows;
                }
                for (var _i = 0, bild_1 = bild; _i < bild_1.length; _i++) {
                    var abild = bild_1[_i];
                    var store = findbyId(abild.bild_id, an_bild);
                    if (store != false) {
                        offerslist.push(new anzeige_bild_1.Anzeige_bild(abild.bild_id, abild.pfad));
                    }
                }
                res.status(200).send({
                    result: offerslist
                });
            });
        }
    });
});
function findbyId(id, list) {
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var elem = list_1[_i];
        if (elem.anz_ID == id) {
            return elem;
        }
    }
    return false;
}
app.post('/create/anzeige', function (req, res) {
    var anzId;
    var bilder = req.body.bilder;
    var anzeige = new anzeige_1.Anzeige(req.body.userId, req.body.angges, req.body.datum, req.body.beschreibung, req.body.preis, req.body.start, req.body.ziel, req.body.personen, req.body.fahrzeug, req.body.ladeflaeche, req.body.marke, req.body.ladungsgewicht, req.body.ladehoehe);
    console.log("beschreibung " + anzeige.beschreibung + "preis" + anzeige.preis + "ladegewischt " + anzeige.ladungsgewicht, "ladeflaeche " + anzeige.ladeflaeche, "fahrzeug" + anzeige.fahrzeug + anzeige.marke);
    var data = [anzeige.userId, anzeige.angges, anzeige.datum, anzeige.preis, anzeige.start, anzeige.ziel, anzeige.beschreibung];
    var cQuery = "INSERT INTO anzeige (user_id, ang_ges,datum,preis, start, ziel, beschreibung ) VALUES (?, ?, ?, ?, ?, ?, ?);";
    database.query(cQuery, data, function (err, results) {
        if (anzeige.personen == 0 && anzeige.ladeflaeche != 0 && anzeige.ladehoehe != 0 && anzeige.ladungsgewicht != 0) {
            data = [results.insertId, anzeige.ladeflaeche, anzeige.ladungsgewicht, anzeige.ladehoehe];
            cQuery = "INSERT INTO lieferung(anz_ID, ladeflaeche, ladungsgewicht, ladehoehe) VALUES (?,?,?,?)";
        }
        else if (anzeige.personen != 0 && anzeige.ladeflaeche == 0 && anzeige.ladehoehe == 0 && anzeige.ladungsgewicht == 0) {
            data = [results.insertId, anzeige.personen, anzeige.fahrzeug, anzeige.marke];
            cQuery = "INSERT INTO personenbefoerderung(anz_ID, personen, fahrzeugart,fahrzeugmarke) VALUES (?,?,?,?)";
        }
        else {
            data = [results.insertId];
            cQuery = "DELETE from anzeige WHERE id=?)";
            res.status(500).send({ "message": "Fehler" });
        }
        anzId = results.insertId;
        database.query(cQuery, data, function (err) {
            if (err === null) {
                if (bilder.length > 0) {
                    bilder.forEach(function (bild) {
                        var bId = saveBild(bild);
                        if (bId == false) {
                            res.status(500).send({ "message": "Fehler" });
                        }
                        else {
                            cQuery = "INSERT INTO anz_bild (anz_ID, b_id) VALUES (?,?)";
                            data = [anzId, bId];
                            database.query(cQuery, data, function (err, results) {
                                if (err != null) {
                                    res.status(500).send({ "message": "Fehler" });
                                }
                            });
                        }
                    });
                }
                res.status(201);
                res.send(" anzeige wurde erstellt");
            }
            else if (err.errno === 1062) {
                res.status(500);
                res.send("Fehler");
            }
            else {
                console.log(err);
                res.sendStatus(500);
            }
        });
    });
});
function saveBild(pfad) {
    var query = "INSERT INTO bild (pfad) VALUES (?)";
    var data = [pfad];
    database.query(query, data, function (err, results) {
        if (err == null) {
            return results.insertId;
        }
        else {
            return false;
        }
    });
}
/*

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
*/
app.post('/create/account', function (req, res) {
    var user = new user_1.User(req.body.email, req.body.name, req.body.handyNr, req.body.passwort);
    var data = [user.email, user.name, user.handyNr, user.passwort];
    var cQuery = "INSERT INTO user (email, name, handyNr, passwort) VALUES (?, ?, ?, ?);";
    database.query(cQuery, data, function (err, results) {
        if (err === null) {
            res.status(201);
            res.send(" anzeige wurde erstellt");
        }
        else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});
