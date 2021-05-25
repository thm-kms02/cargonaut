class Anzeige {
    userId: number;
    angges: boolean;
    datum: Date;
    beschreibung: string;
    preis: number;
    start: string;
    ziel: string;
    personen: number;
    ladeflaeche: number;
    ladungsgewicht: number;
    ladehoehe: number;

    constructor(userId: number, angges: boolean, datum: Date, beschreibung: string, preis: number, start: string, ziel: string, personen: number, ladeflaeche: number, ladungsgewicht: number, ladehoehe: number) {
        this.userId = userId;
        this.angges = angges;
        this.datum = datum;
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


let mainarea: JQuery;
let addOfferArea: JQuery;
let createOfferBTN: JQuery;

$(() => {
    mainarea = $("#mainArea");
    addOfferArea = $("#addOfferArea");
    createOfferBTN = $("#createOfferBTN");

    addOfferArea.hide();

    createOfferBTN.on('click', () => {
        mainarea.hide();
        addOfferArea.show();
    })
})
