export class AnzeigeRender{
    id: number;
    user_id: number;
    ang_ges: boolean;
    datum: string;
    preis: number;
    start: string;
    ziel: string;
    beschreibung: string;
    id_fahrzeug: number;
    personen: number;
    ladeflaeche: number;
    ladungsgewicht: number;
    ladehoehe: number;
    name:string;
    bild_pfad:string;
    constructor( user_id: number, ang_ges: boolean, datum: string, preis: number, start: string, ziel: string,
                 beschreibung: string,  id_fahrzeug: number, personen: number, ladeflaeche: number,
                 ladungsgewicht: number, ladehoehe: number, name:string,bild_pfad:string, id?: number) {
        this.user_id = user_id;
        this.ang_ges = ang_ges;
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
        this.id_fahrzeug = id_fahrzeug;
        this.name = name;
        this.bild_pfad = bild_pfad;
    }
}