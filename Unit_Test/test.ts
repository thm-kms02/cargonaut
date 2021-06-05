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
            email: "test@gmail.commm",
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
    it('soll ein Bild erstellen ', function (done) {

    });
    it('soll Fahrzeug erstellen/hinzufuegen', function (done) {
        const fahrzeug = {
            user_id: 1,
            name: "VW Golf",
            volumen: 500,
            gewicht: 1500,
            bild_id: null
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
                userId: 1,
                angges: 1,
                beschreibung: "TestTestTestTest",
                preis: 300,
                start: "Gießen",
                ziel: "Hamburg",
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
                userId: 1,
                angges: 1,
                beschreibung: "TestTestTestTest",
                preis: 300,
                start: "Gießen",
                ziel: "Hamburg",
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
