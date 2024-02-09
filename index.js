import { characterList, characterName, characterInfo, planetName, planetInfo } from "./constants.js";

async function fetchCharacters() {
  const response = await fetch("https://swapi.dev/api/people/");
  const data = await response.json();
  return data.results;
}

function displayCharacter(character) {
  const name = document.createElement("li");
  name.textContent = character.name;
  characterList.appendChild(name);
  return name;
}

function setupCharacterClick(nameElement, character) {
  nameElement.addEventListener("click", async () => {
    const characterResponse = await fetch(character.url);
    const fullCharacter = await characterResponse.json();

    const planetResponse = await fetch(fullCharacter.homeworld);
    const planet = await planetResponse.json();
    
    characterName.textContent = `${character.name}`;
    characterInfo.appendChild(characterName);

    const height = document.createElement("li");
    height.textContent = `Height: ${fullCharacter.height}`;
    characterInfo.appendChild(height);

    const mass = document.createElement("li");
    mass.textContent = `Mass: ${fullCharacter.mass}`;
    characterInfo.appendChild(mass);

    const hairColor = document.createElement("li");
    hairColor.textContent = `Hair color: ${fullCharacter.hair_color}`;
    characterInfo.appendChild(hairColor);

    const skinColor = document.createElement("li");
    skinColor.textContent = `Skin color: ${fullCharacter.skin_color}`;
    characterInfo.appendChild(skinColor);

    const eyeColor = document.createElement("li");
    eyeColor.textContent = `Eye color: ${fullCharacter.eye_color}`;
    characterInfo.appendChild(eyeColor);

    const birthYear = document.createElement("li");
    birthYear.textContent = `Birth year: ${fullCharacter.birth_year}`;
    characterInfo.appendChild(birthYear);

    const gender = document.createElement("li");
    gender.textContent = `Gender: ${fullCharacter.gender}`;
    characterInfo.appendChild(gender);

    planetName.textContent = `${planet.name}`;
    planetInfo.append(planetName);

    const rotationPeriod = document.createElement("li");
    rotationPeriod.textContent = `Rotation period: ${planet.rotation_period}`;
    planetInfo.appendChild(rotationPeriod);

    const orbitalPeriod = document.createElement("li");
    orbitalPeriod.textContent = `Orbital period: ${planet.orbital_period}`;
    planetInfo.appendChild(orbitalPeriod);

    const diameter = document.createElement("li");
    diameter.textContent = `Diameter: ${planet.diameter}`;
    planetInfo.appendChild(diameter);

    const climate = document.createElement("li");
    climate.textContent = `Climate: ${planet.climate}`;
    planetInfo.appendChild(climate);

    const gravity = document.createElement("li");
    gravity.textContent = `Climate: ${planet.gravity}`;
    planetInfo.appendChild(gravity);

    const terrain = document.createElement("li");
    terrain.textContent = `Climate: ${planet.terrain}`;
    planetInfo.appendChild(terrain);
  });
}

fetchCharacters().then((characters) => {
  characters.forEach((character) => {
    const nameElement = displayCharacter(character);
    setupCharacterClick(nameElement, character);
  });
});

async function fetchPlanets() {
  const response = await fetch("https://swapi.dev/api/planets/");
  const data = await response.json();
  return data.results;
}
