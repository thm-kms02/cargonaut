// tslint:disable-next-line:no-var-requires
const chain = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttps = require("chai-http");
// tslint:disable-next-line:no-var-requires
const host = require("../server/server");

chain.should();
chain.use(chaiHttps);
describe("Post /create/Anzeige", async () => {
    it("Soll eine Anzeige für Personenbefoerderung erstellen", (done) => {
        const Personbefoerderung = {
            user_ID: 1,
            anzahlPersonen: 4,
            preis: 300,
            ang_ges: 1,
            start: "Gießen",
            ziel: "Hamburg",
            beschreibung: "TestTestTestTest",
            bild: "test_path_irgendwas"
        };
        chain
            .request("http://localhost:8080")
            .post("/create/Personenbefoerderung")
            .send(Personbefoerderung)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });
   /* it("Soll eine Anzeige für Lieferung erstellen", (done) => {
        const lieferung = {
            user_ID: 1,
            ladungsgewicht: 4,
            ladeflaeche: 4,
            ladehoehe: 3,
            preis: 300,
            ang_ges: 1,
            start: "Gießen",
            ziel: "Hamburg",
            beschreibung: "TestTestTestTest",
            bild: "test_path_irgendwas"
        };
        chain
            .request("http://localhost:8080")
            .post("/create/Lieferung")
            .send(lieferung)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });

    */
});
