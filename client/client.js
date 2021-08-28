"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//Navbar html-Elements:
var homeButton;
var trackbutton;
var signupBtn;
var logoutbtn;
var profilbtn;
var buchungbtn;
//Login-Page html-Elements:
var loginArea;
var loginBTN;
var inputLoginEmail;
var inputLoginPassword;
//Register-Page html-Elements
var registryModal;
var registryMail;
var registryName;
var registryPassword;
var registryBirthday;
var registryBTN;
//Offers Page html-Elements:
var mainarea;
var filterForOfferRadio;
var filterForSearchRadio;
var filterForCargoRadio;
var filterForTransportRadio;
var filterPrizeMin;
var filterPrizeMax;
var filternBTN;
var createOfferBTN;
var offerTableForm;
//Payment-Page html-Elements:
var offerArea;
var companyName;
var rating;
var countRating;
var offerPicture;
var contactBTN;
var markBTN;
var toProfileBTN;
var sendOfferBTN;
var bookBTN;
var offerDescription;
//Person-Transport-Modal-Page html-Elements:
var fahrzeugDropTaxi;
var inputPersonenzahl;
var inputVon;
var inputDate;
var inputNach;
var saveBTN;
//Cargo-Modal-Page html-Elements:
var fahrzeugDropLieferung;
var inputGesamtgewicht;
var inputVon2;
var inputLadeflaeche;
var inputDate2;
var inputNach2;
var inputLadehoehe;
var saveBTN2;
//Person-Transport-FILTER-Modal-Page html-Elements:
var inputPersonenzahlF;
var inputVonF;
var inputDateF;
var inputNachF;
var saveBTNF;
// Filter-Standard:
var inputMinPrice;
var inputMaxPrice;
//Cargo-FILTER-Modal-Page html-Elements:
var inputGesamtgewichtF;
var inputVon2F;
var inputLadeflaecheF;
var inputDate2F;
var inputNach2F;
var inputLadehoeheF;
var saveBTN2F;
//Create-Offer-Page html-Elements:
var addOfferArea;
var createOfferRadio;
var createSearchRadio;
var createCargoRadio;
var createTransportRadio;
var inputDescription;
var inputPrize;
var inputPictures;
var submitOfferBtn;
//Tracking-Page html-Elements:
var trackNumButton;
var mapArea;
//Profile-Page html-Elements:
var profileArea;
var profilePicture;
var uploadProfilePicture;
var profileName;
var profileRating;
var addCarBTN;
var addCarAttributeModel;
var addCarAttributeYear;
var addCarAttributeCargoArea;
var addCarAttributeWeight;
var addCarForm;
var ownBookingsBTN;
var buttonFeedback;
var renderComments;
///OfferDetailPage
var offerPageButtons;
var offerControlForm;
//Modals
var modalPersonenbefoerderung;
//Global Variables:
var person;
var personF;
var von;
var vonF;
var nach;
var nachF;
var setDate;
var setDateF;
var von2;
var von2F;
var nach2;
var nach2F;
var setDate2;
var setDate2F;
var fahrzeugID;
var fahrzeugID2;
var gesamtgewichtIN;
var gesamtgewichtF;
var ladeflaecheIN;
var ladeflaecheF;
var ladehoeheIN;
var ladehoeheF;
var offerslist;
var id_empfaenger;
var idBooking;
var isLoggedIn2 = false;
$(function () {
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
    inputVonF = $("#inputVonF");
    inputNachF = $("#inputNachF");
    inputDateF = $("#inputDateF");
    inputGesamtgewichtF = $("#inputGesamtgewichtF");
    inputVon2F = $("#inputVon2F");
    inputLadeflaecheF = $("#inputLadeflaecheF");
    inputDate2F = $("#inputDate2F");
    inputNach2F = $("#inputNach2F");
    inputLadehoeheF = $("#inputLadehoeheF");
    inputPersonenzahl = $("#inputPersonenzahl");
    inputVon = $("#inputVon");
    inputNach = $("#inputNach");
    inputDate = $("#inputDate");
    inputGesamtgewicht = $("#inputGesamtgewicht");
    inputLadeflaeche = $("#inputLadeflaeche");
    inputLadehoehe = $("#inputLadehoehe");
    inputVon2 = $("#inputVon2");
    inputNach2 = $("#inputNach2");
    inputDate2 = $("#inputDate2");
    inputMinPrice = $("#flilterPrizeMin");
    inputMaxPrice = $("#filterPrizeMax");
    saveBTNF = $("#saveBTNF");
    saveBTN2F = $("#saveBTN2F");
    offerPageButtons = $('#offerPageButton');
    offerControlForm = $('#offerControlForm');
    inputDescription = $("#inputDescription");
    inputPrize = $("#inputPrice");
    signupBtn = $("#SignupBtn");
    logoutbtn = $("#LogoutBtn");
    buchungbtn = $("#buchung");
    profilbtn = $("#profil");
    addCarForm = $('#addCarForm');
    ownBookingsBTN = $("#ownBookingsBTN");
    buttonFeedback = $("#Buttonfeedback");
    var fremdnutzerBTN = $(".fremdnutzerBTN");
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
    offerTableForm.on('click', '.testBTN', renderOfferPage);
    addCarForm.on('click', '.addCar', createCar);
    homeButton.on('click', function () {
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
    trackNumButton.on('click', function () {
        getTrackingRole();
    });
    trackbutton.on('click', function () {
        showMap();
    });
    createOfferBTN.on('click', function () {
        event.preventDefault();
        mainarea.hide();
        addOfferArea.show();
    });
    submitOfferBtn.on('click', function () {
        var emptyText = "";
        addAnzeige();
        document.getElementById('inputDescription');
        inputDescription.text(emptyText);
        inputPrize.text(emptyText);
        addOfferArea.hide();
        mainarea.show();
        getAll();
    });
    saveBTN.on('click', function () {
        saveValuesTaxi();
    });
    saveBTN2.on('click', function () {
        saveValuesLieferung();
    });
    fahrzeugDropTaxi.on('click', function () {
        getFahrzeugDropTaxi();
    });
    fahrzeugDropLieferung.on('click', function () {
        getFahrzeugDropLieferung();
    });
    loginBTN.on('click', function () {
        login();
    });
    logoutbtn.on('click', function () {
        logout();
    });
    profilbtn.on('click', function () {
        mainarea.hide();
        getProfil();
    });
    filternBTN.on('click', function () {
        getFilter();
    });
    registryBTN.on('click', function () {
        registryModal.modal('hide');
        registry();
    });
    saveBTNF.on('click', function () {
        saveValuesTaxiFilter();
    });
    saveBTN2F.on('click', function () {
        saveValuesLieferungFilter();
    });
    /*
        addCarBTN.on('click', () => {
            console.log("Add Car");
            createCar;
        });*/
    ownBookingsBTN.on('click', function () {
        renderOwnBookings();
    });
    buttonFeedback.on('click', function () {
        postBewertung();
    });
});
function renderAreas() {
    console.log("Nutzer angemeldet: " + isLoggedIn2);
    if (isLoggedIn2 == true) {
        logoutbtn.show();
        profilbtn.show();
        trackbutton.show();
        addOfferArea.hide();
        profileArea.hide();
        mainarea.show();
        offerArea.hide();
        loginArea.hide();
        registryBTN.hide();
    }
    else {
        mainarea.hide();
        loginArea.show();
        addOfferArea.hide();
        profileArea.hide();
        offerArea.hide();
        logoutbtn.hide();
        registryBTN.show();
    }
}
function isLoggedIn() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            $.ajax({
                url: '/isLoggedIn',
                type: 'GET',
                success: function (response) {
                    isLoggedIn2 = true;
                },
                error: function (jqXHR) {
                    isLoggedIn2 = false;
                }
            });
            return [2 /*return*/];
        });
    });
}
function testFunction() {
    id_empfaenger = $(event.currentTarget).data("user-id");
    var modal = $("#ownBookings");
    var modalBackdrop = $(".modal-backdrop");
    modalBackdrop.hide();
    modal.hide();
}
function getDifUser(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("user-id");
    $.ajax({
        url: '/difUser/' + id,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            renderProfil(response.user, response.cars, response.bewertung);
            getBewertung(id);
        },
        error: function (err) {
            alert("err");
        },
    });
}
function testFunction2(id) {
    event.preventDefault();
    var idBooking = Number(id);
    $.ajax({
        url: '/buchen',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            idBooking: idBooking
        }),
        success: function () {
            console.log("Error");
        },
        error: function (response) {
            console.log('Gebucht');
            alert("Anzeige wurde gebucht");
            mainarea.show();
            offerArea.hide();
            getAll();
        },
    });
}
function renderProfil(user, cars, bewertung) {
    var durchschnitt = String(bewertung);
    profileArea.empty();
    var newProfil = $("   \n        <div class=\"row\">\n            <div class=\"col-2\"></div>\n            <div class=\"col-8\" style=\"background-color: #f6f5f5; border-radius: 10px; padding-top: 2%; padding-bottom: 2%\">\n                <div class=\"row\">\n                    <div class=\"col-3\">\n                        <!--Profilbildbereich-->\n                        <div>\n                            <img id=\"profilePicture\" src=" + user.profil_bild + " alt=\"ProfilePicture\">\n                        </div>\n                        <input class=\"form-control\" type=\"file\" aria-label=\"\" id=\"uploadProfilePicture\">\n                        <table class=\"table table-borderless\" id=\"kommentare\">\n                            <tbody id=\"renderComments\">\n                                <!--Hier werden die kommentare des eigenen Profils angezeigt-->\n                            </tbody>\n                        </table>\n                    </div>\n                    <div class=\"col-9\">\n                        <h1 id=\"profileName\">" + user.name + "</h1>\n                        <span id=\"profileRating\">" + durchschnitt + "</span><span>/5 Sterne</span>\n                        <div style=\"margin-top: 10%; margin-left: 30%\">\n                            <h3>Fahrzeuge</h3>\n                            <table class=\"table table-borderless\">\n                                <thead>\n                                \n                                </thead>\n                                <tbody id=\"carsTableBody\">\n                                <!--Hier wird die Liste reingerendert-->\n                                \n                                </tbody>\n                            </table>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n   ");
    profileArea.append(newProfil);
    var carsTableBody = $('#carsTableBody');
    for (var _i = 0, cars_1 = cars; _i < cars_1.length; _i++) {
        var car = cars_1[_i];
        var elem = $(" <tr>\n                                    <td>\n                                        <div class=\"card\">\n                                            <div class=\"card-body\">\n                                                <div class=\"row\">\n                                         \n                                                    <div class=\"col-6\" style=\"text-align: center\">\n                                                        <div class=\"carAttribute\">\n                                                            <span class=\"carAttributeModel\"><span>Modell: </span>" + car.name + "</span>\n                                                        </div>\n                                                        <div class=\"carAttribute\">\n                                                            <span class=\"carAttributeYear\"><span>Baujahr: </span>" + car.jahr + "</span>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"col-6\" style=\"text-align: center\">\n                                                        <div class=\"carAttribute\">\n                                                            <span class=\"carAttributeCargoArea\"><span>Ladefl\u00E4che/ Sitzpl\u00E4tze: </span>" + car.volumen + "</span>\n                                                        </div>\n                                                        <div class=\"carAttribute\">\n                                                            <span class=\"carAttributeWeight\"><span>Gewicht: </span>" + car.gewicht + "</span>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </td>\n                                </tr>");
        carsTableBody.append(elem);
    }
    addOfferArea.hide();
    mainarea.hide();
    offerArea.hide();
    profileArea.show();
}
function getTrackingRole() {
    event.preventDefault();
    var trackNumIn = $('#feld');
    var trackNum = Number(trackNumIn.val());
    $.ajax({
        url: '/trackingRole/' + trackNum,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            goTrack(response.trackRole, trackNum);
        },
        error: function (response) {
        },
    });
}
function goTrack(role, tracknum) {
    /// 0 = not authorized, 1= viewer, 2= locationprovider
    if (role == 1) {
        getGPS(tracknum);
    }
    else if (role == 2) {
        sendLocation(tracknum);
    }
}
function sendLocation(tracknum) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            $.ajax({
                url: '/create/location',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    tracknum: tracknum,
                    lat: lat,
                    lng: lng
                }),
                success: function () {
                    showLocation(position.coords.latitude, position.coords.longitude, "");
                },
                error: function (response) {
                    showLocation(lat, lng, "");
                    alert("error");
                },
            });
        });
    }
    else {
        alert("Standort konnte nicht ermittelt werden");
    }
}
function getGPS(tracknum) {
    $.ajax({
        url: '/getGPS/' + tracknum,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.lat === null || response.lng == null) {
                alert("Noch keine GPS-Daten vorhanden!");
            }
            else {
                showLocation(response.lat, response.lng, response.date);
            }
        },
        error: function (response) {
        },
    });
}
function getBewertung(id) {
    $.ajax({
        url: '/bewertung/get/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            renderBewertungen(response);
        },
        error: function (response) {
        },
    });
}
function renderBewertungen(bewertungen) {
    renderComments = $("#renderComments");
    console.log(bewertungen);
    bewertungen.forEach(function (comment) {
        var comments = $("<tr>    \n                                            <td>\n                                                <div style=\"border-style: solid; border-radius: 3px; border-width: 1px; background-color: white; border-color: lightgrey\">\n                                                    <div style=\"margin-left: 7%\">\n                                                        <span>" + comment.bewertung + "<span>/5</span></span><br>\n                                                        <span>" + comment.kommentar + "</span>\n                                                    </div>\n                                                   \n                                                </div>  \n                                            </td>\n                                        </tr>");
        renderComments.append(comments);
        profileArea.show();
    });
}
function showLocation(lat, lng, date) {
    var mapArea = $('#mapArea');
    mapArea.empty();
    var trackmodal = $('#trackModal');
    trackmodal.show();
    var map;
    var center = { lat: lat, lng: lng };
    map = new google.maps.Map(document.getElementById("mapArea"), {
        center: center,
        zoom: 11
    });
    new google.maps.Marker({
        position: center,
        map: map,
        title: date,
    });
}
function getAll() {
    $.ajax({
        url: '/anzeige',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            renderOffersList(response.result);
            offerslist = response.result;
        },
        error: function (response) {
        },
    });
}
function createCar() {
    var namein = $('#addCarAttributeModel');
    var yearin = $('#addCarAttributeYear');
    var volin = $('#addCarAttributeCargoArea');
    var weightin = $('#addCarAttributeWeight');
    var name = namein.val().toString().trim();
    var year = Number(yearin.val());
    var vol = Number(volin.val());
    var weight = Number(weightin.val());
    console.log("Name: " + name, "Jahr: " + year, "Ladung: " + vol, "Gewicht: " + weight);
    $.ajax({
        url: '/create/fahrzeug',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            name: name,
            year: year,
            vol: vol,
            weight: weight
        }),
        success: function (response) {
            console.log("sucess");
            getProfil();
            alert("Fahrzeug wurde hinzugefügt");
        },
        error: function (response) {
            console.log("error");
            getProfil();
        },
    });
}
function showMap() {
    var map;
    var center = { lat: 30, lng: -110 };
    map = new google.maps.Map(document.getElementById("mapArea"), {
        center: center,
        zoom: 8
    });
}
function deleteCar(id) {
    $.ajax({
        url: '/car/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log("sucess");
            getProfil();
            alert(" Fahrzeug wurde entfernt");
        },
        error: function (response) {
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
    var modalBackdrop = $(".modal-backdrop");
    modalBackdrop.hide();
    modalPersonenbefoerderung.modal("hide");
}
function saveValuesTaxiFilter() {
    personF = Number(inputPersonenzahlF.val());
    vonF = String(inputVonF.val()).trim();
    nachF = String(inputNachF.val()).trim();
    setDateF = String(inputDateF.val()).trim();
    var modal = $("#personenbefoerderungModalF");
    var modalBackdrop = $(".modal-backdrop");
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
    var modal = $("#transportModal");
    var modalBackdrop = $(".modal-backdrop");
    modalBackdrop.hide();
    modal.modal("hide");
}
function saveValuesLieferungFilter() {
    gesamtgewichtF = Number(inputGesamtgewichtF.val());
    setDate2F = String(inputDate2F.val());
    von2F = String(inputVon2F.val()).trim();
    nach2F = String(inputNach2F.val()).trim();
    ladeflaecheF = Number(inputLadeflaecheF.val());
    ladehoeheF = Number(inputLadehoeheF.val());
    var modal = $("#transportModalF");
    var modalBackdrop = $(".modal-backdrop");
    modalBackdrop.hide();
    modal.modal("hide");
}
function getFilter() {
    var radOffer = $('#filterForOfferRadio:checked');
    var radSearch = $('#filterForSerachRadio:checked');
    var radTaxi = $('#filterForTransportRadio:checked');
    var radCargo = $('#filterForCargoRadio:checked');
    var ang_ges;
    var kategorie; //1 = ladungsbeförderung, 2 = personenbeförderung
    var von;
    var nach;
    var datum;
    var anzeigenRender = [];
    var personen = personF;
    var ladeflaeche = ladeflaecheF;
    var ladehoehe = ladehoeheF;
    var ladungsgewicht = gesamtgewichtF;
    if (radOffer.val() == "option1" && radSearch.val() == "option2") {
        ang_ges = undefined;
    }
    else if (radOffer.val() == "option1" && radSearch.val() != "option2") {
        ang_ges = 0;
    }
    else if (radSearch.val() == "option2" && radOffer.val() != "option1") {
        ang_ges = 1;
    }
    if (radCargo.val() == "option1" && radTaxi.val() == "option2") {
        kategorie = 0;
        console.log("kategorie 0");
    }
    else if (radCargo.val() == "option1" && radTaxi.val() != "option2") {
        kategorie = 1;
        console.log("kategorie 1");
    }
    else if (radTaxi.val() == "option2" && radCargo.val() != "option1") {
        kategorie = 2;
    }
    if (kategorie == 1) {
        von = von2F;
        nach = nach2F;
        datum = setDate2F;
    }
    if (kategorie == 2) {
        von = vonF;
        nach = nachF;
        datum = setDateF;
    }
    var minPreis = Number(inputMinPrice.val());
    var maxPreis = Number(inputMaxPrice.val());
    $.ajax({
        url: '/anzeige/filter',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "ang_ges": ang_ges,
            "kategorie": kategorie
        }),
        success: function (response) {
            var serverAnzeigen;
            serverAnzeigen = response;
            anzeigenRender = filternStandard(serverAnzeigen, minPreis, maxPreis, von, nach, datum);
            if (kategorie == 0) {
                renderOffersList(anzeigenRender);
            }
            if (kategorie == 1) {
                anzeigenRender = filternCargo(anzeigenRender, ladeflaeche, ladehoehe, ladungsgewicht);
                renderOffersList(anzeigenRender);
            }
            if (kategorie == 2) {
                anzeigenRender = filternTaxi(anzeigenRender, personen);
                renderOffersList(anzeigenRender);
            }
        },
        error: function (response) {
        },
    });
}
function filternStandard(anzeigen, minPreis, maxPreis, von, nach, datum) {
    var filteredAnzeigen = [];
    var j = 0;
    for (var i = 0; i < anzeigen.length; i++) {
        if (anzeigen[i].preis >= minPreis || minPreis === 0) {
            if (anzeigen[i].preis <= maxPreis || maxPreis === 0) {
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
function filternTaxi(anzeigen, personen) {
    var filteredTaxi = [];
    var j = 0;
    for (var i = 0; i < anzeigen.length; i++) {
        if (anzeigen[i].personen == personen || personen == 0 || personen === undefined) {
            filteredTaxi[j] = anzeigen[i];
            j++;
        }
    }
    return filteredTaxi;
}
function filternCargo(anzeigen, ladeflaeche, ladehoehe, ladungsgewicht) {
    var filteredCargo = [];
    var j = 0;
    for (var i = 0; i < anzeigen.length; i++) {
        if (anzeigen[i].ladeflaeche == ladeflaeche || ladeflaeche == 0 || ladeflaeche === undefined) {
            if (anzeigen[i].ladehoehe == ladehoehe || ladehoehe == 0 || ladehoehe === undefined) {
                if (anzeigen[i].ladungsgewicht == ladungsgewicht || ladungsgewicht == 0 || ladungsgewicht === undefined) {
                    filteredCargo[j] = anzeigen[i];
                    j++;
                }
            }
        }
    }
    return filteredCargo;
}
function addAnzeige() {
    var rad1 = $('#createOfferRadio:checked');
    var rad2 = $('#createSearchRadio:checked');
    var beschIn = $('#inputDescription');
    var priceIn = $('#inputPrice');
    var ang_ges = true;
    var beschreibung = String(beschIn.val()).trim();
    var preis = Number(priceIn.val());
    var start;
    var ziel;
    var datum;
    var personen;
    var id_fahrzeug;
    var ladeflaeche;
    var ladungsgewicht;
    var ladehoehe;
    if (person > 0) {
        start = von;
        ziel = nach;
        datum = setDate;
        personen = person;
        id_fahrzeug = fahrzeugID;
        ladeflaeche = 0;
        ladungsgewicht = 0;
        ladehoehe = 0;
    }
    else {
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
    }
    else if (rad2.val() == "option2") {
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
        success: function (response) {
            alert("Ihre Anzeige wurde erstellt!");
        },
        error: function (err) {
            console.log(err);
        },
    });
}
function sendMessage() {
    var message;
    var absender;
    var empfaenger;
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
        success: function (response) {
            console.log("sucess");
        },
        error: function (response) {
            console.log("error");
        },
    });
}
function getmyMessages() {
    var id;
    $.ajax({
        url: '/messages',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log("error");
        },
    });
}
function updateUser() {
    var bildIN = $('#uploadProfilePicture');
    var bild = bildIN.val().toString();
    var bild2 = bild.replace("C:\\fakepath\\", "bilder\\");
    console.log(bild2);
    $.ajax({
        url: '/update/user',
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            bild2: bild2
        }),
        success: function (response) {
            console.log("sucess");
            getProfil();
            getAll();
        },
        error: function (response) {
            console.log("error");
        },
    });
}
function dateConvert(datum) {
    var yearTemp = [];
    var monthTemp = [];
    var dayTemp = [];
    for (var i = 0; i < 10; i++) {
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
    var dateNew = dayTemp.toString() + "." + monthTemp.toString() + "." + yearTemp;
    return dateNew.replace(/,/g, "");
}
function renderAnzeige(anz) {
    var offersListBody = $("#offersTableBody");
    var ueberschrift;
    var menge;
    var datumSqlFormat = String((anz.datum).split("", 10)).replace(/,/g, "");
    var datumEuropaFormat = dateConvert(datumSqlFormat);
    var fahrzeugName;
    var img;
    if (anz.personen === null || anz.personen === undefined) {
        ueberschrift = "Ladungsbeförderung";
        menge = String(anz.ladungsgewicht);
    }
    else {
        ueberschrift = "Personenbeförderung";
        menge = String(anz.personen);
    }
    if (anz.name === null) {
        fahrzeugName = "Beliebig";
    }
    else {
        fahrzeugName = anz.name;
    }
    if (anz.bild === null || anz.bild === undefined) {
        img = "assets/Examplepictures/Pic-1.png";
    }
    else {
        img = anz.bild;
    }
    offersListBody.append(card(ueberschrift, anz, datumEuropaFormat, menge, fahrzeugName, img));
}
function renderOffersList(offerList) {
    var offersListBody = $("#offersTableBody");
    if (offerList.length == 0 || offerList === undefined) {
        alert("Die Suche liefert keine Ergebnisse");
    }
    offersListBody.empty();
    for (var i = 0; i < offerList.length; i++) {
        renderAnzeige(offerList[i]);
    }
}
function card(ueberschrift, anz, datumEuropaFormat, menge, fahrzeugName, img) {
    var card;
    var str = "";
    if (anz.ang_ges == false) {
        str = "Biete: ";
    }
    else if (anz.ang_ges == true) {
        str = "Suche: ";
    }
    if (ueberschrift === "Personenbeförderung") {
        card = $("\n        <tr>\n            <td>\n                <div class=\"card\" style=\"background-color: #f5f6f6\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + (str + ueberschrift) + "</h5>\n                        <div class=\"row\">\n                            <div class=\"col-5\">\n                                <img src=" + img + " style=\"width: 200px; height: auto\" alt=\"Examplepicture\">\n                            </div>\n                            <div class=\"col-5\">\n                                <p class=\"textListComponent\"><span>Von: " + anz.start + "</span></p>\n                                <p class=\"textListComponent\"><span>Nach: " + anz.ziel + "</span></p>\n                                <p class=\"textListComponent\"><span>Wann: " + datumEuropaFormat + "</span></p>\n                                <p class=\"textListComponent\"><span>Personenanzahl: " + menge + "</span></p>\n                                <p class=\"textListComponent\"><span>Fahrzeug: " + fahrzeugName + "</span></p>\n                            </div>\n                            <div class=\"col-2\">\n                                <p class=\"card-text pricing\" style=\"margin-top: 90px\">" + anz.preis + "<span>\u20AC</span></p>\n                            </div>\n                        </div>\n                        <div class=\"alignRight\">\n                            <button class=\"btn niceButton testBTN\" form=\"offerTableForm\" data-offer-id=\"" + anz.id + "\">Zum Angebot</button>\n                        </div>\n                    </div>\n                </div>\n            </td>\n        </tr>\n    ");
        return card;
    }
    else {
        card = $("\n        <tr>\n            <td>\n                <div class=\"card\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + (str + ueberschrift) + "</h5>\n                        <div class=\"row\">\n                            <div class=\"col-5\">\n                                <img src=" + img + " style=\"width: 200px; height: auto\" alt=\"Examplepicture\">\n                            </div>\n                            <div class=\"col-5\">\n                                <p class=\"textListComponent\"><span>Von: " + anz.start + "</span></p>\n                                <p class=\"textListComponent\"><span>Nach: " + anz.ziel + "</span></p>\n                                <p class=\"textListComponent\"><span>Wann: " + datumEuropaFormat + "</span></p>\n                                <p class=\"textListComponent\"><span>Ladefl\u00E4che: " + anz.ladeflaeche + " m\u00B2</span></p>\n                                <p class=\"textListComponent\"><span>Ladeh\u00F6he: " + anz.ladehoehe + " cm</span></p>\n                                 <p class=\"textListComponent\"><span>Ladegewicht: " + anz.ladungsgewicht + " Kg</span></p>\n                                <p class=\"textListComponent\"><span>Fahrzeug: " + fahrzeugName + "</span></p>\n                            </div>\n                            <div class=\"col-2\">\n                                <p class=\"card-text pricing\" style=\"margin-top: 90px\">" + anz.preis + "<span>\u20AC</span></p>\n                            </div>\n                        </div>\n                        <div class=\"alignRight\">\n                            <button class=\"btn niceButton testBTN\" form=\"offerTableForm\" data-offer-id=\"" + anz.id + "\">Zum Angebot</button>\n                        </div>\n                    </div>\n                </div>\n            </td>\n        </tr>\n    ");
        return card;
    }
}
function openOwnProfile(user, cars, bewertung) {
    profileArea.empty();
    var durchschnitt = String(bewertung);
    var newProfil = $("  <div class=\"row\">\n            <div class=\"col-2\"></div>\n            <div class=\"col-8\" style=\"background-color: #f6f5f5; border-radius: 10px; padding-top: 2%; padding-bottom: 2%\">\n                <div class=\"row\">\n                    <div class=\"col-3\">\n                        <!--Profilbildbereich-->\n                        <div>\n                            <img id=\"profilePicture\" src=" + user.profil_bild + " alt=\"ProfilePicture\">\n                        </div>\n                        <input class=\"form-control\" type=\"file\" aria-label=\"\" id=\"uploadProfilePicture\">\n                        <button class=\"btn niceButton\" onclick=\"updateUser()\">Profilbild \u00E4ndern</button>\n                        <table class=\"table table-borderless\" id=\"kommentare\">\n                            <tbody id=\"renderComments\">\n                                <!--Hier werden die kommentare des eigenen Profils angezeigt-->\n                            </tbody>\n                        \n                        </table>\n                    </div>\n       \n                    <div class=\"col-9\">\n                        <h1 id=\"profileName\">" + user.name + "</h1>\n                        <span id=\"profileRating\">" + durchschnitt + "</span><span>/5 Sterne</span>\n                       <!-------------------- <button  onclick=\"renderOwnBookings()\" type=\"button\" class=\"btn niceButton\" data-toggle=\"modal\" data-target=\"#ownBookings\">\n                            Meine Buchungen\n                        </button>-------------->\n                        <div style=\"margin-top: 2%; margin-left: 30%\">\n                            <h3>Fahrzeuge</h3>\n                            <table class=\"table table-borderless\">\n                              \n                                <thead>\n                                <tr>\n                                    <th>\n                                        <div class=\"card\">\n                                            <div class=\"card-body\">\n                                                <div class=\"row\">\n                                                    <div class=\"col-4\">\n                                                        <div class=\"btn\" id=\"addCarBTN\" >                                                  \n                                                            <a class=\"btn btn-light action-button\"  role=\"button\" form=\"addCarForm\" onclick=\"createCar()\" style=\"margin-top:20% ;margin-left: 15% ; background-color: #276678; color: white\">Anlegen</a>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"col-4\" style=\"text-align: center\">\n                                                        <label>\n                                                            <input class=\"form-control\" id=\"addCarAttributeModel\"\n                                                                   type=\"text\" form=\"addCarForm\" placeholder=\"Marke/Modell\"/>\n                                                        </label>\n                                                        <label>\n                                                            <input class=\"form-control\" form=\"addCarForm\" id=\"addCarAttributeYear\" type=\"text\"\n                                                                   placeholder=\"Baujahr\"/>\n                                                        </label>\n                                                    </div>\n                                                    <div class=\"col-4\" style=\"text-align: center\">\n                                                        <label>\n                                                            <input class=\"form-control\" form=\"addCarForm\" id=\"addCarAttributeCargoArea\"\n                                                                   type=\"text\" placeholder=\"Stauraum\"/>\n                                                        </label>\n                                                        <label>\n                                                            <input class=\"form-control\" form=\"addCarForm\" id=\"addCarAttributeWeight\"\n                                                                   type=\"text\" placeholder=\"Gewicht\"/>\n                                                        </label>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </th>\n                                </tr>\n                                </thead>\n                                <tbody id=\"carsTableBody\">\n                                <!--Hier wird die Liste reingerendert-->\n                               \n                                </tbody>\n                              \n                            </table>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>");
    profileArea.append(newProfil);
    var carsTableBody = $('#carsTableBody');
    cars.forEach(function (car) {
        var renderCar = $("<tr>\n                                            <td>\n                                                <div class=\"card\">\n                                                    <div class=\"card-body\">\n                                                        <div class=\"row\">\n                                                          \n                                                            <div class=\"col-5\" style=\"text-align: center\">\n                                                                <div class=\"carAttribute\">\n                                                                    <span class=\"carAttributeModel\"><span>Modell: </span>" + car.name + "</span>\n                                                                </div>\n                                                                <div class=\"carAttribute\">\n                                                                    <span class=\"carAttributeYear\"><span>Baujahr: </span>" + car.jahr + "</span>\n                                                                </div>\n                                                            </div>\n                                                            <div class=\"col-6\" style=\"text-align: center\">\n                                                                <div class=\"carAttribute\">\n                                                                    <span class=\"carAttributeCargoArea\"><span>Ladefl\u00E4che/ Sitzpl\u00E4tze: </span>" + car.volumen + "</span>\n                                                                </div>\n                                                                <div class=\"carAttribute\">\n                                                                    <span class=\"carAttributeWeight\"><span>Gewicht: </span>" + car.gewicht + "</span>\n                                                                </div>\n                                                            </div>\n                                                            <div class=\"col-1\">\n                                                                <button class=\"btn btn-outline-dark btn-sm delete-user-button\" data-car-id=\"" + car.id + "\" onclick=\"deleteCar(" + car.id + ")\">\n                                                                  <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                                                 <!--  <div class=\"w1-padding w1-xlarge w3-text-red\">           \n                                                                         <i class=\"material-icons\">delete</i>\n                                                                     </div>\n                                                                              -->    \n                                                                </button>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </td>\n                                        </tr>");
        carsTableBody.append(renderCar);
    });
    profileArea.show();
}
function getFahrzeugDropTaxi() {
    var inputFahrzeug = String($('.custom-select').val()).trim();
    if (inputFahrzeug == "Choose ...")
        $.ajax({
            url: '/fahrzeug',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                inputFahrzeugDropTaxi(response.result);
            },
            error: function (response) {
            },
        });
}
function getFahrzeugDropLieferung() {
    var inputFahrzeug = String($('.custom-select2').val()).trim();
    if (inputFahrzeug == "Choose ...")
        $.ajax({
            url: '/fahrzeug',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                inputFahrzeugDropLieferung(response.result);
            },
            error: function (response) {
            },
        });
}
function inputFahrzeugDropTaxi(fahrzeugListe) {
    var fahrzeug_name;
    var fahrzeug_id;
    var drop = $('.custom-select');
    var dropBody;
    drop.empty();
    drop.append('<option selected > Choose ... </option>');
    for (var i = 0; i < fahrzeugListe.length; i++) {
        fahrzeug_name = fahrzeugListe[i].name;
        fahrzeug_id = fahrzeugListe[i].id;
        dropBody = $("<option  value=" + fahrzeug_id + " > " + fahrzeug_name + " </option>");
        drop.append(dropBody);
    }
}
function inputFahrzeugDropLieferung(fahrzeugListe) {
    var fahrzeug_name;
    var fahrzeug_id;
    var drop = $('.custom-select2');
    var dropBody;
    drop.empty();
    drop.append('<option selected > Choose ... </option>');
    for (var i = 0; i < fahrzeugListe.length; i++) {
        fahrzeug_name = fahrzeugListe[i].name;
        fahrzeug_id = fahrzeugListe[i].id;
        dropBody = $("<option  value=" + fahrzeug_id + " > " + fahrzeug_name + " </option>");
        drop.append(dropBody);
    }
}
function login() {
    event.preventDefault();
    var email = String($('#inputLoginEmail').val()).trim().toLowerCase();
    var passwort = String($('#inputLoginPassword').val()).trim();
    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "email": email,
            "passwort": passwort
        }),
        success: function (response) {
            mainarea.show();
            loginArea.hide();
            signupBtn.hide();
            trackbutton.show();
            logoutbtn.show();
            profilbtn.show();
            buchungbtn.show();
        },
        error: function (response) {
            alert(response.responseJSON.message);
        },
    });
}
function logout() {
    $.ajax({
        url: '/logout',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
        },
        error: function (err) {
            loginArea.show();
            trackbutton.hide();
            profilbtn.hide();
            location.reload();
        },
    });
}
function getBewertungen() {
    $.ajax({
        url: '/bewertung/',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
        },
        error: function (response) {
            alert(response.responseJSON.message);
        },
    });
}
function postBewertung() {
    event.preventDefault();
    var bewertung = 0;
    var radio1 = $("#e1:checked");
    var radio2 = $("#e2:checked");
    var radio3 = $("#e3:checked");
    var radio4 = $("#e4:checked");
    var radio5 = $("#e5:checked");
    var kommentar = $("#feedbackTextarea").val().toString();
    if (radio5.val() == 5) {
        bewertung = 1;
    }
    else if (radio4.val() == 4) {
        bewertung = 2;
    }
    else if (radio3.val() == 3) {
        bewertung = 3;
    }
    else if (radio2.val() == 2) {
        bewertung = 4;
    }
    else if (radio1.val() == 1) {
        bewertung = 5;
    }
    $.ajax({
        url: '/bewertung/post',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            id_empfaenger: id_empfaenger,
            bewertung: bewertung,
            kommentar: kommentar
        }),
        success: function (response) {
            console.log("Bewertet");
        },
        error: function (response) {
            var modal = $("#feedback");
            var modalBackdrop = $(".modal-backdrop");
            modalBackdrop.hide();
            modal.hide();
        },
    });
}
function registry() {
    var email = String($('#registryMail').val()).trim().toLowerCase();
    var name = String($('#registryName').val());
    var password = String($('#registryPassword').val()).trim();
    var birthday = String($('#registryBirthday').val());
    if (email != "" && name != "" && password != "" && birthday != "") {
        var img = "bilder/profil_default.png";
        $.ajax({
            url: '/create/account',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                email: email,
                name: name,
                password: password,
                birthday: birthday,
                img: img
            }),
            success: function (response) {
                alert("sucess");
            },
            error: function (response) {
                alert("Error");
            },
        });
    }
    else {
        alert("Bitte alle Eingabefelder ausfüllen!");
    }
}
function renderOfferPage(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("offer-id");
    var offerID = id.toString();
    idBooking = id;
    console.log(id);
    companyName = $("#companyName");
    rating = $("#rating");
    countRating = $("#countRating");
    offerPicture = $("#offerPic");
    offerDescription = $('#offerDescription');
    offerPageButtons = $('#offerPageButton');
    $.ajax({
        url: '/read/offer/' + id,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            addOfferArea.hide();
            profileArea.hide();
            mainarea.hide();
            offerArea.show();
            console.log(response.result);
            companyName.text(response.result.email);
            offerDescription.text("Von: " + response.result.start + "\n" + "Bis: " + response.result.ziel + "\n" + "Datum: " +
                dateConvert(response.result.datum) + "\n \n" + "Beschreibung: " + response.result.beschreibung);
            offerPicture.empty();
            offerPageButtons.empty();
            var pic;
            pic = $(" <img id=\"offerPicture\" src=" + response.result.bild + " style=\"margin-top: 5%\"\n                                 alt=\"ExamplePicture\">");
            var buttons = $("<button data-user-id=\"" + response.result.user_id + "\" class=\"btn w-75 userProfil\"\n                                    style=\"background-color: #276678; color: white; margin-top: 5%\">Zum Profil\n                            </button>\n                            <br>\n                            <button id=\"bookBTN\" class=\"btn w-75\" onclick=\"testFunction2(" + offerID + ")\"\n                                    style=\"background-color: #276678; color: white; margin-top: 5%\">Buchen\n                            </button>");
            offerPicture.append(pic);
            if (response.result.email != response.mail) {
                offerPageButtons.append(buttons);
            }
        },
        error: function (response) {
            console.log(response);
        }
    });
}
function getProfil() {
    $.ajax({
        url: '/user',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            openOwnProfile(response.user, response.cars, response.bewertung);
            getBewertung(-1);
        },
        error: function (response) {
            console.log(response);
        }
    });
}
function renderOwnBookings() {
    event.preventDefault();
    var bookingsTable = $("#bookingsTabelBody");
    console.log("Hallo");
    $.ajax({
        url: '/bookings',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            bookingsTable.empty();
            var header = $("<tr>\n                                                      <th scope=\"row\">Track.Nr.</th>\n                                                      <th scope=\"row\">Start</th>\n                                                      <th scope=\"row\">Ziel</th>\n                                                      <th scope=\"row\">Datum</th>\n                                                     \n                                                      <td>\n                                                       \n                                                    </tr>");
            bookingsTable.append(header);
            response.forEach(function (offer) {
                var renderOffers = $("<tr>\n                                                      <th scope=\"row\">" + offer.trackID + "</th>\n                                                      <th scope=\"row\">" + offer.start + "</th>\n                                                      <th scope=\"row\">" + offer.ziel + "</th>\n                                                      <th scope=\"row\">" + dateConvert(offer.datum) + "</th>\n                                                     \n                                                      <td>\n                                                        <button onclick=\"testFunction()\" id=\"fremdnutzerBTN\" data-user-id=\"" + offer.user_id + "\" class=\"btn btn-sm fremdnutzerBTN\" style=\"background-color: #276678; color: white\" data-bs-dismiss=\"modal\"  data-target=\"#feedback\" data-toggle=\"modal\">Feedback</button>\n                                                        </td>\n                                                    </tr>");
                bookingsTable.append(renderOffers);
            });
        },
        error: function (response) {
            console.log(response);
        }
    });
}
