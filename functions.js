/**
 * param = ingredients, ustensils ou appareils
 * 
 * @param {*} param 
 */
function expandSelects(param) {
    //METHOD 1 : on rend dynamique l'id select-XXXXXXX avec la valeur de param puis on recupere l'element avec l'id genere
    let idElementToExpand = 'select-' + param;
    let elementToExpand = document.getElementById(idElementToExpand);
    elementToExpand.style.width = "400px";
    elementToExpand.style.borderBottomLeftRadius = 0;
    // mETHOD 2 : on verifie le contenu de param et selon sa valeur, on recupere un select differents
    if (param == "ingredients") {
        elementToExpand.placeholder = "Recherche un ingrédident";
        reduceSelects("appareils");
        reduceSelects("ustensils");
    } else if (param == "appareils") {
        elementToExpand.placeholder = "Recherche un appareil";
        reduceSelects("ingredients");
        reduceSelects("ustensils");
    } else if (param == "ustensils") {
        elementToExpand.placeholder = "Recherche un ustensile";
        reduceSelects("appareils");
        reduceSelects("ingredients");
    }

    // On affiche la fleche vers le haut
    let idIconUp = 'icon-' + param + '-up';
    let iconUp = document.getElementById(idIconUp);
    iconUp.style.display = "block";
    iconUp.style.borderBottomRightRadius = 0;

    // On masque la fleche vers le bas
    let idIconDown = 'icon-' + param + '-down';
    let iconDown = document.getElementById(idIconDown);
    iconDown.style.display = "none";

    // On affiche le contenu du select
    let idSelectContent = 'select-content-' + param;
    let selectContent = document.getElementById(idSelectContent);
    selectContent.style.display = "grid";
    let selectContentWidth = elementToExpand.clientWidth + iconUp.clientWidth;
    selectContent.style.width = selectContentWidth + "px";
    selectContent.style.borderBottomRightRadius = "5px";
    selectContent.style.borderBottomLeftRadius = "5px";
}


/**
 * param = ingredients, ustensils ou appareils
 * 
 * @param {*} param 
 */
function reduceSelects(param) {
    let idElementToReduce = 'select-' + param;
    let elementToReduce = document.getElementById(idElementToReduce);
    elementToReduce.style.width = "120px";
    elementToReduce.style.borderBottomLeftRadius = "5px";

    if (param == "ingredients") {
        elementToReduce.placeholder = "Ingrédident";
    } else if (param == "appareils") {
        elementToReduce.placeholder = "Appareil";
    } else if (param == "ustensils") {
        elementToReduce.placeholder = "Ustensile";
    }

    // On masque la fleche vers le haut
    let iconUp = document.getElementById('icon-' + param + '-up');
    iconUp.style.display = "none";

    // On affiche la fleche vers le bas
    let iconDown = document.getElementById('icon-' + param + '-down');
    iconDown.style.display = "block";

    // On masque le contenu du select
    let selectContent = document.getElementById('select-content-' + param);
    selectContent.style.display = "none";
}

/**
 * Ajoute l'element clique en tant que filtre actif
 * 
 * @param {*} typeFilter 
 * @param {*} elementHtml 
 */
function addFilter(typeFilter, elementHtml) {
    let textFilter = elementHtml.text;
    //1 je cree mon bloc filtre
    let divFilter = document.createElement('div');
    divFilter.className = "active-filter fond-" + typeFilter;
    divFilter.innerHTML = '<span>' + textFilter + '</span><i class="far fa-times-circle" onclick="deleteFilter(this)"></i>';

    //2 j'ajoute mon bloc dans active-filters
    let divActiveFilters = document.getElementById("active-filters");
    divActiveFilters.appendChild(divFilter);

    // Actualise les resultats en avec le filtre ajouté
    let filter = { "type": typeFilter, "name": textFilter };
    window.filters = [];
    window.filters.push(filter);
    window.filters.forEach((filter) => {
        reloadRecipesWithFilter(filter.type, filter.name);
    });


}

/**
 * Supprime le parent de l'element donne.
 * 
 *  @param {*} element 
 */
function deleteFilter(element) {
    let type = "";
    let name = element.parentNode.innerText;
    var search = document.getElementById('search-bar').value;
    if (element.parentNode.className.includes('ingredients')) {
        type = 'ingredients';
    } else if (element.parentNode.className.includes('appareils')) {
        type = 'appareils';
    } else if (element.parentNode.className.includes('ustensils')) {
        type = 'ustensils';
    }

    window.filters.filter(function(filter) {
        return filter.type != type && filter.name != name;
    });

    reloadRecipes(search);
    window.filters.forEach((filter) => {
        reloadRecipesWithFilter(filter.type, filter.name);
    });

    element.parentNode.remove();
}

