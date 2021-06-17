import {AnzeigeRender} from "../class/anzeigeRender";
import {Fahrzeug} from "../class/fahrzeug";
import {Anzeige} from "../class/anzeige";

///declare module 'google.maps'; in node_modules/@types/google.maps/index.d.ts ganz unten einfügen
// @ts-ignore
import {} from 'google.maps';
import {User} from "../class/user";

//Navbar html-Elements:
let homeButton: JQuery;
let trackbutton: JQuery;
let signupBtn:JQuery;
let logoutbtn:JQuery;
let profilbtn:JQuery;
let buchungbtn:JQuery;

//Login-Page html-Elements:
let loginArea: JQuery;
let loginBTN:JQuery;
let inputLoginEmail: JQuery;
let inputLoginPassword: JQuery;

//Register-Page html-Elements
let registryModal: JQuery;
let registryMail: JQuery;
let registryName: JQuery;
let registryPassword: JQuery;
let registryBirthday: JQuery;
let registryBTN:JQuery;

//Offers Page html-Elements:
let mainarea: JQuery;
let filterForOfferRadio: JQuery;
let filterForSearchRadio: JQuery;
let filterForCargoRadio: JQuery;
let filterForTransportRadio: JQuery;
let filterPrizeMin: JQuery;
let filterPrizeMax: JQuery;
let filternBTN:JQuery;
let createOfferBTN: JQuery;
let offerTableForm: JQuery;

//Payment-Page html-Elements:
let offerArea: JQuery;
let companyName: JQuery;
let rating: JQuery;
let countRating: JQuery;
let offerPicture: JQuery;
let contactBTN: JQuery
let markBTN: JQuery;
let toProfileBTN: JQuery;
let sendOfferBTN: JQuery;
let bookBTN: JQuery;
let offerDescription: JQuery;

//Person-Transport-Modal-Page html-Elements:
let fahrzeugDropTaxi: JQuery;
let inputPersonenzahl: JQuery;
let inputVon: JQuery;
let inputDate: JQuery;
let inputNach: JQuery;
let saveBTN: JQuery;

//Cargo-Modal-Page html-Elements:
let fahrzeugDropLieferung: JQuery;
let inputGesamtgewicht: JQuery;
let inputVon2: JQuery;
let inputLadeflaeche: JQuery;
let inputDate2: JQuery;
let inputNach2: JQuery;
let inputLadehoehe: JQuery;
let saveBTN2: JQuery;

//Person-Transport-FILTER-Modal-Page html-Elements:

let inputPersonenzahlF: JQuery;
let inputVonF: JQuery;
let inputDateF: JQuery;
let inputNachF: JQuery;
let saveBTNF: JQuery;

// Filter-Standard:
let inputMinPrice: JQuery;
let inputMaxPrice: JQuery;

//Cargo-FILTER-Modal-Page html-Elements:
let inputGesamtgewichtF: JQuery;
let inputVon2F: JQuery;
let inputLadeflaecheF: JQuery;
let inputDate2F: JQuery;
let inputNach2F: JQuery;
let inputLadehoeheF: JQuery;
let saveBTN2F: JQuery;

//Create-Offer-Page html-Elements:
let addOfferArea: JQuery;
let createOfferRadio: JQuery;
let createSearchRadio: JQuery;
let createCargoRadio: JQuery;
let createTransportRadio: JQuery;
let inputDescription: JQuery;
let inputPrize: JQuery;
let inputPictures: JQuery;
let submitOfferBtn: JQuery;

//Tracking-Page html-Elements:
let trackNumButton: JQuery;
let mapArea: JQuery;

//Profile-Page html-Elements:
let profileArea: JQuery;
let profilePicture: JQuery;
let uploadProfilePicture: JQuery;
let profileName: JQuery;
let profileRating: JQuery;
let addCarBTN: JQuery;
let addCarAttributeModel: JQuery;
let addCarAttributeYear: JQuery;
let addCarAttributeCargoArea: JQuery;
let addCarAttributeWeight: JQuery;
let addCarForm: JQuery;
let ownBookingsBTN: JQuery;
let buttonFeedback: JQuery;
let renderComments: JQuery;

///OfferDetailPage
let offerPageButtons: JQuery;
let offerControlForm: JQuery;

//Modals
let modalPersonenbefoerderung: JQuery


//Global Variables:
let person: number;
let personF:number;
let von: string;
let vonF: string;
let nach: string;
let nachF: string;
let setDate: string;
let setDateF: string;
let von2: string;
let von2F: string;
let nach2: string;
let nach2F: string;
let setDate2: string;
let setDate2F: string;
let fahrzeugID: number;
let fahrzeugID2: number;
let gesamtgewichtIN: number;
let gesamtgewichtF: number;
let ladeflaecheIN: number;
let ladeflaecheF: number;
let ladehoeheIN: number;
let ladehoeheF: number;
let offerslist: Anzeige[];
let id_empfaenger: number;
let idBooking: number;
let isLoggedIn2: boolean = false;




