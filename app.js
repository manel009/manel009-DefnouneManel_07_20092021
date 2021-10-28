/* SELECT INGRDIENTS */
function expandIngredients(idElementToExpand) {
    let elementToExpand = document.getElementById(idElementToExpand);
    elementToExpand.style.width = "350px";
    elementToExpand.placeholder = "Recherche un ingérident";

    let iconUp = document.getElementById('icon-ingredients-up');
    iconUp.style.display = "block";

    let iconDown = document.getElementById('icon-ingredients-down');
    iconDown.style.display = "none";
}

function reduceIngredients(idElementToReduce) {
    let elementToReduce = document.getElementById(idElementToReduce);
    elementToReduce.style.width = "120px";
    elementToReduce.placeholder = "";

    let iconUp = document.getElementById('icon-ingredients-up');
    iconUp.style.display = "none";

    let iconDown = document.getElementById('icon-ingredients-down');
    iconDown.style.display = "block";
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