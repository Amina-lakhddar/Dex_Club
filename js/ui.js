// =============================================================
// ui.js — fonctions d'AFFICHAGE
// Elles reçoivent des données et modifient la page. Elles ne changent jamais les données.
// Utilisez createElement, textContent, classList, setAttribute / dataset, append.
// (Pas de innerHTML avec des données : seulement innerHTML = "" pour vider une zone.)
// =============================================================

const typesBox = document.querySelector("#types");
const grid = document.querySelector("#grid");
const count = document.querySelector("#count");
const detail = document.querySelector("#detail");
const cartList = document.querySelector("#cart-list");
const cartCountEl = document.querySelector("#cart-count");
const cartTotalEl = document.querySelector("#cart-total");
const statsBox = document.querySelector("#stats");

// -------------------------------------------------------------
// Petites aides (déjà écrites, utilisez-les)
// -------------------------------------------------------------

/** 1 → "#001" */
export const formatNumero = (id) => "#" + String(id).padStart(3, "0");

/** 12 → "12 DH" */
export const formatPrix = (prix) => prix + " DH";

/** "Électrik" → "type-electrik" (la classe CSS de couleur du type) */
export const typeClass = (type) =>
  "type-" + type.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Crée un élément avec une classe et un texte : el("p", "card__num", "#001") */
