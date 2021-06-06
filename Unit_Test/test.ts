// tslint:disable-next-line:no-var-requires
import {describe} from "mocha";

const chain = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttps = require("chai-http");
// tslint:disable-next-line:no-var-requires
const host = require("../server/server");

chain.should();
chain.use(chaiHttps);
describe("Post /create/Account", async () => {
    it("Erstellt ein Account", (done) => {
        const account = {
//email ist Uniqe, bitte vor jedem Test ändern
            email: "test@gmail21.commm",
            name: "Max Mustermann",
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

describe("Post/create/fahrzeug", async  () => {
    it('soll Fahrzeug erstellen/hinzufuegen', function (done) {
        const fahrzeug = {
            user_id: 1,
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
                user_id: 1,
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
                user_id: 1,
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
