/**************************************************** */
/************* LISTES DEROULANTES ******************* */
/**************************************************** */

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
 * Filtre la liste des ingredients
 * 
 * @param {*} searchIngredientValue 
 */
function filterIngredientBySearch(searchIngredientValue) {
    // 1. recuperer l'ensemble des ingredients de la liste
    var listIngredients = window.ingredients;
    var listIngredientsFound = [];
    // 2. filter les ingredients de la listes
    listIngredients.forEach((ingredient) => {
        if (ingredient.includes(searchIngredientValue)) {
            listIngredientsFound.push(ingredient);
        }
    });
    // 3. mettre a jour la liste afficher
    cleanElementToDropdown('ingredients');
    listIngredientsFound.map(ingredientName => addElementToDropdown(ingredientName, 'ingredients'));

}

/**
 * Filtre la liste des appareils
 * 
 * @param {*} searchAppareilsValue 
 */
function filterAppareilsBySearch(searchAppareilsValue) {
    var listAppareils = window.appareils;
    var listAppareilsFound = [];
    listAppareils.forEach((appareil) => {
        if (appareil.includes(searchAppareilsValue)) {
            listAppareilsFound.push(appareil);
        }
    });
    cleanElementToDropdown('appareils');
    listAppareilsFound.map(elementName => addElementToDropdown(elementName, 'appareils'));

}

/**
 * Filtre la liste des ustensils
 * 
 * @param {*} searchUstensilesValue 
 */
function filterUstensilsBySearch(searchUstensilsValue) {
    var listUstensils = window.ustensils;
    var listUstensilsFound = [];
    listUstensils.forEach((ustensil) => {
        if (ustensil.includes(searchUstensilsValue)) {
            listUstensilsFound.push(ustensil);
        }
    });
    cleanElementToDropdown('ustensils');
    listUstensilsFound.map(elementName => addElementToDropdown(elementName, 'ustensils'));

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
    divFilter.innerHTML = '<span>' + textFilter + '</span><i class="far fa-times-circle" onclick="deleteFilter(this,' + "'" + textFilter + "'" + ')"></i>';

    //2 j'ajoute mon bloc dans active-filters
    let divActiveFilters = document.getElementById("active-filters");
    divActiveFilters.appendChild(divFilter);

    // Actualise les resultats en avec le filtre ajouté
    let filter = { "type": typeFilter, "name": textFilter };
    if (window.filters === undefined) {
        window.filters = [];
    }
    window.filters.push(filter);

    // actualisation des resulats
    var search = document.getElementById('search-bar').value;
    reloadRecipes(search);

}

/**
 * Supprime le parent de l'element donne.
 * 
 *  @param {*} element 
 */
function deleteFilter(element, nameToDelete) {
    let type = "";
    if (element.parentNode.className.includes('ingredients')) {
        type = 'ingredients';
    } else if (element.parentNode.className.includes('appareils')) {
        type = 'appareils';
    } else if (element.parentNode.className.includes('ustensils')) {
        type = 'ustensils';
    }

    // Suppression du filtres dans la liste des filtres actifs
    window.filters = window.filters.filter(function(filter) {
        return filter.type != type && filter.name != nameToDelete;
    });

    // actualisation des resulats
    var search = document.getElementById('search-bar').value;
    reloadRecipes(search);

    // suppression du bloc avec le filtre sur la page
    element.parentNode.remove();
}



