// tslint:disable-next-line:no-var-requires
import {describe} from "mocha";

const chain = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttps = require("chai-http");
// tslint:disable-next-line:no-var-requires
const host = require("../server/server");

chain.should();
chain.use(chaiHttps);
 /*
describe("Post /create/Account", async () => {
    it("create a new account", (done) => {
        const account = { // email vor test/push immer ändern (unique)
            email: "test3@gmail.com",
            name: "Test Testermann",
            handyNr:"+49293204803",
            passwort:"test1234"
        };
        chain
            .request("http://localhost:8080")
            .post("/create/account")
            .send(account)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });
});
*
  */
describe("post/login", async () =>{
    it("login into the system", (done) => {
        const login= {
            email:'root@gmail.com',
            passwort:'root',
        };
        chain
            .request("http://localhost:8080")
            .post("/login")
            .send(login)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});

describe("Messages", async () => {
    it("Erstellt eine Nachricht", (done) => {
        const message = {
            absender: "test66@gmail.com",
            empfaenger: "test@gmail21.commm",
            inhalt:"Nachrichten test"
        };
        chain
            .request("http://localhost:8080")
            .post("/create/message")
            .send(message)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });
    it("Holt Nachrichten eines Benutzers", (done) => {
        const message = "test@gmail21.commm";
        chain
            .request("http://localhost:8080")
            .get("/messages/")
            .send(message)
            .end((err, response) => {
                console.log(response.body);
                response.should.have.status(200);
                done()
            });
    });
});



describe("Post/create/fahrzeug", async  () => {
    it('soll Fahrzeug erstellen/hinzufuegen', function (done) {
        const fahrzeug = {
            user_id: 31,
            name: "VW Golf",
            jahr:2010,
            volumen: 500,
            gewicht: 1500,
            bild_pfad: "bilder/img.pn"
        };

        chain
            .request("http://localhost:8080")
            .post("/create/fahrzeug")
            .send(fahrzeug)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done();

            });
    });
});
describe("Post /create/Anzeige", async () => {
        it("Soll eine Anzeige für Personenbefoerderung erstellen", (done) => {
            const anzeige = {
                user_id: 31,
                ang_ges: 0,
                datum:"2021-06-23",
                preis: 300,
                start: "Gießen",
                ziel: "Hamburg",
                beschreibung: "TestTestTestTest",
                id_fahrzeug:1,
                personen: 4,
                ladeflaeche: 0,
                ladungsgewicht: 0,
                ladehoehe: 0,
            };
            chain
                .request("http://localhost:8080")
                .post("/create/anzeige")
                .send(anzeige)
                .end((err, response) => {
                    console.log(response.status);
                    response.should.have.status(201);
                    done()
                });
        });


        it("Soll eine Anzeige für Lieferung erstellen", (done) => {
            const anzeige = {
                user_id: 31,
                ang_ges: 0,
                datum:"2021-06-23",
                preis: 300,
                start: "Gießen",
                ziel: "Hamburg",
                beschreibung: "TestTestTestTest",
                id_fahrzeug:1,
                personen: 0,
                ladeflaeche: 3,
                ladungsgewicht: 3,
                ladehoehe: 3,
            };
            chain
                .request("http://localhost:8080")
                .post("/create/anzeige")
                .send(anzeige)
                .end((err, response) => {
                    console.log(response.status);
                    response.should.have.status(201);
                    done()
                });
        });


    });
describe("Get/filter", async () =>{

});

describe("Post/Kasse/hinzufuegen", async () =>{
    it("Fügt Anzeige in die Kasse", (done) => {
        const kasse = {
            user_id: 1,
            anz_ID: 1
        };
        chain
            .request("http://localhost:8080")
            .post("/kasse")
            .send(kasse)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });

});
describe("Post/Kasse/buchen", async () =>{
    it("bucht eine Anzeige aus der Kasse", (done) => {
        const buchen= {
            id_kasse: 1,
        };
        chain
            .request("http://localhost:8080")
            .post("/buchen")
            .send(buchen)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });
});

describe("Post/localisation", async () =>{
    it("localisation", (done) => {
        const local= {
            tracknum:1

        };
        chain
            .request("http://localhost:8080")
            .get("/create/location")
            .send(local)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(404);
                done()
            });
    });
});


describe("Post/create/fahrzeug", async  () => {
    it('soll Fahrzeug erstellen/hinzufuegen', function (done) {
        const fahrzeug = {
            user_id: 31,
            name: "VW Golf",
            jahr:2010,
            volumen: 500,
            gewicht: 1500,
            bild_pfad: "bilder/img.pn"
        };

        chain
            .request("http://localhost:8080")
            .post("/create/fahrzeug")
            .send(fahrzeug)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done();

            });
    });
});

describe("anzeige/filter", async () =>{
    it("meldet nutzer an", (done) => {
        const filter= {
            ang_ges:true,
            kategorie:0
        };
        chain
            .request("http://localhost:8080")
            .post("/anzeige/filter")
            .send(filter)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});