/**
 * Genere le html d'un bloc recette.
 * 
 * @param {*} recette 
 */
function generateHtmlRecette(recette) {
    // On cree l'element html article de la recette
    let articleRecette = document.createElement('article');
    articleRecette.className = "cellule-recette";

    // on cree l'image de la recette
    let imgRecette = document.createElement('img');
    articleRecette.appendChild(imgRecette);

    // On cree le header de la recette
    let divRecetteHeader = document.createElement('div');
    divRecetteHeader.className = "cellule-recette-header";
    divRecetteHeader.innerHTML = '<h2>' + recette.name + '</h2>  <span><i class="far fa-clock"></i> ' + recette.time + ' min</span>';
    articleRecette.appendChild(divRecetteHeader);

    let divRecetteContent = document.createElement('div');
    divRecetteContent.className = "cellule-recette-content";
    articleRecette.appendChild(divRecetteContent);

    let ulIngredients = document.createElement('ul');
    for (var ingredient of recette.ingredients) {

        if (ingredient.unit == undefined && ingredient.quantity == undefined) {
            ulIngredients.innerHTML += " <li> <b>" + ingredient.ingredient + " </b></li>";
        } else if (ingredient.unit == undefined) {
            ulIngredients.innerHTML += " <li> <b>" + ingredient.ingredient + " : </b> " + ingredient.quantity + "</li>";
        } else {
            ulIngredients.innerHTML += " <li> <b>" + ingredient.ingredient + " : </b> " + ingredient.quantity + " " + ingredient.unit + "</li>";
        }

    }
    divRecetteContent.appendChild(ulIngredients);
    divRecetteContent.innerHTML += "<p>" + recette.description + "</p>";

    // On ajoute l'article de la recette dansla sectiondes recettes
    let sectionRecette = document.getElementById('recettes-section');
    sectionRecette.appendChild(articleRecette);
}


/**
 * Met la premiere lettre en maj.
 * 
 * @param {*} string 
 * @returns 
 */
function upperCaseFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);

}

/**
 * Ajoute les elements dans les listes deroulantes.
 * 
 * @param {*} element 
 * @param {*} typeSelect 
 */
function addElementToDropdown(element, typeSelect) {
    // On recupere la div ou l'on va ajouter l'element
    let divContent = document.getElementById("select-content-" + typeSelect);
    // Ajoute une nouvelle balise a dans la div
    divContent.innerHTML += '<a href="#" class="select-content-element" onclick="addFilter(\'' + typeSelect + '\', this)">' + element + '</a>';
}

/**
 * Supprime les elements dans les listes deroulantes.
 * 
 * @param {*} element 
 * @param {*} typeSelect 
 */
function cleanElementToDropdown(typeSelect) {
    // On recupere la div ou l'on va ajouter l'element
    let divContent = document.getElementById("select-content-" + typeSelect);
    // supprime le contenu de la div
    divContent.innerHTML = '';
}

/**
 * Evenement onkeyup du champs de recherche principale.
 * Si 3 caracters saisient au minimum, filtres les recettes et les filtres.
 * @param {*} value 
 */
function searchRecipes(value) {
    if (value.length > 2) {
        reloadRecipes(value);
    }

}

/**
 * Recharge les recettes en resultats et met a jour les filtres
 * @param {*} searchValue 
 */
function reloadRecipes(searchValue) {

    // On initialise un tableau vide
    var listIngredients = [];
    var listAppareils = [];
    var listUstensils = [];
    var listRecipesResult = [];

    // On vide les precedents resultats
    document.getElementById("recettes-section").innerHTML = "";

    // Pour chaque recette dans "recettes"
    for (var recette of recettes) {

        if (searchValue != "") {
            // Pour la recette en cours de lecture, on recuperes ses ingredients et on les met dans ingredientsDeLaRecetteEnCoursDeLecture
            let isAtLeastOneIngredientFound = false;
            let ingredientsDeLaRecetteEnCoursDeLecture = recette.ingredients;

            // Pour chaque ingredient du tableau ingredients de la recette en cours de lecture
            ingredientsDeLaRecetteEnCoursDeLecture.forEach((ingredientEnCoursDeLecture) => {
                if (ingredientEnCoursDeLecture.ingredient.includes(searchValue)) {
                    isAtLeastOneIngredientFound = true;
                }
            });

            if (recette.name.includes(searchValue)) {
                addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
                listRecipesResult.push(recette);
            } else if (recette.description.includes(searchValue)) {
                addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
                listRecipesResult.push(recette);
            } else if (isAtLeastOneIngredientFound) {
                addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
                listRecipesResult.push(recette);
            }
        } else {
            addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
        }

    }

    // On formatte les donnees des liste
    listIngredients = listIngredients.map(ingredientName => upperCaseFirstLetter(ingredientName));
    listAppareils = listAppareils.map(appareilName => upperCaseFirstLetter(appareilName));
    listUstensils = listUstensils.map(ustensilName => upperCaseFirstLetter(ustensilName));

    // Supprimer les doublons
    listIngredients = [...new Set(listIngredients)];
    listAppareils = [...new Set(listAppareils)];
    listUstensils = [...new Set(listUstensils)];

    // Pour chaque elements des listes, on les ajoute a la liste deroulantes associée
    cleanElementToDropdown('ingredients');
    cleanElementToDropdown('appareils');
    cleanElementToDropdown('ustensils');
    listIngredients.map(ingredientName => addElementToDropdown(ingredientName, 'ingredients'));
    listAppareils.map(appareilName => addElementToDropdown(appareilName, 'appareils'));
    listUstensils.map(ustensilName => addElementToDropdown(ustensilName, 'ustensils'));

    //on ajoute les recettes, ingredients, apparaiels et ustensils dans le global
    window.recipes = listRecipesResult;
    window.ingredients = listIngredients;
    window.appareils = listAppareils;
    window.ustensils = listUstensils;
}