/**************************************************** */
/******************** RECETTES ********************** */
/**************************************************** */
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
    recette.ingredients.forEach((ingredient) => {
        if (ingredient.unit == undefined && ingredient.quantity == undefined) {
            ulIngredients.innerHTML += " <li> <b>" + ingredient.ingredient + " </b></li>";
        } else if (ingredient.unit == undefined) {
            ulIngredients.innerHTML += " <li> <b>" + ingredient.ingredient + " : </b> " + ingredient.quantity + "</li>";
        } else {
            ulIngredients.innerHTML += " <li> <b>" + ingredient.ingredient + " : </b> " + ingredient.quantity + " " + ingredient.unit + "</li>";
        }
    });

    divRecetteContent.appendChild(ulIngredients);
    divRecetteContent.innerHTML += "<p>" + recette.description + "</p>";

    // On ajoute l'article de la recette dansla sectiondes recettes
    let sectionRecette = document.getElementById('recettes-section');
    sectionRecette.appendChild(articleRecette);
}

/**
 * Evenement onkeyup du champs de recherche principale.
 * Si 3 caracters saisient au minimum, filtres les recettes et les filtres.
 * Si champs vide, affiche toutes les recettes.
 * @param {*} value 
 */
function searchRecipes(value) {
    if (value.length > 2) {
        reloadRecipes(value);
    } else if (value.length == 0) {
        reloadRecipes('');
    }
}

/**
 * Recharge les recettes en resultats et met a jour les filtres
 * @param {*} searchValue 
 */
