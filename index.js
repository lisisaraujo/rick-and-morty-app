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
let maxPage;
let page = 1;
let searchQuery = "";

fetchDataAndRender();
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  searchQuery = Object.fromEntries(formData).query;

  if (!searchQuery) {
    page = 1;
  }
  cardContainer.innerHTML = "";
  fetchDataAndRender();
});

async function fetchDataAndRender() {
  try {
    cardContainer.innerHTML = "";
    let response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );
    const data = await response.json();
    maxPage = data.info.pages;
    const results = data.results;
    pagination.textContent = `${page} / ${maxPage}`;
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

// Next Page Button

nextButton.addEventListener("click", (event) => {
  event.preventDefault();

  pagination.textContent = `${page++} / ${maxPage}`;

  if (page >= maxPage) {
    page = maxPage;
  }
  if (page <= 0) {
    page = 1;
  }
  fetchDataAndRender();
});

// Previous Page Button

prevButton.addEventListener("click", (event) => {
  event.preventDefault();

  pagination.textContent = `${page--} / ${maxPage}`;
  if (page >= maxPage) {
    page = maxPage;
  }
  if (page <= 0) {
    page = 1;
  }
  fetchDataAndRender();
});
