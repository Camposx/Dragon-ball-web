const requestPlanetsUrl = "https://dragonball-api.com/api/planets?limit=0";
const requestCharactersUrl = "https://dragonball-api.com/api/characters?limit=58";

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
        <div class="card mb-3 charCard" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="${image}" class="img-fluid rounded-start" alt="${name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-title">Ki: ${ki}</h6>
                        <h6 class="card-title">MaxKi: ${maxKi}</h6>
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
const planetSection = document.getElementById('planetSection');

async function displayJson(jsonData, section, dataCard){
    
    if(jsonData && jsonData.items){
        const card = jsonData.items.map(dataCard).join("");
        section.innerHTML = card;
    }
    else{
        section.innerHTML = `<p> Json data couldn't load </p>`;
    }
}
async function display(){

    if(planetSection){
        const planetData = await fetchApiJson(requestPlanetsUrl);
        displayJson(planetData, planetSection, createPlanetCard);
    }
    if(characterSection){
        const characterData = await fetchApiJson(requestCharactersUrl);
        displayJson(characterData, characterSection, createCharacterCard);
    }
}
display();
