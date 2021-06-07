export class Kasse{
    id:number;
    user_id:number;
    anz_ID:number;
    constructor(user_id:number, anz_ID:number, id?:number) {
        this.id = id;
        this.user_id = user_id;
        this.anz_ID = anz_ID;
    }
}