export function el(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

// -------------------------------------------------------------
// PALIER 1
// -------------------------------------------------------------

/**
 * Affiche les boutons de type dans #types.
 * counts = { Feu: 3, Eau: 3, … } (résultat de countByType) ; activeType = "Tous" ou un type.
 * Modèle d'un bouton :
 *   <button class="type-btn is-active" type="button" data-type="Feu">Feu (3)</button>
 * Le premier bouton est « Tous (12) » avec data-type="Tous" (12 = la somme des compteurs).
 * Seul le bouton du type actif a la classe is-active.
 */
export function renderTypes(counts, activeType) {
  // TODO 1. Videz #types
  typesBox.innerHTML = "";
  // TODO 2. Créez le bouton « Tous (…) »
  let btn_tous = document.createElement("button");
  btn_tous.classList.add("type-btn");
  if (activeType === "Tous") {
    btn_tous.classList.add("is-active");
  }
  btn_tous.type = "button";
  btn_tous.dataset.type = "Tous";
  const total = Object.values(counts).reduce((acc, val) => {
    return acc + val
    l
  }, 0)
  btn_tous.textContent = `Tous (${total}))`;
  typesBox.append(btn_tous);
  // TODO 3. Pour chaque type de counts (for...in ou Object.keys), créez un bouton
  for (const type in counts) {
    let btn_type = document.createElement("button");
    btn_type.classList.add("type-btn");
    if (type === activeType) {
      btn_type.classList.add("is-active");
    }
    btn_type.type = "button";
    btn_type.dataset.type = type;
    btn_type.textContent = `${type} (${counts[type]})`;
    typesBox.append(btn_type);
  }
}

/**
 * Affiche le nombre de cartes visibles dans #count : "5 cartes", "1 carte" ou "Aucune carte".
 */
export function renderCount(n) {
  // TODO
}

/**
 * Affiche les cartes dans #grid.
 * list = les cartes à afficher ; cart = le panier (pour la classe is-selected, palier 2).
 * Si list est vide : un <p class="empty">Aucune carte trouvée</p>.
 * Modèle d'une carte :
 *   <article class="card" data-id="1">
 *     <img class="card__img" src="images/emberkit.svg" alt="Emberkit">
 *     <p class="card__num">#001</p>
 *     <h3 class="card__name">Emberkit</h3>
 *     <p class="card__meta"><span class="badge type-feu">Feu</span> <span class="rarity">Commune</span></p>
 *     <p class="card__price">12 DH</p>
 *     <button class="btn btn--primary" type="button" data-add="1">Ajouter</button>
 *   </article>
 * - stock 0 : classe out-of-stock sur l'article ET bouton désactivé (disabled = true)
 * - palier 2 : classe is-selected si la carte est dans le panier (cart.some(...))
 */
export function renderGrid(list, cart) {
  // TODO 1. Videz #grid
  grid.innerHTML = "";
  // TODO 2. Liste vide : ajoutez le message et arrêtez (return)
  if (list.length === 0) {
    let message_erreur = document.createElement("p");
    message_erreur.textContent = "Aucune carte trouvée";
    message_erreur.classList.add("empty");
    grid.append(message_erreur);
    return;
  }
  // TODO 3. Pour chaque carte : créez l'article et ses enfants, puis grid.append(article)
  list.map((item) => {
    let article = document.createElement("article");
    article.classList.add("card");
    article.dataset.id=item.id;


    let image = document.createElement("img");
    image.classList.add("card__img");
    image.src = item.image;
    image.alt = item.nom;



    let card__num = document.createElement("p");
    card__num.classList.add("card__num");
    card__num.textContent = item.id;

    let card__name = document.createElement("h3");
    card__name.classList.add("card__name");
    card__name.textContent = item.nom;


    let card__meta = document.createElement("p");
    card__meta.classList.add("card__meta");


    let type = document.createElement("span");
    type.classList.add("badge", "type-feu");
    type.textContent = item.type;

    let rarity = document.createElement("span");
    rarity.classList.add("rarity");
    rarity.textContent = item.rarete;


    card__meta.append(type);
    card__meta.append(rarity);

    let btn_ajouter = document.createElement("button");
    btn_ajouter.classList.add("btn", "btn--primary");
    btn_ajouter.type = "button";
    btn_ajouter.dataset.add = item.id;
    btn_ajouter.textContent = "Ajouter";


    article.append(image, card__num, card__name, card__meta, btn_ajouter);
    grid.append(article);
    // return article;
    // console.log(article)

  })
}

/**
 * Affiche la fiche d'une carte dans #detail : image, nom (h3), numéro + badge du type,
 * description, puis une liste <dl> : Rareté, Prix, Stock (« Rupture » si 0).
 */
export function renderDetail(card) {
  // TODO
  detail.innerHTML = "";

  let image = document.createElement("img");
  image.src = card.image;


  let nom = document.createElement("h3");
  nom.textContent = card.nom;

  let numero = document.createElement("p");
  numero.textContent =card.numero;

  let type =document.createElement("span");
  type.textContent=card.type;

  let description=document.createElement("p");
  description.textContent=card.description;

  let liste=document.createElement("dl");

  // rareté
  let dt_rarete=document.createElement("dt");
  dt_rarete.textContent="Rareté";

  let dd_rarete=document.createElement("dd");
  dd_rarete.textContent=card.rarete;

  //prix
  let dt_prix=document.createElement("dt");
  dt_prix.textContent="Prix";

  let dd_prix=document.createElement("dd");
  dd_prix.textContent=card.prix

  // Stock
    let dt_stock = document.createElement("dt");
    dt_stock.textContent = "Stock";

    let dd_stock = document.createElement("dd");

    if (card.stock === 0) {
        dd_stock.textContent = "Rupture";
    } else {
        dd_stock.textContent = card.stock;
    }


    liste.append(dt_rarete, dd_rarete, dt_prix, dd_prix, dt_stock, dd_stock);

    detail.append(image, nom, numero, type, description, liste);
}

// -------------------------------------------------------------
// PALIER 2
// -------------------------------------------------------------

/**
 * Affiche le panier.
 * cart = [{ id, quantite }] ; cards = toutes les cartes (pour le nom, le prix, le stock).
 * Modèle d'une ligne :
 *   <li class="cart-line" data-id="1">
 *     <span class="cart-line__name">Emberkit</span>
 *     <button class="btn btn--small" type="button" data-action="minus">−</button>
 *     <span class="cart-line__qty">2</span>
 *     <button class="btn btn--small" type="button" data-action="plus">+</button>
 *     <button class="btn btn--small" type="button" data-action="remove">Retirer</button>
 *   </li>
 * - le bouton + est désactivé quand la quantité atteint le stock
 * - panier vide : <li class="empty">Votre panier est vide</li>
 * - #cart-count : "3 cartes" (ou "1 carte", "0 carte") ; #cart-total : "54 DH"
 *   → total et nbCards sont déjà calculés par main.js (cartTotal et cartCount de cart.js)
 * - pour le nom et le stock d'une ligne, retrouvez la carte dans cards avec find
 */
export function renderCart(cart, cards, total, nbCards) {
  // TODO
}

// -------------------------------------------------------------
// PALIER 3 (bonus)
// -------------------------------------------------------------

/**
 * Affiche les statistiques dans #stats : 4 blocs
 *   <div class="stat"><p class="stat__value">1 234 DH</p><p class="stat__label">Valeur du stock</p></div>
 */
export function renderStats(stats) {
  // TODO
}

/**
 * Affiche les erreurs du formulaire : errors = { nom: "…", prix: "…" }
 * Pour chaque champ (nom, prix, stock) : écrit le message dans [data-error-for="…"]
 * et ajoute ou retire la classe field-error sur le champ #form-….
 */
export function showFormErrors(errors) {
  // TODO
}
