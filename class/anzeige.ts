export class Anzeige {
    id: number;
    userId: number;
    angges: boolean;
    beschreibung: string;
    preis: number;
    start: string;
    ziel: string;
    personen: number;
    ladeflaeche: number;
    ladungsgewicht: number;
    ladehoehe: number;
    datum:string;
    fahrzeug:string;
    marke:string;
    constructor( userId: number, angges: boolean,datum:string, beschreibung: string, preis: number, start: string, ziel: string, personen: number,fahrzeug:string, ladeflaeche: number, marke:string, ladungsgewicht: number, ladehoehe: number, id?: number) {
        this.userId = userId;
        this.angges = angges;
        this.beschreibung = beschreibung;
        this.preis = preis;
        this.start = start;
        this.ziel = ziel;
        this.personen = personen;
        this.ladeflaeche = ladeflaeche;
        this.ladungsgewicht = ladungsgewicht;
        this.ladehoehe = ladehoehe;
        this.id = id;
        this.datum = datum;
        this.fahrzeug = fahrzeug;
        this.marke = marke;
    }
}
