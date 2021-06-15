export class Buchen{
   id:number;
   id_kauefer:number;
   id_anz:number;
   datum:string;
   constructor(id_kauefer:number,id_anz:number,datum:string, id?:number) {
       this.id=id;
       this.id_kauefer=id_kauefer;
       this.id_anz = id_anz;
       this.datum = datum;
   }
}