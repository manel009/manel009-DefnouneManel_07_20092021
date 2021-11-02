// On initialise un tableau vide
var listIngredients = [];
var listAppareils = [];
var listUstensils = [];


// Pour chaque ligne dans recettes, on recupere sa position et son contenu (ici une recette)
for (var recette of recettes) {

    // Pour la recette en cours de lecture, on recuperes ses ingredients et on les met dans ingredientsDeLaRecetteEnCours
    let ingredientsDeLaRecetteEnCoursDeLecture = recette.ingredients;
    let appareilDeLaRecetteEnCoursDeLecture = recette.appliance;
    let ustensilsDeLaRecetteEnCoursDeLecture = recette.ustensils;

    // Pour chaque ingredient de la recette
    ingredientsDeLaRecetteEnCoursDeLecture.forEach((ingredientEnCoursDeLecture) => {
        // On ajoute l'ingredient  a la liste des ingredients
        listIngredients.push(ingredientEnCoursDeLecture.ingredient);
    });

    // On ajoute l'appareil et les ustensils de la recette a la liste des appareils
    listAppareils.push(appareilDeLaRecetteEnCoursDeLecture);
    ustensilsDeLaRecetteEnCoursDeLecture.forEach((ustensilDeLaRecetteEnCoursDeLecture) => {
        listUstensils.push(ustensilDeLaRecetteEnCoursDeLecture);
    });

    //on genere le html du bloc recette
    generateHtmlRecette(recette);

}

// Supprimer les doublons