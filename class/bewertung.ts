export class Bewertung {
    id: number;
    id_verfasser: number;
    id_empfaenger: number;
    bewertung: number;
    kommentar: string;
    name_verfasser:string;
    constructor(id_verfasser: number, id_empfaenger: number, bewertung: number, kommentar: string, name_verfasser?:string,id?: number) {
        this.id = id;
        this.id_verfasser = id_verfasser;
        this.id_empfaenger = id_empfaenger;
        this.bewertung = bewertung;
        this.kommentar = kommentar;
        this.name_verfasser = name_verfasser;
    }
}