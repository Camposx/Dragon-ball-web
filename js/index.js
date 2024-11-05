const requestPlanetsUrl = "https://dragonball-api.com/api/planets";
const requestCharactersUrl = "https://dragonball-api.com/api/characters";

async function fetchApiJson(requestUrl){
    try{
        const response = await fetch(requestUrl);
        if(!response.ok){
            throw new Error(`An error occured. Json request failed ${response.status}.`)
        }
        return await response.json();
    }
    catch(error){
        console.error('An error occured. Null Json', error);
        return null;
    }
}

function createCharacterCard({name, ki, maxKi, race, gender, description, image, affiliation}){
    return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${image}" class="img-fluid rounded-start" alt="${name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-title">${ki}, ${maxKi}</h6>
                        <p class="card-text">${description}</p>
                        <p class="card-text"><small class="text-body-secondary">${gender}</small></p>
                        <p class="card-text"><small class="text-body-secondary">${race}</small></p>
                        <p class="card-text"><small class="text-body-secondary">${affiliation}</small></p>
                    </div>
                </div>
            </div>
        </div>
    `
}

function createPlanetCard({name, isDestroyed, description, image}){
    return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${image}" class="img-fluid rounded-start" alt="${name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-title">${isDestroyed}</h6>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}
const characterSection = document.getElementById('characterSection');

async function displayCharacters(){
    const characterInfo = await fetchApiJson(requestCharactersUrl);

    if(characterInfo && characterInfo.items){
        const characterCard = characterInfo.items.map(createCharacterCard).join();
        characterSection.innerHTML = characterCard;
    }
    else{
        characterSection.innerHTML = `<p> Json characters couldn't load </p>`;
    }
}

const planetSection = document.getElementById('planetSection');

async function displayPlanets(){
    const planetInfo = await fetchApiJson(requestPlanetsUrl);

    if(planetInfo && planetInfo.items){
        const planetCard = planetInfo.items.map(createPlanetCard).join();
        planetSection.innerHTML = planetCard;
    }
    else{
        planetSection.innerHTML = `<p> Json planets couldn't load </p>`;
    }
}

if(planetSection){
    displayPlanets();
}
if(characterSection){
    displayCharacters();
}