/**
 * 
 * @param {*} typeFilter 
 * @param {*} textFilter 
 */
function reloadRecipesWithFilter(typeFilter, textFilter) {
    // On initialise un tableau vide
    var listIngredients = [];
    var listAppareils = [];
    var listUstensils = [];
    var listRecipesResult = [];

    // On vide les precedents resultats
    document.getElementById("recettes-section").innerHTML = "";

    // Pour chaque recette dans "recettes"
    for (var recette of window.recipes) {

        if (typeFilter == 'ingredients') {
            recette.ingredients.forEach((ingredientEnCoursDeLecture) => {
                if (ingredientEnCoursDeLecture.ingredient.includes(textFilter)) {
                    addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
                    listRecipesResult.push(recette);
                }
            });

        } else if (typeFilter == 'appareils' && recette.appliance.includes(textFilter)) {
            addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
            listRecipesResult.push(recette);
        } else if (typeFilter == 'ustensils' && recette.ustensils.includes(textFilter.toLowerCase())) {
            addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
            listRecipesResult.push(recette);
        }

    }
    // On formatte les donnees des liste
    listIngredients = listIngredients.map(ingredientName => upperCaseFirstLetter(ingredientName));
    listAppareils = listAppareils.map(appareilName => upperCaseFirstLetter(appareilName));
    listUstensils = listUstensils.map(ustensilName => upperCaseFirstLetter(ustensilName));

    // Supprimer les doublons
    listIngredients = [...new Set(listIngredients)];
    listAppareils = [...new Set(listAppareils)];
    listUstensils = [...new Set(listUstensils)];

    // Pour chaque elements des listes, on les ajoute a la liste deroulantes associée
    cleanElementToDropdown('ingredients');
    cleanElementToDropdown('appareils');
    cleanElementToDropdown('ustensils');
    listIngredients.map(ingredientName => addElementToDropdown(ingredientName, 'ingredients'));
    listAppareils.map(appareilName => addElementToDropdown(appareilName, 'appareils'));
    listUstensils.map(ustensilName => addElementToDropdown(ustensilName, 'ustensils'));

    //on ajoute les recettes, ingredients, apparaiels et ustensils dans le global
    window.recipes = listRecipesResult;
    window.ingredients = listIngredients;
    window.appareils = listAppareils;
    window.ustensils = listUstensils;
}

/**
 * Affiche une recette sur le site et ajoutes ses ingredients, appareils et ustensils aux filtres.
 * @param {*} recette 
 * @param {*} listIngredients 
 * @param {*} listAppareils 
 * @param {*} listUstensils 
 */
function addRecipeToResult(recette, listIngredients, listAppareils, listUstensils) {
    // Pour chaque ingredient du tableau ingredients de la recette en cours de lecture
    recette.ingredients.forEach((ingredientEnCoursDeLecture) => {
        // On ajoute la propriete ingredient de l'ogjet ingredient a la liste des ingredients
        listIngredients.push(ingredientEnCoursDeLecture.ingredient);
    });

    // On ajoute les ustensils de la recette comme pour les ingredients 
    recette.ustensils.forEach((ustensilDeLaRecetteEnCoursDeLecture) => {
        listUstensils.push(ustensilDeLaRecetteEnCoursDeLecture);
    });

    // On ajoute l'appareil de la recette dans le tableau des appareils
    listAppareils.push(recette.appliance);

    //Enfin, on genere le code html du bloc recette
    generateHtmlRecette(recette);

}