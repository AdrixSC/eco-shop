const container = document.getElementById('container');
window.addEventListener('load', () => {
    getJson();
})


getJson = (e) => {
    fetch(`https://api.mercadolibre.com/sites/MLM/search?q=ecologico`)
        .then(response => {
            response.json().then(json => {
                fetch('https://api.mercadolibre.com/sites/MLM/search?q=sustentable').then(response => {
                    response.json().then(Json => {
                        paintDataJson(json, Json)
                    })
                })
            })
        })
        .catch(error => {
            console.log(error);
        });
}

paintDataJson = (json, Json) => {
    const productsResultsEco = json.results;
    const productsResultsSust = Json.results;
    container.innerHTML = '';

    productsResultsEco.forEach((element, index) => {
        if (index < 25) {
            let output = `
                <div class="col-md-3">
                    <div class="boxInner">
                        <div class="image">
                            <img src="${element.thumbnail}" alt="${element.title}">
                        </div>
                        <div class="text elements-data" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}">${element.title}</div>
                        <div class="price">$${element.price}</div>
                        <a href="#modal" data-toggle="modal">
                            <i class="fas fa-eye"></i>
                        </a>
                    <div class="buttonShop">Comprar</div>
                    </div>
                </div>
            `
            container.insertAdjacentHTML('beforeend', output);
        }
    })

    productsResultsSust.forEach((element, index) => {
        if (index < 25) {
            let output = `
                <div class="col-md-3">
                    <div class="boxInner">
                        <div class="image">
                            <img src="${element.thumbnail}" alt="${element.title}">
                        </div>
                        <div class="text elements-data" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}">${element.title}</div>
                        <div class="price">$${element.price}</div>
                        <a href="product.html">
                            <i class="fas fa-eye"></i>
                        </a>
                    <div class="buttonShop">Comprar</div>
                    </div>
                </div>
            `
            container.insertAdjacentHTML('beforeend', output);
        }
    })

    let elementsData = document.getElementsByClassName('elements-data');
    elementEvent(elementsData);
}

elementEvent = (elementsData) => {
    let elementsEvents = Array.from(elementsData);
    elementsEvents.forEach(title => {
        title.addEventListener('click', getInfo);
    })
}

getInfo = (e) => {
    const ratingElement = e.target.dataset.rating;
    const stateElement = e.target.dataset.state;
    fetch(`https://api.mercadolibre.com//items/${e.target.dataset.id}/description`).then(response => {
        response.json().then(json => {
            const description = json.plain_text;
            paintInfoModal(description, ratingElement, stateElement);
        })
    })
}

paintInfoModal = (description, ratingElement, stateElement) => {
    console.log(description, ratingElement, stateElement);
}