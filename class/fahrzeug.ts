export class Fahrzeug{
    user_id:number;
    name:string;
    jahr:number;
    volumen:number;
    gewicht:number;
    bild_id:number;
    constructor(userid:number, name:string, jahr:number, volumen:number, gewicht:number, bild_id:number) {
        this.user_id = userid;
        this.name = name;
        this.jahr = jahr;
        this.volumen = volumen;
        this.gewicht = gewicht;
        this.bild_id = bild_id;
    }

}