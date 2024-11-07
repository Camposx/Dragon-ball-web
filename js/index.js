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
        <div class="card charCard" style="width: 400px; height: 400px">
            <div class="row g-0">
                <div class="col-6 d-flex align-items-center justify-content-center">
                    <img src="${image}" class="img-fluid rounded-start" alt="${name}">
                </div>
                <div class="col-6">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-title">Ki:</h6>
                        <h6 class="card-title">${ki}</h6>
                        <h6 class="card-title">MaxKi:</h6>
                        <h6 class="card-title">${maxKi}</h6>
                        <p class="card-text"><small >${gender}</small></p>
                        <p class="card-text"><small >${race}</small></p>
                        <p class="card-text"><small >${affiliation}</small></p>
                    </div>
                </div>
            </div>
        </div>
    `
}

function createPlanetCard({name, isDestroyed, description, image}){
    if(isDestroyed){
        isDestroyed = "Destroyed";
    }
    if(!isDestroyed){
        isDestroyed = "Not Destroyed";
    }
    return `

        <div class="card planCard m-3  d-flex" style="max-width: 610px;">
            <img src="${image}" class="card-img" alt="${name}">
            <div class="cardText position-absolute bottom-0 px-4 pt-2">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text"><small>${isDestroyed}</small></p>
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