$(() => {
    mainarea = $("#mainArea");
    addOfferArea = $("#addOfferArea");
    createOfferBTN = $("#createOfferBTN");
    submitOfferBtn = $("#submitOfferBtn");
    saveBTN = $("#saveBTN");
    fahrzeugDropTaxi = $(".custom-select");
    fahrzeugDropLieferung = $(".custom-select2");
    saveBTN2 = $("#saveBTN2");
    trackbutton = $('#trackingButton');
    mapArea = $('#mapArea');
    trackNumButton = $('#tracking');
    loginBTN = $("#Buttonlogin");
    filternBTN = $("#filterBTN");
    loginArea = $("#containerLogin");
    profileArea = $("#profileArea");
    offerArea = $("#offerArea");
    homeButton = $(".homeButton");
    registryBTN = $("#registryBTN");
    registryModal = $('#exampleModal');
    addCarBTN = $("#addCarBTN");
    offerTableForm = $("#offerTableForm");
    inputPersonenzahlF = $("#inputPersonenzahlF");
    inputVonF  = $("#inputVonF");
    inputNachF = $("#inputNachF");
    inputDateF = $("#inputDateF");
    inputGesamtgewichtF = $("#inputGesamtgewichtF");
    inputVon2F = $("#inputVon2F");
    inputLadeflaecheF = $("#inputLadeflaecheF");
    inputDate2F = $("#inputDate2F");
    inputNach2F = $("#inputNach2F");
    inputLadehoeheF = $("#inputLadehoeheF");
    inputPersonenzahl = $("#inputPersonenzahl");
    inputVon  = $("#inputVon");
    inputNach = $("#inputNach");
    inputDate = $("#inputDate");
    inputGesamtgewicht = $("#inputGesamtgewicht");
    inputLadeflaeche  = $("#inputLadeflaeche");
    inputLadehoehe = $("#inputLadehoehe");
    inputVon2 = $("#inputVon2");
    inputNach2 =  $("#inputNach2");
    inputDate2 = $("#inputDate2");
    inputMinPrice =$("#flilterPrizeMin");
    inputMaxPrice = $("#filterPrizeMax");
    saveBTNF = $("#saveBTNF");
    saveBTN2F = $("#saveBTN2F");
    offerPageButtons = $('#offerPageButton');
    offerControlForm = $('#offerControlForm');
    inputDescription = $("#inputDescription");
    inputPrize = $("#inputPrice");
    signupBtn=$("#SignupBtn");
    logoutbtn=$("#LogoutBtn");
    buchungbtn=$("#buchung");
    profilbtn=$("#profil");
    addCarForm =$('#addCarForm');
    ownBookingsBTN = $("#ownBookingsBTN");
    buttonFeedback = $("#Buttonfeedback");
    let fremdnutzerBTN: JQuery = $(".fremdnutzerBTN");

    getAll();
    mainarea.hide();
    loginArea.show();
    addOfferArea.hide();
    profileArea.hide();
    offerArea.hide();
    logoutbtn.hide();
    registryBTN.show();
    trackbutton.hide();
    buchungbtn.hide();
    trackbutton.hide();
    profilbtn.hide();

    offerControlForm.on('click', '.userProfil', getDifUser);

    offerTableForm.on('click','.testBTN', renderOfferPage);

    addCarForm.on('click', '.addCar', createCar);

    homeButton.on('click', () => {
        logoutbtn.show();
        profilbtn.show();
        trackbutton.show();
        addOfferArea.hide();
        profileArea.hide();
        mainarea.show();
        offerArea.hide();
        loginArea.hide();
        registryBTN.hide();
    });

    trackNumButton.on('click', () => {
        getTrackingRole();
    });

    trackbutton.on('click', () => {
       showMap();
    });

    createOfferBTN.on('click', () => {
        event.preventDefault();
        mainarea.hide();
        addOfferArea.show();
    });

    submitOfferBtn.on('click', () => {
        let emptyText: string = "";
        addAnzeige();
        document.getElementById('inputDescription');
        inputDescription.text(emptyText);
        inputPrize.text(emptyText);
        addOfferArea.hide();
        mainarea.show();
        getAll();
    });
    saveBTN.on('click', () => {

        saveValuesTaxi();
    });
    saveBTN2.on('click', () => {
        saveValuesLieferung();
    });
    fahrzeugDropTaxi.on('click', () => {
        getFahrzeugDropTaxi();
    });
    fahrzeugDropLieferung.on('click', () => {
        getFahrzeugDropLieferung();
    });

    loginBTN.on('click', () =>{
        login();

    });
    logoutbtn.on('click',()=>{
        logout();
    });
    profilbtn.on('click',()=>{
        mainarea.hide();
        getProfil();
    });
    filternBTN.on('click', () =>{
        getFilter();
    })

    registryBTN.on('click', () =>{
        registryModal.modal('hide');
        registry();

    });
    saveBTNF.on('click',()=>{
        saveValuesTaxiFilter();
    });
    saveBTN2F.on('click', () => {
        saveValuesLieferungFilter();
    });
/*
    addCarBTN.on('click', () => {
        console.log("Add Car");
        createCar;
    });*/

    ownBookingsBTN.on('click', ()=> {
        renderOwnBookings();
    });

    buttonFeedback.on('click', ()=> {
        postBewertung();
    });
});

function renderAreas() {
    console.log("Nutzer angemeldet: " + isLoggedIn2);
    if(isLoggedIn2 == true) {
        logoutbtn.show();
        profilbtn.show();
        trackbutton.show();
        addOfferArea.hide();
        profileArea.hide();
        mainarea.show();
        offerArea.hide();
        loginArea.hide();
        registryBTN.hide();
    } else{
        mainarea.hide();
        loginArea.show();
        addOfferArea.hide();
        profileArea.hide();
        offerArea.hide();
        logoutbtn.hide();
        registryBTN.show();
    }
}

async function isLoggedIn() {
    $.ajax({
        url: '/isLoggedIn',
        type: 'GET',
        success: (response) => {
            isLoggedIn2 = true;
        },
        error: jqXHR => {
            isLoggedIn2 =  false;
        }
    });
}

function testFunction() {
    id_empfaenger = $(event.currentTarget).data("user-id");
    let modal = $("#ownBookings");
    let modalBackdrop: JQuery = $(".modal-backdrop");
    modalBackdrop.hide();
    modal.hide();
}

function getDifUser(event){
    event.preventDefault();
    const id: any = $(event.currentTarget).data("user-id");
    $.ajax({
        url: '/difUser/'+id,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',

        success: (response) => {
        renderProfil(response.user, response.cars, response.bewertung);
        getBewertung(id);
        },
        error: (err) => {
           alert("err");
        },
    });
}

