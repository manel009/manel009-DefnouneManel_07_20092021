/* SELECT INGRDIENTS */
function expandIngredients(idElementToExpand) {
    // On change la taille de l'input
    let elementToExpand = document.getElementById(idElementToExpand);
    elementToExpand.style.width = "350px";
    elementToExpand.style.borderBottomLeftRadius = 0;
    elementToExpand.placeholder = "Recherche un ingérident";

    // On affiche la fleche vers le haut
    let iconUp = document.getElementById('icon-ingredients-up');
    iconUp.style.display = "block";
    iconUp.style.borderBottomRightRadius = 0;

    // On masque la fleche vers le bas
    let iconDown = document.getElementById('icon-ingredients-down');
    iconDown.style.display = "none";

    // On affiche la zone avec tous les resultats 
    let selectContent = document.getElementById('select-content-ingredients');
    selectContent.style.display = "grid";
    let selectContentWidth = elementToExpand.clientWidth + iconUp.clientWidth;
    selectContent.style.width = selectContentWidth + "px";
    selectContent.style.borderBottomRightRadius = "5px";
    selectContent.style.borderBottomLeftRadius = "5px";
}

function reduceIngredients(idElementToReduce) {
    // On reduit l'input
    let elementToReduce = document.getElementById(idElementToReduce);
    elementToReduce.style.width = "120px";
    elementToReduce.style.borderBottomLeftRadius = "5px";
    elementToReduce.placeholder = "";

    // On masque la fleche vers le haut
    let iconUp = document.getElementById('icon-ingredients-up');
    iconUp.style.display = "none";

    // On affiche la fleche vers le bas
    let iconDown = document.getElementById('icon-ingredients-down');
    iconDown.style.display = "block";

    // On masque le contenu du select
    let selectContent = document.getElementById('select-content-ingredients');
    selectContent.style.display = "none";
}

/* SELECT APPAREILS */
function expandAppareils(idElementToExpand) {
    let elementToExpand = document.getElementById(idElementToExpand);
    elementToExpand.style.width = "350px";
    elementToExpand.placeholder = "Recherche un appareil";

    let iconUp = document.getElementById('icon-appareils-up');
    iconUp.style.display = "block";

    let iconDown = document.getElementById('icon-appareils-down');
    iconDown.style.display = "none";
}

function reduceAppareils(idElementToReduce) {
    let elementToReduce = document.getElementById(idElementToReduce);
    elementToReduce.style.width = "120px";
    elementToReduce.placeholder = "";

    let iconUp = document.getElementById('icon-appareils-up');
    iconUp.style.display = "none";

    let iconDown = document.getElementById('icon-appareils-down');
    iconDown.style.display = "block";
}


/* SELECT USTENSILS */
function expandUstensils(idElementToExpand) {
    let elementToExpand = document.getElementById(idElementToExpand);
    elementToExpand.style.width = "350px";
    elementToExpand.placeholder = "Recherche un ustensil";

    let iconUp = document.getElementById('icon-ustensils-up');
    iconUp.style.display = "block";

    let iconDown = document.getElementById('icon-ustensils-down');
    iconDown.style.display = "none";
}

function reduceUstensils(idElementToReduce) {
    let elementToReduce = document.getElementById(idElementToReduce);
    elementToReduce.style.width = "120px";
    elementToReduce.placeholder = "";

    let iconUp = document.getElementById('icon-ustensils-up');
    iconUp.style.display = "none";

    let iconDown = document.getElementById('icon-ustensils-down');
    iconDown.style.display = "block";
}