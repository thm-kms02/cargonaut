export class User{
    email:string;
    name:string;
    handyNr:string;
    passwort:string;
    geburtsdatum: string

    constructor(email:string, name:string, handyNr:string, passwort:string, geburtsdatum: string) {
        this.email = email;
        this.name = name;
        this.handyNr = handyNr;
        this.passwort = passwort;
        this.geburtsdatum = geburtsdatum;
    }
}
