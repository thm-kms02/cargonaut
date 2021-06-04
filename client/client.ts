import {Anzeige} from "../class/anzeige";

let mainarea: JQuery;
let addOfferArea: JQuery;
let createOfferBTN: JQuery;
let submitOfferBtn: JQuery;
let saveBTN:JQuery;

    let offerslist: Anzeige[];
    let person:number;
    let von: string;
    let nach:string;
    let setDate:string;
    let fahrzeugIN:string;
    let markeIN:string;




$(() => {
    mainarea = $("#mainArea");
    addOfferArea = $("#addOfferArea");
    createOfferBTN = $("#createOfferBTN");
    submitOfferBtn = $("#submitOfferBtn");
    saveBTN = $("#saveBTN")

    getAll();

    addOfferArea.hide();

    createOfferBTN.on('click', () => {
       mainarea.hide();
        addOfferArea.show();

    });

    submitOfferBtn.on('click', () => {
        addAnzeige();
    })
    saveBTN.on('click', () => {
        saveValues();
    })
})
function getAll() {
    $.ajax({
        url: '/anzeige/',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            offerslist = response.result;
            renderOffersList(offerslist);
        },
        error: (response) => {

        },
    });
}

function saveValues(){
    person = Number($('#inputPersonenzahl').val());
    von = String($('#inputVon').val()).trim();
    nach = String($('#inputNach').val()).trim();
    fahrzeugIN= String($('#inputAuto').val()).trim();
    markeIN = String($('#inputMarke').val()).trim();
   setDate=String($('#inputDate').val()).trim();

}

function filtern() {
    let filteredOffers: Anzeige[] = []
    let ang: boolean;
    let kategorie: number; //1 = ladungsbeförderung, 2 = personenbeförderung
    let minPreis: number;
    let maxPreis: number;
    let von: string;
    let nach: string;
    let datum: string;

   offerslist.forEach((offer) =>{
       if(ang==undefined|| ang == offer.angges) {
           if(minPreis==undefined|| minPreis<offer.preis) {
               if(maxPreis== undefined|| maxPreis>offer.preis) {
                   if(von==undefined|| von == offer.start) {
                       if(nach == undefined|| nach == offer.ziel) {
                           if(datum==undefined|| datum == offer.datum){
                               if(kategorie==undefined) {
                                   filteredOffers.push(offer);
                               }
                               else if(kategorie==1&&offer.personen<1) {
                                   filteredOffers.push(offer);
                               } else if(kategorie==2&&offer.personen>0) {
                                   filteredOffers.push(offer);
                               }
                           }
                       }
                   }
               }
           }
       }
   })
    offerslist = filteredOffers;
}

