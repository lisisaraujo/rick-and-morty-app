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

// --v-- your code below this line --v--

async function fetchDataAndRender() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    const results = data.results;
    console.log(results);
    if (response.ok) {
      results.forEach((character) => {
        console.log(character);
        // const newCards = Card(character);
        // renderElement(newCards);
        let characterArr = [results];
        console.log(characterArr);
      });

      // return data;
    } else {
      console.error("Bad Response");
    }
  } catch (error) {
    console.error("An Error occurred");
  }
}
