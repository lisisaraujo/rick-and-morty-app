import { createCharacterCard } from "./components/card/card.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

fetchDataAndRender();

async function fetchDataAndRender() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    const results = data.results;

    if (response.ok) {
      let charArray = results.map((result) => {
        return {
          image: result.image,
          name: result.name,
          status: result.status,
          type: result.type,
          occurences: result.episode.length,
        };
      });
      charArray.forEach((character) => {
        const newCard = createCharacterCard(character);
        cardContainer.append(newCard);
      });
    } else {
      console.error("Bad Response");
    }
  } catch (error) {
    console.error("An Error occurred", error);
  }
}