function addAnzeige() {
    let rad1: JQuery = $('#inlineRadio1:checked');
    let rad2: JQuery = $('#inlineRadio2:checked');
    let beschIn: JQuery = $('#inputBeschreibung');
    let priceIn: JQuery = $('#inputPrice');
    let userId: number = 1;
    let angebot: boolean= true;
    let beschreibung: string = String(beschIn.val()).trim();
    let price: number = Number(priceIn.val());
    let start: string= von;
    let ziel: string=nach;
    let datum: string = setDate;
    let personen:number= person;
    let fahrzeugart:string = fahrzeugIN;
    alert("hier"+ beschreibung + "preis"+price);
    let fahrzeugmarke: string = markeIN;
    let ladeflaeche: number=0;
    let ladegewicht: number=0;
    let ladehoehe: number=0;
    if (rad1.val()=="option1") {
        angebot = true;
    } else if (rad2.val()=="option2") {
        angebot = false;
    }

    $.ajax({
        url: '/create/anzeige',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "userId": userId,
            "angges": angebot,
            "datum":datum,
            "beschreibung": beschreibung,
            "preis": price,
            "start": start,
            "ziel": ziel,
            "personen": personen,
            "fahrzeugart":fahrzeugart,
            "marke":fahrzeugmarke,
            "ladeflaeche": ladeflaeche,
            "ladungsgewicht": ladegewicht,
            "ladehoehe": ladehoehe

        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
          console.log("error");
        },
    });
}
function updateAnzg() {
    let rad1: JQuery = $('#inlineRadio1:checked');
    let rad2: JQuery = $('#inlineRadio2:checked');
    let beschIn: JQuery = $('#inputBeschreibung');
    let priceIn: JQuery = $('#inputPrice');
    let userId: number = 1;
    let angebot: boolean= true;
    let beschreibung: string = String(beschIn.val()).trim();
    let price: number = Number(priceIn.val());
    let start: string= von;
    let ziel: string=nach;
    let datum: string = setDate;
    let personen:number= person;
    let fahrzeugart:string = fahrzeugIN;
    alert("hier"+ beschreibung + "preis"+price);
    let fahrzeugmarke: string = markeIN;
    let ladeflaeche: number=0;
    let ladegewicht: number=0;
    let ladehoehe: number=0;
    if (rad1.val()=="option1") {
        angebot = true;
    } else if (rad2.val()=="option2") {
        angebot = false;
    }

    $.ajax({
        url: '/update/anzeige',
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "userId": userId,
            "angges": angebot,
            "datum":datum,
            "beschreibung": beschreibung,
            "preis": price,
            "start": start,
            "ziel": ziel,
            "personen": personen,
            "fahrzeugart":fahrzeugart,
            "marke":fahrzeugmarke,
            "ladeflaeche": ladeflaeche,
            "ladungsgewicht": ladegewicht,
            "ladehoehe": ladehoehe

        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function addFzg() {


    let marke: string = "";
    let modell: string = "";
    let baujahr: number = 0;
    let ladevolumen: number = 0;
    let zuladung: number = 0;

    $.ajax({
        url: '/create/fzg',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
           "marke": marke,
            "modell": modell,
            "baujahr": baujahr,
            "ladevolumen": ladevolumen,
           "zuladung": zuladung
        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function deleteAnzeige() {
    let id: number = 0;
    $.ajax({
        url: '/delete/anzeige',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          "id": id
        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function deleteBild() {
    let id: number = 0;
    $.ajax({
        url: '/delete/bild',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "id": id
        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function deleteFzg() {
    let id: number = 0;
    $.ajax({
        url: '/delete/fzg',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "id": id
        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function dateConvert(datum:string):string { // yyyy-mm-dd to dd.mm.yyyy
    let yearTemp:Array<string>=[];
    let monthTemp:Array<string>=[];
    let dayTemp: Array<string>=[];
    for (let i=0;i<datum.length;i++){
        if (i<4){
            yearTemp[i]=datum.charAt(i);
        }
        if (i>4 && i<7){
           monthTemp[i-4] = datum.charAt(i);
        }
        if (i>7){
            dayTemp[i-7]=datum.charAt(i);
        }
    }
    let dateNew = dayTemp.toString()+"."+monthTemp.toString()+"."+yearTemp;
    return dateNew.replace(/,/g,"");
}
function renderAnzeige(anz: Anzeige) {
    const offersListBody: JQuery = $("#offersTableBody");
    let ueberschrift: string;
    let menge: string;
    let datumSqlFormat:string= String((anz.datum).split("",10)).replace(/,/g, "");
    let datumEuropaFormat:string=dateConvert(datumSqlFormat);
    if(anz.personen==0){
        ueberschrift = "Ladungsbeförderung"
        menge = anz.ladungsgewicht.toString();
    } else{
        ueberschrift = "Personenbeförderung"
        menge = anz.personen.toString();
    }
    alert(anz.fahrzeugart)
    let card: JQuery = $(`
        <tr>
            <td>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${ueberschrift}</h5>
                        <div class="row">
                            <div class="col-5">
                                <img src="/./assets/Examplepictures/Pic-1.png" alt="Examplepicture">
                            </div>
                            <div class="col-5">
                                <p class="textListComponent"><span>Von: ${anz.start}</span></p>
                                <p class="textListComponent"><span>Nach: ${anz.ziel}</span></p>
                                <p class="textListComponent"><span>Wann: ${datumEuropaFormat}</span></p>
                                <p class="textListComponent"><span>Personenanzahl: ${menge}</span></p>
                                <p class="textListComponent"><span>Fahrzeug: ${anz.fahrzeugart}</span></p>
                            </div>
                            <div class="col-2">
                                <p class="card-text pricing" style="margin-top: 90px">${anz.preis}<span>€</span></p>
                            </div>
                        </div>
                        <div class="alignRight">
                            <button class="btn btn-dark btn-sm">Zum Angebot</button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `);
offersListBody.append(card);
}

function renderOffersList(offerList: Anzeige[]) {
    const offersListBody: JQuery = $("#offersTableBody");
    offersListBody.empty();
    offerList.forEach((anz) => {
        renderAnzeige(anz);
    })
}