function testFunction2(id: string) {
    event.preventDefault();
    let idBooking: number= Number(id);
    $.ajax({
        url: '/buchen',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            idBooking
        }),
        success: () => {
            console.log("Error");

        },
        error: (response) => {
            console.log('Gebucht');
            alert("Anzeige wurde gebucht");
            mainarea.show()
            offerArea.hide();
            getAll();
        },
    })
}


function renderProfil(user: User, cars: Fahrzeug[], bewertung: number) {
    let durchschnitt: string = String(bewertung);
    profileArea.empty()
    let newProfil: JQuery = $(`   
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8" style="background-color: #f6f5f5; border-radius: 10px; padding-top: 2%; padding-bottom: 2%">
                <div class="row">
                    <div class="col-3">
                        <!--Profilbildbereich-->
                        <div>
                            <img id="profilePicture" src=${user.profil_bild} alt="ProfilePicture">
                        </div>
                        <input class="form-control" type="file" aria-label="" id="uploadProfilePicture">
                        <table class="table table-borderless" id="kommentare">
                            <tbody id="renderComments">
                                <!--Hier werden die kommentare des eigenen Profils angezeigt-->
                            </tbody>
                        </table>
                    </div>
                    <div class="col-9">
                        <h1 id="profileName">${user.name}</h1>
                        <span id="profileRating">${durchschnitt}</span><span>/5 Sterne</span>
                        <div style="margin-top: 10%; margin-left: 30%">
                            <h3>Fahrzeuge</h3>
                            <table class="table table-borderless">
                                <thead>
                                
                                </thead>
                                <tbody id="carsTableBody">
                                <!--Hier wird die Liste reingerendert-->
                                
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
   `);
    profileArea.append(newProfil);
    let carsTableBody: JQuery = $('#carsTableBody');
    for(let car of cars) {
        let elem: JQuery =$(` <tr>
                                    <td>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                         
                                                    <div class="col-6" style="text-align: center">
                                                        <div class="carAttribute">
                                                            <span class="carAttributeModel"><span>Modell: </span>${car.name}</span>
                                                        </div>
                                                        <div class="carAttribute">
                                                            <span class="carAttributeYear"><span>Baujahr: </span>${car.jahr}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-6" style="text-align: center">
                                                        <div class="carAttribute">
                                                            <span class="carAttributeCargoArea"><span>Ladefläche/ Sitzplätze: </span>${car.volumen}</span>
                                                        </div>
                                                        <div class="carAttribute">
                                                            <span class="carAttributeWeight"><span>Gewicht: </span>${car.gewicht}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`);
        carsTableBody.append(elem);
    }
    addOfferArea.hide();
    mainarea.hide();
    offerArea.hide();
    profileArea.show();
}

function getTrackingRole() {
    event.preventDefault();
    let trackNumIn: JQuery = $('#feld');
    let trackNum: number = Number(trackNumIn.val());
    $.ajax({
        url: '/trackingRole/'+trackNum,
        type: 'GET',
        dataType: 'json',
        success: (response) => {

            goTrack(response.trackRole, trackNum);
        },
        error: (response) => {

        },
    });
}


function goTrack(role: number, tracknum: number) {
    /// 0 = not authorized, 1= viewer, 2= locationprovider
    if(role==1) {
      getGPS(tracknum);
    } else if(role==2) {
        sendLocation(tracknum);
    }
}

function sendLocation(tracknum: number) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
               let lat: number =  position.coords.latitude;
                let lng : number = position.coords.longitude;
                $.ajax({
                    url: '/create/location',
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({
                        tracknum,
                       lat,
                        lng

                    }),
                    success: () => {
                        console.log("Hallo!");
                        showLocation(position.coords.latitude, position.coords.longitude, "");
                    },
                    error: (response) => {
                        showLocation(lat, lng, "");
                        alert("error");
                    },
                });
            }
        )
    } else {
        alert("Standort konnte nicht ermittelt werden");
    }
}

function getGPS(tracknum: number) {
    $.ajax({
        url: '/getGPS/'+tracknum,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if(response.lat=== null || response.lng==null) {
                alert("Noch keine GPS-Daten vorhanden!");
            } else {
                showLocation(response.lat, response.lng, response.date);
            }
        },
        error: (response) => {

        },
    });
}

function getBewertung(id: number) {
    $.ajax({
        url: '/bewertung/get/'+id,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            console.log(response)
            renderBewertungen(response);
        },
        error: (response) => {
        },
    });
}

function renderBewertungen(bewertungen) {
    renderComments = $("#renderComments");
    console.log(bewertungen);
    bewertungen.forEach((comment) => {
        let comments: JQuery = $(`<tr>    
                                            <td>
                                                <div style="border-style: solid; border-radius: 3px; border-width: 1px; background-color: white; border-color: lightgrey">
                                                    <div style="margin-left: 7%">
                                                        <span>${comment.bewertung}<span>/5</span></span><br>
                                                        <span>${comment.kommentar}</span>
                                                    </div>
                                                   
                                                </div>  
                                            </td>
                                        </tr>`);
        renderComments.append(comments);
        profileArea.show();
    });
}

function showLocation(lat: number, lng: number, date: string) {
    let mapArea: JQuery = $('#mapArea');
    mapArea.empty();
    let trackmodal: JQuery = $('#trackModal');
    trackmodal.show();
    let map: google.maps.Map;
    const center: google.maps.LatLngLiteral = {lat: lat, lng: lng};
    map = new google.maps.Map(document.getElementById("mapArea") as HTMLElement, {
        center,
        zoom: 11
    });
    new google.maps.Marker({
        position: center,
        map,
        title: date,
    });

}

function getAll() {

    $.ajax({
        url: '/anzeige',
        type: 'GET',
        dataType: 'json',
        success: (response) => {

            renderOffersList(response.result);
            offerslist = response.result;

        },
        error: (response) => {

        },
    });
}