function reloadRecipes(searchValue) {

    // On initialise les variables utiles pour l'algoruthme
    var listIngredients = [];
    var listAppareils = [];
    var listUstensils = [];
    var listRecipesResult = [];
    var flagIsResult = false;
    var messageNoRecipesFound = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    var activeFilters = window.filters;
    var isRecipeOkWithAllFilters = true;
    var isRecipeOkWithCurrentFilter;
    let isAtLeastOneIngredientFound = false;

    // On vide les recettes affichés
    document.getElementById("recettes-section").innerHTML = "";

    // ----------------------------------------- DEBUUGGGGGGGGGGGGGGGGGGGGGGGGGG
    // Fitrage par filtres choisient dans les listes deroulantes
    if (activeFilters != undefined && activeFilters.length > 0) {
        window.filters.forEach((filter) => {
            console.log("Filtre actif : " + filter.name + " - " + filter.type);
        });
    } else {
        console.log("Pas de filtres en cours");
    }
    // ----------------------------------------- DEBUUGGGGGGGGGGGGGGGGGGGGGGGGGG

    // Pour chaque recette dans la liste de toutes les recettes
    recettes.forEach((recette) => {

        // Si on a des filtres (ingrd, ust ou appareil) selectionné, On filtre d'abord par ces filtres
        if (activeFilters != undefined && activeFilters.length > 0) {

            // On part du principe que la recette passe tous les filtres
            isRecipeOkWithAllFilters = true;
            // Mais on dit que pour l'intant, le premier filtre ne passent pas car il n'a pas encore été testé.
            // Si isRecipeOkWithCurrentFilter passe a true, cela veut dire que la recette passe le filtre
            // Si il reste a false, la recette n'as pas passé le filtre
            isRecipeOkWithCurrentFilter = false;

            // Pour chaque filtre, on regarde si la recette correspond 
            window.filters.forEach((filter) => {

                // Tant que la recette passe les filtres :
                if (isRecipeOkWithAllFilters) {
                    // On teste le filtre en cours dans boucle
                    // Si c'est un filtre sur un ingredient :
                    if (filter.type == 'ingredients') {

                        // Des qu'un ingredient match avec le filtre, on dit isRecipeOkWithCurrentFilter = true
                        for (var ingredientEnCoursDeLecture of recette.ingredients) {
                            isRecipeOkWithCurrentFilter = false;
                            if (ingredientEnCoursDeLecture.ingredient.toLowerCase() === filter.name.toLowerCase()) {
                                isRecipeOkWithCurrentFilter = true;
                                if (searchValue != "" && ingredientEnCoursDeLecture.ingredient.includes(searchValue)) {
                                    isAtLeastOneIngredientFound = true;
                                }
                                break;
                            }
                        }
                    }
                    // Si c'est un filtre sur un appareil :
                    else if (filter.type == 'appareils') {
                        isRecipeOkWithCurrentFilter = false;
                        if (recette.appliance.toLowerCase() === filter.name.toLowerCase()) {
                            isRecipeOkWithCurrentFilter = true;
                        }
                    }
                    // Si c'est un filtre sur un ustensil :
                    else if (filter.type == 'ustensils') {

                        // Des qu'un ustensil match avec le filtre, on dit isRecipeOkWithCurrentFilter = true
                        for (var ustensil of recette.ustensils) {
                            isRecipeOkWithCurrentFilter = false;
                            if (ustensil.toLowerCase() === filter.name.toLowerCase()) {
                                isRecipeOkWithCurrentFilter = true;
                                break;
                            }
                        }
                    }

                    // Si le filtre en cours dans boucle n'est pas passé, 
                    // on dit que la recette ne passe pas les filtres.
                    if (!isRecipeOkWithCurrentFilter) {
                        isRecipeOkWithAllFilters = false;
                    }
                }

            });

        }

        // Si pas de filtres actif, on declare la recette OK quoiqu'il arrive
        else {
            isRecipeOkWithAllFilters = true;
        }

        // Si la recette à reussie à passer tous les filtres :
        if (isRecipeOkWithAllFilters) {
            // On regarde maintenant si l'use a tapé qlqchose dans la barre de recherche
            // Si il a saisi qlqchoqe, on regarde si la recette correspond a la recherche du user
            if (searchValue != "") {
                if (recette.name.includes(searchValue)) {
                    addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
                    listRecipesResult.push(recette);
                    flagIsResult = true;
                } else if (recette.description.includes(searchValue)) {
                    addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
                    listRecipesResult.push(recette);
                    flagIsResult = true;
                } else if (isAtLeastOneIngredientFound) {
                    addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
                    listRecipesResult.push(recette);
                    flagIsResult = true;
                }
            }
            // Sinon, si champs de recherche vide, on ajoute la recette quoi qu'il arrive
            else {
                addRecipeToResult(recette, listIngredients, listAppareils, listUstensils);
            }
        }

    });

    // Si j'ai au moins une recette en resultat ou pas de mot rechercher
    if (flagIsResult || searchValue == "") {

        // On formatte les donnees des listes
        listIngredients = listIngredients.map(ingredientName => upperCaseFirstLetter(ingredientName));
        listAppareils = listAppareils.map(appareilName => upperCaseFirstLetter(appareilName));
        listUstensils = listUstensils.map(ustensilName => upperCaseFirstLetter(ustensilName));

        // Ensuite, on supprimer les doublons
        listIngredients = [...new Set(listIngredients)];
        listAppareils = [...new Set(listAppareils)];
        listUstensils = [...new Set(listUstensils)];

        // On vide les listes deroulantes avecce qu'elles contenaient
        cleanElementToDropdown('ingredients');
        cleanElementToDropdown('appareils');
        cleanElementToDropdown('ustensils');
        // Ensuite, on les remplis avec uniquement les elements des recettes trouvées en résultats
        listIngredients.map(ingredientName => addElementToDropdown(ingredientName, 'ingredients'));
        listAppareils.map(appareilName => addElementToDropdown(appareilName, 'appareils'));
        listUstensils.map(ustensilName => addElementToDropdown(ustensilName, 'ustensils'));

        //on ajoute les recettes, ingredients, apparaiels et ustensils dans le global pour que ce soit accessible dans les autres fonctions
        window.recipes = listRecipesResult;
        window.ingredients = listIngredients;
        window.appareils = listAppareils;
        window.ustensils = listUstensils;
    }
    // Si pas de resultat, on affiche le message l'indiquant
    else {
        document.getElementById("recettes-section").innerHTML = "<h2>" + messageNoRecipesFound + "</h2>";
    }
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




/**************************************************** */
/*********************** UTILS ********************** */
/**************************************************** */
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