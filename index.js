import {
  characterList,
  characterName,
  characterInfo,
  planetName,
  planetInfo,
  nextButton,
  prevButton,
  loaderDetails,
  listCharacters,
} from "./constants.js";

const totalPages = 9;

const fetchCharacters = async () => {
  renderLoading(true);

  try {
    const page = getPageFromQueryParams();

    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    if (response.status !== 200) {
      throw new Error("Cannot fetch the data");
    }
    const data = await response.json();

    displayCharactersList(data.results);

    return data.results;
  } catch (error) {
    renderLoading(false, true);
    console.error("Error fetching data:", error.message);
    throw error;
  } finally {
    renderLoading(false);
  }
};

function displayCharactersList(characters) {
  characterList.innerHTML = "";
  characters.forEach((character) => {
    const nameElement = displayCharacter(character);
    setupCharacterClick(nameElement, character);
  });
}

function displayCharacter(character) {
  const name = document.createElement("li");
  name.textContent = character.name;
  characterList.appendChild(name);
  return name;
}

function setupCharacterClick(nameElement, character) {
  nameElement.addEventListener("click", async () => {
    characterInfo.innerHTML = "";
    planetInfo.innerHTML = "";

    if (characterInfo.innerHTML === "") {
      const fullCharacter = await fetchCharacterDetails(character.url);
      const planet = await fetchCharacterHomeworld(fullCharacter.homeworld);

      displayCharacterInfo(fullCharacter);
      displayPlanetInfo(planet);
    }
  });
}

async function fetchCharacterDetails(url) {
  renderLoading(true, false, true);

  const characterResponse = await fetch(url);

  renderLoading(false, false, true);

  return characterResponse.json();
}

async function fetchCharacterHomeworld(url) {
  const planetResponse = await fetch(url);
  return planetResponse.json();
}

function displayCharacterInfo(character) {
  characterName.textContent = `${character.name}`;
  characterInfo.appendChild(characterName);

  displayCharacterAttribute("Height", character.height);
  displayCharacterAttribute("Mass", character.mass);
  displayCharacterAttribute("Hair color", character.hair_color);
  displayCharacterAttribute("Skin color", character.skin_color);
  displayCharacterAttribute("Eye color", character.eye_color);
  displayCharacterAttribute("Birth year", character.birth_year);
  displayCharacterAttribute("Gender", character.gender);
}

function displayCharacterAttribute(attribute, value) {
  const attributeElement = document.createElement("li");
  attributeElement.textContent = `${attribute}: ${value}`;
  characterInfo.appendChild(attributeElement);
}

function displayPlanetInfo(planet) {
  planetName.textContent = `${planet.name}`;
  planetInfo.append(planetName);

  displayPlanetAttribute("Rotation period", planet.rotation_period);
  displayPlanetAttribute("Orbital period", planet.orbital_period);
  displayPlanetAttribute("Diameter", planet.diameter);
  displayPlanetAttribute("Climate", planet.climate);
  displayPlanetAttribute("Gravity", planet.gravity);
  displayPlanetAttribute("Terrain", planet.terrain);
}

function displayPlanetAttribute(attribute, value) {
  const attributeElement = document.createElement("li");
  attributeElement.textContent = `${attribute}: ${value}`;
  planetInfo.appendChild(attributeElement);
}

function setPage(page) {
  let url = new URL(window.location.href);
  url.searchParams.set("page", page);

  const path = url.toString();
  window.history.pushState({ path: path }, "", path);

  fetchCharacters();
}

function getPageFromQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page");

  return page ? parseInt(page) : 1;
}

nextButton.addEventListener("click", () => {
  const currentPage = getPageFromQueryParams();

  if (currentPage < totalPages) {
    setPage(currentPage + 1);
  } else {
    showMessage("There are no more pages available.");
  }
});

prevButton.addEventListener("click", () => {
  const currentPage = getPageFromQueryParams();

  if (currentPage > 1) {
    setPage(currentPage - 1);
  } else {
    showMessage("You are already on the first page.");
  }
});

function showMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.style.display = "block";
  setTimeout(() => {
    messageElement.style.display = "none";
  }, 3000);
}

function renderLoading(isLoading, error = false, details = false) {
  const loader = details
    ? document.querySelector("#loader-details")
    : document.querySelector("#loader");

  if (isLoading) {
    loader.classList.add("loader_visible");
    listCharacters.classList.add("character-list_hidden");
  } else {
    loader.classList.remove("loader_visible");
    listCharacters.classList.remove("character-list_hidden");

    if (error) {
      console.error(error.message);
    }
  }
}

fetchCharacters();
