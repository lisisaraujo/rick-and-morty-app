const card = document.querySelector('[data-js="card-container"]');

export function createCharacterCard(characters) {
  return (card.innerHTML = `
        <li class="card">
            <div class="card__image-container">
            <img
              class="card__image"
              src="${characters.image}"
              alt="Rick Sanchez"
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <h2 class="card__title">${characters.name}</h2>
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">${characrers.status}</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description">${characters.type}</dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">${characters.location.name}</dd>
            </dl>
          </div>
        </li>`);
}