function createCar() {

    let namein: JQuery = $('#addCarAttributeModel');
    let yearin: JQuery = $('#addCarAttributeYear');
    let volin: JQuery = $('#addCarAttributeCargoArea');
    let weightin: JQuery = $('#addCarAttributeWeight');

    let name: string = namein.val().toString().trim();
    let year: number = Number(yearin.val());
    let vol: number = Number(volin.val());
    let weight: number = Number(weightin.val());

    console.log("Name: " + name, "Jahr: " + year, "Ladung: " + vol, "Gewicht: " + weight);


    $.ajax({
        url: '/create/fahrzeug',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            name,
            year,
            vol,
            weight
        }),
        success: (response) => {
            console.log("sucess");
            getProfil();
            alert("Fahrzeug wurde hinzugefügt")
        },
        error: (response) => {
            console.log("error");
            getProfil();
        },
    });
}

function showMap() {
    let map: google.maps.Map;
    const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};
        map = new google.maps.Map(document.getElementById("mapArea") as HTMLElement, {
            center,
            zoom: 8
        });

}

function deleteCar(id: number) {
    $.ajax({
        url: '/car/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: (response) => {
            console.log("sucess");
            getProfil();
            alert(" Fahrzeug wurde entfernt")
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function saveValuesTaxi() {
    person = Number(inputPersonenzahl.val());
    von = String(inputVon.val()).trim();
    nach = String(inputNach.val()).trim();
    fahrzeugID = Number($('.custom-select').val());
    setDate = String(inputDate.val()).trim();
    modalPersonenbefoerderung = $("#personenbefoerderungModal");
    let modalBackdrop: JQuery = $(".modal-backdrop");
    modalBackdrop.hide();
    modalPersonenbefoerderung.modal("hide");
}
function saveValuesTaxiFilter() {
    personF = Number(inputPersonenzahlF.val());
    vonF = String(inputVonF.val()).trim();
    nachF = String(inputNachF.val()).trim();
    setDateF = String(inputDateF.val()).trim();
    let modal = $("#personenbefoerderungModalF");
    let modalBackdrop: JQuery = $(".modal-backdrop");
    modalBackdrop.hide();
    modal.modal("hide");
}
function saveValuesLieferung() {
    gesamtgewichtIN = Number(inputGesamtgewicht.val());
    setDate2 = String(inputDate2.val()).trim();
    von2 = String(inputVon2.val()).trim();
    nach2 = String(inputNach2.val()).trim();
    ladeflaecheIN = Number(inputLadeflaeche.val());
    ladehoeheIN = Number(inputLadehoehe.val());
    fahrzeugID2 = Number($('.custom-select2').val());
    let modal = $("#transportModal");
    let modalBackdrop: JQuery = $(".modal-backdrop");
    modalBackdrop.hide();
    modal.modal("hide");
}
function saveValuesLieferungFilter() {
    gesamtgewichtF = Number(inputGesamtgewichtF.val())
    setDate2F =String(inputDate2F.val())
    von2F = String(inputVon2F.val()).trim();
    nach2F = String(inputNach2F.val()).trim();
    ladeflaecheF = Number(inputLadeflaecheF.val());
    ladehoeheF = Number(inputLadehoeheF.val());
    let modal = $("#transportModalF");
    let modalBackdrop: JQuery = $(".modal-backdrop");
    modalBackdrop.hide();
    modal.modal("hide");
}

function getFilter() {
    let radOffer : JQuery = $('#filterForOfferRadio:checked');
    let radSearch: JQuery = $('#filterForSerachRadio:checked');
    let radTaxi: JQuery = $('#filterForTransportRadio:checked');
    let radCargo: JQuery = $('#filterForCargoRadio:checked');
    let ang_ges: number;
    let kategorie: number; //1 = ladungsbeförderung, 2 = personenbeförderung
    let von: string;
    let nach: string;
    let datum: string;
    let anzeigenRender:AnzeigeRender[]=[];
    let personen:number = personF;
    let ladeflaeche:number = ladeflaecheF;
    let ladehoehe:number = ladehoeheF;
    let ladungsgewicht:number = gesamtgewichtF;
    if (radOffer.val()=="option1"&& radSearch.val() == "option2"){
        ang_ges = undefined;
    }
    else if (radOffer.val() == "option1" && radSearch.val() != "option2"){
        ang_ges = 0;
    }else if (radSearch.val() == "option2" && radOffer.val() != "option1"){
        ang_ges = 1;
    }
    if(radCargo.val() == "option1" && radTaxi.val() == "option2"){
        kategorie = 0
        console.log("kategorie 0")
    }
   else if(radCargo.val() == "option1" && radTaxi.val() != "option2"){
        kategorie = 1;
        console.log("kategorie 1")
    }else if (radTaxi.val() == "option2" && radCargo.val() != "option1"){
        kategorie = 2;
    }


    if (kategorie == 1){
        von = von2F;
        nach = nach2F;
        datum = setDate2F;
    }
    if (kategorie == 2){
        von = vonF;
        nach = nachF;
        datum = setDateF;
    }
    let minPreis: number = Number(inputMinPrice.val());
    let maxPreis: number = Number(inputMaxPrice.val());
    $.ajax({
        url: '/anzeige/filter',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "ang_ges": ang_ges,
            "kategorie":kategorie
        }),
        success: (response) => {
            let serverAnzeigen:AnzeigeRender[];
            serverAnzeigen =response;
            anzeigenRender=filternStandard(serverAnzeigen, minPreis, maxPreis, von, nach, datum);
            if(kategorie == 0){
                renderOffersList(anzeigenRender);
            }if (kategorie ==1){
                anzeigenRender = filternCargo(anzeigenRender,ladeflaeche,ladehoehe,ladungsgewicht);
                renderOffersList(anzeigenRender);
            }if (kategorie ==2) {
                anzeigenRender=filternTaxi(anzeigenRender,personen);
                renderOffersList(anzeigenRender);
            }
        },
        error: (response) => {

        },
    });
}

function filternStandard(anzeigen:AnzeigeRender[],minPreis:number,maxPreis:number,von:string,nach:string, datum:string):AnzeigeRender[]{
    let filteredAnzeigen:AnzeigeRender[]=[];
    let j: number = 0;
    for (let i=0;i<anzeigen.length;i++){
                if (anzeigen[i].preis >= minPreis || minPreis === 0 ) {
                    if (anzeigen[i].preis <= maxPreis || maxPreis === 0 ) {
                        if (anzeigen[i].datum == datum || datum === "" || datum === undefined) {
                            if (anzeigen[i].start == von || von === "" || von === undefined) {
                                if (anzeigen[i].ziel == nach || nach === "" || nach === undefined) {
                                    filteredAnzeigen[j] = anzeigen[i];
                                    j++;
                                }
                            }
                        }
                    }
                }
    }
return filteredAnzeigen;
}

function filternTaxi(anzeigen:AnzeigeRender[],personen):AnzeigeRender[]{
    let filteredTaxi:AnzeigeRender[]=[];
    let j:number = 0;
    for (let i=0; i<anzeigen.length;i++){
            if (anzeigen[i].personen == personen || personen == 0 || personen === undefined) {
                filteredTaxi[j] = anzeigen[i];
                j++;
            }

    }
return filteredTaxi;
}

function filternCargo(anzeigen:AnzeigeRender[],ladeflaeche,ladehoehe,ladungsgewicht):AnzeigeRender[]{
    let filteredCargo:AnzeigeRender[]=[];
    let j:number =0 ;
    for (let i=0;i< anzeigen.length;i++){

            if (anzeigen[i].ladeflaeche == ladeflaeche || ladeflaeche==0 ||ladeflaeche === undefined) {
                if (anzeigen[i].ladehoehe == ladehoehe || ladehoehe==0 || ladehoehe === undefined) {
                    if (anzeigen[i].ladungsgewicht == ladungsgewicht || ladungsgewicht==0 || ladungsgewicht === undefined) {
                        filteredCargo[j] = anzeigen[i];
                        j++;
                    }
                }
            }
    }
return filteredCargo;
}

function addAnzeige() {
    let rad1: JQuery = $('#createOfferRadio:checked');
    let rad2: JQuery = $('#createSearchRadio:checked');
    let beschIn: JQuery = $('#inputDescription');
    let priceIn: JQuery = $('#inputPrice');
    let ang_ges: boolean = true;
    let beschreibung: string = String(beschIn.val()).trim();
    let preis: number = Number(priceIn.val());
    let start: string;
    let ziel: string;
    let datum: string;
    let personen: number;
    let id_fahrzeug: number;
    let ladeflaeche: number;
    let ladungsgewicht: number;
    let ladehoehe: number;
    if (person > 0 ) {
        start = von;
        ziel = nach;
        datum = setDate;
        personen = person;
        id_fahrzeug = fahrzeugID;
        ladeflaeche = 0;
        ladungsgewicht = 0;
        ladehoehe = 0;
    } else {
        start = von2;
        ziel = nach2;
        datum = setDate2;
        personen = 0;
        id_fahrzeug = fahrzeugID2;
        ladeflaeche = ladeflaecheIN;
        ladungsgewicht = gesamtgewichtIN;
        ladehoehe = ladehoeheIN;
    }
    if (rad1.val() == "option1") {
        ang_ges = false;
    } else if (rad2.val() == "option2") {
        ang_ges = true;
    }
    $.ajax({
        url: '/create/anzeige',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "ang_ges": ang_ges,
            "datum": datum,
            "preis": preis,
            "start": start,
            "ziel": ziel,
            "beschreibung": beschreibung,
            "id_fahrzeug": id_fahrzeug,
            "personen": personen,
            "ladeflaeche": ladeflaeche,
            "ladungsgewicht": ladungsgewicht,
            "ladehoehe": ladehoehe

        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (err) => {
            console.log(err);
        },
    });
}

function sendMessage() {
    let message: string;
    let absender: number;
    let empfaenger: number;
    $.ajax({
        url: '/create/message',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "absender": absender,
            "empfaenger": empfaenger,
            "inhalt": message,
        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function getmyMessages() {
    let id: number;
    $.ajax({
        url: '/messages',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',

        success: (response) => {
            console.log(response);
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function updateUser() {
    let bildIN: JQuery = $('#uploadProfilePicture');
    let bild: string=bildIN.val().toString();
  let bild2 = bild.replace("C:\\fakepath\\", "bilder\\");
    console.log(bild2);
    $.ajax({
        url: '/update/user',
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            bild2
        }),
        success: (response) => {
            console.log("sucess");
            getProfil();
            getAll();
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function dateConvert(datum: string): string { // yyyy-mm-dd to dd.mm.yyyy
    let yearTemp: Array<string> = [];
    let monthTemp: Array<string> = [];
    let dayTemp: Array<string> = [];
    for (let i = 0; i < 10; i++) {
        if (i < 4) {
            yearTemp[i] = datum.charAt(i);
        }
        if (i > 4 && i < 7) {
            monthTemp[i - 4] = datum.charAt(i);
        }
        if (i > 7) {
            dayTemp[i - 7] = datum.charAt(i);
        }
    }
    let dateNew = dayTemp.toString() + "." + monthTemp.toString() + "." + yearTemp;
    return dateNew.replace(/,/g, "");
}

function renderAnzeige(anz: AnzeigeRender) {

    const offersListBody: JQuery = $("#offersTableBody");
    let ueberschrift: string;
    let menge: string;
    let datumSqlFormat: string = String((anz.datum).split("", 10)).replace(/,/g, "");
    let datumEuropaFormat: string = dateConvert(datumSqlFormat);
    let fahrzeugName:string;
    let img:string;
    if (anz.personen === null || anz.personen === undefined) {
        ueberschrift = "Ladungsbeförderung"
        menge = String(anz.ladungsgewicht);
    } else {
        ueberschrift = "Personenbeförderung"
        menge = String(anz.personen);
    }
    if (anz.name === null){
         fahrzeugName = "Beliebig"
    }else {
        fahrzeugName = anz.name;
    }
    if (anz.bild === null||anz.bild===undefined){
        img = "assets/Examplepictures/Pic-1.png";
    }else {
        img = anz.bild;
    }

    offersListBody.append( card(ueberschrift,anz,datumEuropaFormat,menge,fahrzeugName,img));

}

function renderOffersList(offerList: AnzeigeRender[]) {
    const offersListBody: JQuery = $("#offersTableBody");
    if (offerList.length ==0 || offerList === undefined ){
        alert("Die Suche liefert keine Ergebnisse");
    }
    offersListBody.empty();
    for (let i = 0; i < offerList.length; i++) {
        renderAnzeige(offerList[i]);

    }
}

function card(ueberschrift:string,anz,datumEuropaFormat,menge,fahrzeugName,img) :JQuery{
    let card: JQuery;
    let str: string="";
    if(anz.ang_ges==false) {
        str= "Biete: ";
    } else if(anz.ang_ges==true) {
        str= "Suche: ";
    }

    if (ueberschrift === "Personenbeförderung") {
         card = $(`
        <tr>
            <td>
                <div class="card" style="background-color: #f5f6f6">
                    <div class="card-body">
                        <h5 class="card-title">${str+ueberschrift}</h5>
                        <div class="row">
                            <div class="col-5">
                                <img src=${img} style="width: 200px; height: auto" alt="Examplepicture">
                            </div>
                            <div class="col-5">
                                <p class="textListComponent"><span>Von: ${anz.start}</span></p>
                                <p class="textListComponent"><span>Nach: ${anz.ziel}</span></p>
                                <p class="textListComponent"><span>Wann: ${datumEuropaFormat}</span></p>
                                <p class="textListComponent"><span>Personenanzahl: ${menge}</span></p>
                                <p class="textListComponent"><span>Fahrzeug: ${fahrzeugName}</span></p>
                            </div>
                            <div class="col-2">
                                <p class="card-text pricing" style="margin-top: 90px">${anz.preis}<span>€</span></p>
                            </div>
                        </div>
                        <div class="alignRight">
                            <button class="btn niceButton testBTN" form="offerTableForm" data-offer-id="${anz.id}">Zum Angebot</button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `);
         return card;
    } else {
        card = $(`
        <tr>
            <td>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${str+ueberschrift}</h5>
                        <div class="row">
                            <div class="col-5">
                                <img src=${img} style="width: 200px; height: auto" alt="Examplepicture">
                            </div>
                            <div class="col-5">
                                <p class="textListComponent"><span>Von: ${anz.start}</span></p>
                                <p class="textListComponent"><span>Nach: ${anz.ziel}</span></p>
                                <p class="textListComponent"><span>Wann: ${datumEuropaFormat}</span></p>
                                <p class="textListComponent"><span>Ladefläche: ${anz.ladeflaeche} m²</span></p>
                                <p class="textListComponent"><span>Ladehöhe: ${anz.ladehoehe} cm</span></p>
                                 <p class="textListComponent"><span>Ladegewicht: ${anz.ladungsgewicht} Kg</span></p>
                                <p class="textListComponent"><span>Fahrzeug: ${fahrzeugName}</span></p>
                            </div>
                            <div class="col-2">
                                <p class="card-text pricing" style="margin-top: 90px">${anz.preis}<span>€</span></p>
                            </div>
                        </div>
                        <div class="alignRight">
                            <button class="btn niceButton testBTN" form="offerTableForm" data-offer-id="${anz.id}">Zum Angebot</button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `);
 return card;
    }

}

function openOwnProfile(user:User, cars: Fahrzeug[], bewertung: number) {
profileArea.empty();

let durchschnitt: string = String(bewertung);
let newProfil: JQuery = $(`  <div class="row">
            <div class="col-2"></div>
            <div class="col-8" style="background-color: #f6f5f5; border-radius: 10px; padding-top: 2%; padding-bottom: 2%">
                <div class="row">
                    <div class="col-3">
                        <!--Profilbildbereich-->
                        <div>
                            <img id="profilePicture" src=${user.profil_bild} alt="ProfilePicture">
                        </div>
                        <input class="form-control" type="file" aria-label="" id="uploadProfilePicture">
                        <button class="btn niceButton" onclick="updateUser()">Profilbild ändern</button>
                        <table class="table table-borderless" id="kommentare">
                            <tbody id="renderComments">
                                <!--Hier werden die kommentare des eigenen Profils angezeigt-->
                            </tbody>
                        
                        </table>
                    </div>
       
                    <div class="col-9">
                        <h1 id="profileName">${user.name}</h1>
                        <span id="profileRating">${durchschnitt}</span><span>/5 Sterne</span>
                       <!-------------------- <button  onclick="renderOwnBookings()" type="button" class="btn niceButton" data-toggle="modal" data-target="#ownBookings">
                            Meine Buchungen
                        </button>-------------->
                        <div style="margin-top: 2%; margin-left: 30%">
                            <h3>Fahrzeuge</h3>
                            <table class="table table-borderless">
                              
                                <thead>
                                <tr>
                                    <th>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <div class="btn" id="addCarBTN" >                                                  
                                                            <a class="btn btn-light action-button"  role="button" form="addCarForm" onclick="createCar()" style="margin-top:20% ;margin-left: 15% ; background-color: #276678; color: white">Anlegen</a>
                                                        </div>
                                                    </div>
                                                    <div class="col-4" style="text-align: center">
                                                        <label>
                                                            <input class="form-control" id="addCarAttributeModel"
                                                                   type="text" form="addCarForm" placeholder="Marke/Modell"/>
                                                        </label>
                                                        <label>
                                                            <input class="form-control" form="addCarForm" id="addCarAttributeYear" type="text"
                                                                   placeholder="Baujahr"/>
                                                        </label>
                                                    </div>
                                                    <div class="col-4" style="text-align: center">
                                                        <label>
                                                            <input class="form-control" form="addCarForm" id="addCarAttributeCargoArea"
                                                                   type="text" placeholder="Stauraum"/>
                                                        </label>
                                                        <label>
                                                            <input class="form-control" form="addCarForm" id="addCarAttributeWeight"
                                                                   type="text" placeholder="Gewicht"/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody id="carsTableBody">
                                <!--Hier wird die Liste reingerendert-->
                               
                                </tbody>
                              
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>`);

        profileArea.append(newProfil);
        let carsTableBody: JQuery = $('#carsTableBody');

        cars.forEach((car) => {
            let renderCar: JQuery = $(`<tr>
                                            <td>
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                          
                                                            <div class="col-5" style="text-align: center">
                                                                <div class="carAttribute">
                                                                    <span class="carAttributeModel"><span>Modell: </span>${car.name}</span>
                                                                </div>
                                                                <div class="carAttribute">
                                                                    <span class="carAttributeYear"><span>Baujahr: </span>${car.jahr}</span>
                                                                </div>
                                                            </div>
                                                            <div class="col-6" style="text-align: center">
                                                                <div class="carAttribute">
                                                                    <span class="carAttributeCargoArea"><span>Ladefläche/ Sitzplätze: </span>${car.volumen}</span>
                                                                </div>
                                                                <div class="carAttribute">
                                                                    <span class="carAttributeWeight"><span>Gewicht: </span>${car.gewicht}</span>
                                                                </div>
                                                            </div>
                                                            <div class="col-1">
                                                                <button class="btn btn-outline-dark btn-sm delete-user-button" data-car-id="${car.id}" onclick="deleteCar(${car.id})">
                                                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                                                 <!--  <div class="w1-padding w1-xlarge w3-text-red">           
                                                                         <i class="material-icons">delete</i>
                                                                     </div>
                                                                              -->    
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>`);
            carsTableBody.append(renderCar);
            profileArea.show();
        });
}

function getFahrzeugDropTaxi() {
    let inputFahrzeug: string = String($('.custom-select').val()).trim();
    if (inputFahrzeug == "Choose ...")
        $.ajax({
            url: '/fahrzeug',
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                inputFahrzeugDropTaxi(response.result)
            },
            error: (response) => {

            },

        });
}

function getFahrzeugDropLieferung() {
    let inputFahrzeug: string = String($('.custom-select2').val()).trim();
    if (inputFahrzeug == "Choose ...")
        $.ajax({
            url: '/fahrzeug',
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                inputFahrzeugDropLieferung(response.result)
            },
            error: (response) => {

            },

        });
}

function inputFahrzeugDropTaxi(fahrzeugListe: Fahrzeug[]) {
    let fahrzeug_name: string;
    let fahrzeug_id: number;
    let drop: JQuery = $('.custom-select')
    let dropBody: JQuery;
    drop.empty();
    drop.append('<option selected > Choose ... </option>');
    for (let i = 0; i < fahrzeugListe.length; i++) {
        fahrzeug_name = fahrzeugListe[i].name;
        fahrzeug_id = fahrzeugListe[i].id;
        dropBody = $(`<option  value=${fahrzeug_id} > ${fahrzeug_name} </option>`);

        drop.append(dropBody)

    }

}

function inputFahrzeugDropLieferung(fahrzeugListe: Fahrzeug[]) {
    let fahrzeug_name: string;
    let fahrzeug_id: number;
    let drop: JQuery = $('.custom-select2')
    let dropBody: JQuery;
    drop.empty();
    drop.append('<option selected > Choose ... </option>');
    for (let i = 0; i < fahrzeugListe.length; i++) {
        fahrzeug_name = fahrzeugListe[i].name;
        fahrzeug_id = fahrzeugListe[i].id;
        dropBody = $(`<option  value=${fahrzeug_id} > ${fahrzeug_name} </option>`);
        drop.append(dropBody)
    }

}

function login(){
    event.preventDefault();
    let email = String($('#inputLoginEmail').val()).trim().toLowerCase();
    let passwort = String($('#inputLoginPassword').val()).trim()
    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "email": email,
            "passwort": passwort
        }),
        success: (response) => {
            mainarea.show();
            loginArea.hide();
            signupBtn.hide();
            trackbutton.show();
            logoutbtn.show();
            profilbtn.show();
            buchungbtn.show();
        },
        error: (response) => {
           alert(response.responseJSON.message)
        },
    });

}

function logout() {
    $.ajax({
        url: '/logout',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: (response) => {
        },
        error: (err) => {
            loginArea.show();
            trackbutton.hide();
            profilbtn.hide();
            location.reload();
        },
    });
}

function getBewertungen(){
    $.ajax({
        url: '/bewertung/',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: (response) => {
        },
        error: (response) => {
            alert(response.responseJSON.message)
        },
    });
}

function postBewertung(){
    event.preventDefault();

    let bewertung: number = 0;
    let radio1: JQuery = $("#e1:checked");
    let radio2: JQuery = $("#e2:checked");
    let radio3: JQuery = $("#e3:checked");
    let radio4: JQuery = $("#e4:checked");
    let radio5: JQuery = $("#e5:checked");
    let kommentar: string = $("#feedbackTextarea").val().toString();

    if(radio5.val() == 5) {
        bewertung = 1;
    } else if(radio4.val() == 4) {
        bewertung = 2;
    } else if(radio3.val() == 3) {
        bewertung = 3;
    } else if(radio2.val() == 2) {
        bewertung = 4;
    } else if(radio1.val() == 1) {
        bewertung = 5;
    }
    $.ajax({
        url: '/bewertung/post',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            id_empfaenger,
            bewertung,
            kommentar
        }),
        success: (response) => {
            console.log("Bewertet");

        },
        error: (response) => {
            let modal = $("#feedback");
            let modalBackdrop: JQuery = $(".modal-backdrop");
            modalBackdrop.hide();
            modal.hide();
        },
    });
}

function registry(){
    let email:string = String($('#registryMail').val()).trim().toLowerCase();
    let name :string = String($('#registryName').val());
    let password :string = String($('#registryPassword').val()).trim();
    let birthday:string = String($('#registryBirthday').val());
    if(email!=""&&name!=""&&password!=""&&birthday!="") {
    let img:string = "bilder/profil_default.png";

        $.ajax({
            url: '/create/account',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
            email,
               name,
                password,
                birthday,
                img
            }),
            success: (response) => {
                alert("sucess");
            },
            error: (response) => {
                alert("Error");
            },
        });
    } else {
        alert("Bitte alle Eingabefelder ausfüllen!");
    }
}


