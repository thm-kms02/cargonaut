let mainarea: JQuery;
let addOfferArea: JQuery;
let createOfferBTN: JQuery;

$(() => {
    mainarea = $("#mainArea");
    addOfferArea = $("#addOfferArea");
    createOfferBTN = $("#createOfferBTN");

    addOfferArea.hide();

    createOfferBTN.on('click', () => {
        mainarea.hide();
        addOfferArea.show();
    })
})
