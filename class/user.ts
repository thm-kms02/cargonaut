export class User{
    id:number;
    email:string;
    name:string;
    passwort:string;
    geburtsdatum:string;
    profil_bild:string;

    constructor(email:string,name:string,passwort:string, geburtsdatum:string,profil_bild?:string,id?:number) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.passwort = passwort;
        this.geburtsdatum = geburtsdatum;
        this.profil_bild = profil_bild;
    }
}
