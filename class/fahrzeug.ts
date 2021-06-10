export class Fahrzeug{
    id:number;
    user_id:number;
    name:string;
    jahr:number;
    volumen:number;
    gewicht:number;
    bild_pfad:number;
    constructor(name:string, jahr:number, volumen:number, gewicht:number, bild_pfad?:number, id?:number, userid?:number) {
        this.name = name;
        this.jahr = jahr;
        this.volumen = volumen;
        this.gewicht = gewicht;
        this.bild_pfad = bild_pfad;
        this.id = id;
        this.user_id = userid;
    }

}
