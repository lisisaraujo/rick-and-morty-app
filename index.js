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

// --v-- your code below this line --v--

async function fetchDataAndRender() {
  try {
    cardContainer.innerHTML = "";
    let response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const data = await response.json();
    console.log(data);
    maxPage = data.info.pages;
    // console.log(maxPage);
    const results = data.results;
    // console.log(results);
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