function renderOfferPage(event) {
    event.preventDefault();
    const id: number = $(event.currentTarget).data("offer-id");
    const offerID: string = id.toString();
    idBooking = id;
    console.log(id);
    companyName = $("#companyName");
    rating= $("#rating");
    countRating= $("#countRating");
    offerPicture= $("#offerPic");
    offerDescription = $('#offerDescription');
    offerPageButtons = $('#offerPageButton');

    $.ajax( {
        url: '/read/offer/' + id,
        type: 'GET',
        contentType: 'application/json',
        success: (response) => {
            addOfferArea.hide();
            profileArea.hide();
            mainarea.hide();
            offerArea.show();
            console.log(response.result);
            companyName.text(response.result.email);
            offerDescription.text("Von: " + response.result.start + "\n" + "Bis: " + response.result.ziel + "\n" + "Datum: " +
                dateConvert(response.result.datum) + "\n \n" + "Beschreibung: " + response.result.beschreibung);

            offerPicture.empty();
            offerPageButtons.empty()
            let pic: JQuery;
            pic= $(` <img id="offerPicture" src=${response.result.bild} style="margin-top: 5%"
                                 alt="ExamplePicture">`);


            let buttons: JQuery = $(`<button data-user-id="${response.result.user_id}" class="btn w-75 userProfil"
                                    style="background-color: #276678; color: white; margin-top: 5%">Zum Profil
                            </button>
                            <br>
                            <button id="bookBTN" class="btn w-75" onclick="testFunction2(${offerID})"
                                    style="background-color: #276678; color: white; margin-top: 5%">Buchen
                            </button>`)
            offerPicture.append(pic);
            if(response.result.email!=response.mail) {
                offerPageButtons.append(buttons);
            }


        },
        error: (response) => {
            console.log(response);
        }
    })
}
function getProfil(){
    $.ajax( {
        url: '/user',
        type: 'GET',
        contentType: 'application/json',
        success: (response) => {
            openOwnProfile(response.user, response.cars, response.bewertung);
            getBewertung(-1);
        },
        error: (response) => {
            console.log(response);
        }
    })
}

