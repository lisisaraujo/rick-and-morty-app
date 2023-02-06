import { CreateCharacterCard } from "./components/card/card.js";
import { CreateSearchBar } from "./components/search-bar/search-bar.js";
import { CreateNav } from "./components/nav/nav.js";
import { CreatePagination } from "./components/nav-pagination/nav-pagination.js";
import { CreateButton } from "./components/nav-button/nav-button.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const main = document.querySelector("main");
const body = document.querySelector("body");

// States
export let maxPage = 42;
export let page = 1;
export let searchQuery = "";

// fetch function

export async function fetchDataAndRender() {
  try {
    cardContainer.innerHTML = "";
    let response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );
    const data = await response.json();
    const results = data.results;
    // pagination.textContent = `${page} / ${maxPage}`;
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
        const newCard = CreateCharacterCard(character);
        cardContainer.append(newCard);
      });
    } else {
      console.error("Bad Response");
    }
  } catch (error) {
    console.error("An Error occurred", error);
  }
}
fetchDataAndRender();

// create navbar
const navBar = CreateNav();
// create pagination
const pagination = CreatePagination(page, maxPage);

// next button
const nextButton = CreateButton("Next", (event) => {
  event.preventDefault();
  page++;

  if (page <= 1) {
    page = 1;
  }
  if (page >= maxPage) {
    page = maxPage;
  }

  pagination.textContent = `${page} / ${maxPage}`;
  fetchDataAndRender();
});

// previous button
const prevButton = CreateButton("Prev", (event) => {
  event.preventDefault();
  page--;

  if (page <= 1) {
    page = 1;
  }
  if (page >= maxPage) {
    page = maxPage;
  }
  pagination.textContent = `${page} / ${maxPage}`; // for page to not exceed 42 and 1 the text content has to be set AFTER the condition is declared.
  fetchDataAndRender();
});

// search bar

// const searchBar = CreateSearchBar((event) => {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   searchQuery = Object.fromEntries(formData).query;
//   if (!searchQuery) {
//     page = 1;
//   }
//   fetchDataAndRender();
// });

const searchBar = CreateSearchBar((event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  searchQuery = Object.fromEntries(formData).query;

  if (!searchQuery) {
    page = 1;
  }
  cardContainer.innerHTML = "";
  fetchDataAndRender();
});

// appending everything

navBar.append(prevButton, pagination, nextButton);
body.append(navBar); // body needed to be selected with querySelector, not "getElementByTagName"
main.prepend(searchBar);
