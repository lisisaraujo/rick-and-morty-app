import { createCharacterCard } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { createNav } from "./components/nav/nav.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { createButton } from "./components/nav-button/nav-button.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
/*const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);*/
const main = document.querySelector("main");
//const body = document.getElementsByTagName("body");
//const searchBar = document.querySelector('[data-js="search-bar"]');
//const prevButton = document.querySelector('[data-js="button-prev"]');
//const nextButton = document.querySelector('[data-js="button-next"]');
//const pagination = document.querySelector('[data-js="pagination"]');

// States
export let maxPage = 42;
export let page = 1;
export let searchQuery = "";

const navBar = createNav();
const pagination = createPagination(page, maxPage);
const nextButton = createButton("Next", () => {
  page++;
  pagination.textContent = `${page} / ${maxPage}`;
  if (page >= maxPage) {
    page = maxPage;
  }
  if (page <= 0) {
    page = 1;
  }
  fetchDataAndRender();
});
const prevButton = createButton("Prev", (event) => {
  event.preventDefault();
  page--;
  pagination.textContent = `${page} / ${maxPage}`;
  if (page >= maxPage) {
    page = maxPage;
  }
  if (page <= 0) {
    page = 1;
  }
  fetchDataAndRender();
});
const searchBar = createSearchBar((event) => {
  const cardContainer = document.querySelector('[data-js="card-container"]');

  event.preventDefault();
  const formData = new FormData(event.target);
  searchQuery = Object.fromEntries(formData).query;

  if (!searchQuery) {
    page = 1;
  }
  cardContainer.innerHTML = "";
  fetchDataAndRender();
});
navBar.append(prevButton, pagination, nextButton);
document.body.appendChild(navBar);
main.append(searchBar);
fetchDataAndRender();

export async function fetchDataAndRender() {
  try {
    cardContainer.innerHTML = "";
    let response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );
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