function renderOwnBookings() {
    event.preventDefault();
    let bookingsTable: JQuery = $("#bookingsTabelBody");
    console.log("Hallo");

    $.ajax({
        url: '/bookings',
        type: 'GET',
        contentType: 'application/json',
        success: (response) => {
            console.log(response);
            bookingsTable.empty();
            let header: JQuery = $(`<tr>
                                                      <th scope="row">Track.Nr.</th>
                                                      <th scope="row">Start</th>
                                                      <th scope="row">Ziel</th>
                                                      <th scope="row">Datum</th>
                                                     
                                                      <td>
                                                       
                                                    </tr>`);
            bookingsTable.append(header);
            response.forEach((offer)=> {

                let renderOffers: JQuery = $(`<tr>
                                                      <th scope="row">${offer.trackID}</th>
                                                      <th scope="row">${offer.start}</th>
                                                      <th scope="row">${offer.ziel}</th>
                                                      <th scope="row">${dateConvert(offer.datum)}</th>
                                                     
                                                      <td>
                                                        <button onclick="testFunction()" id="fremdnutzerBTN" data-user-id="${offer.user_id}" class="btn btn-sm fremdnutzerBTN" style="background-color: #276678; color: white" data-bs-dismiss="modal"  data-target="#feedback" data-toggle="modal">Feedback</button>
                                                        </td>
                                                    </tr>`);
                bookingsTable.append(renderOffers)
            })
        },
        error: (response) => {
            console.log(response);
        }
    })
}

function renderDifBookings() {
    event.preventDefault();
    let bookingsTable: JQuery = $("#difbookingsTabelBody");
    console.log("Hallo");

    $.ajax({
        url: '/difBookings',
        type: 'GET',
        contentType: 'application/json',
        success: (response) => {
            console.log(response);
            bookingsTable.empty();
            let header: JQuery = $(`<tr>
                                                      <th scope="row">Track.Nr.</th>
                                                      <th scope="row">Start</th>
                                                      <th scope="row">Ziel</th>
                                                      <th scope="row">Datum</th>
                                                     
                                                      <td>
                                                       
                                                    </tr>`);
            bookingsTable.append(header);
            response.forEach((offer)=> {

                let renderOffers: JQuery = $(`<tr>
                                                      <th scope="row">${offer.trackID}</th>
                                                      <th scope="row">${offer.start}</th>
                                                      <th scope="row">${offer.ziel}</th>
                                                      <th scope="row">${dateConvert(offer.datum)}</th>
                                                    
                                                    </tr>`);
                bookingsTable.append(renderOffers)
            })
        },
        error: (response) => {
            console.log(response);
        }
    })
}


