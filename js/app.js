const container = document.getElementById('container');
const containerProduct = document.getElementById('container-product');

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

    productsResultsEco.forEach((element, index) => {
        // console.log(element.id);        
        if (index <= 50) {
            let output = `
                <div class="col-md-3 mb-3">
                    <div class="boxInner">
                        <div class="image">
                            <img src="${element.thumbnail}" alt="${element.title}">
                        </div>
                        <span class="text">${element.title}</span>
                        <div class="price">$${element.price} mxn</div>                        
                        <a href="#modal" data-toggle="modal" type="button" class="btn btn-outline-info elements-data border-0" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}">
                             <i class="fas fa-eye elements-data" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}"></i>
                        </a>                          
                    <div class="buttonShop">Comprar</div>
                    </div>
                </div>
            `
            container.insertAdjacentHTML('beforeend', output);
        }
    })

    productsResultsSust.forEach((element, index) => {
        // console.log(element.id);
        if (index <= 50) {
            let output = `
                <div class="col-md-3 mb-3">
                    <div class="boxInner">
                        <div class="image">
                            <img src="${element.thumbnail}" alt="${element.title}">
                        </div>
                        <div class="text">${element.title}</div>
                        <div class="price">$${element.price} mxn</div>
                        <a href="#modal" data-toggle="modal" type="button" class="btn btn-outline-info elements-data border-0" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}">
                             <i class="fas fa-eye elements-data" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}"></i>
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
    
    elementsEvents.forEach(button => {                   
        button.addEventListener('click', getInfo);
    })
}

getInfo = (e) => {
    e.preventDefault();  
    
    const img = e.target.dataset.img;
    const title = e.target.dataset.title;
    const rating = e.target.dataset.rating;
    const state = e.target.dataset.state;
    const price = e.target.dataset.price;     
  
    fetch(`https://api.mercadolibre.com//items/${e.target.dataset.id}/description`).then(response => {
        response.json().then(json => {
            const description = json.plain_text;
            paintInfoModal(img, title, rating, state, description, price);
        })
    })
}

paintInfoModal = (img, title, rating, state, description, price) => {
    const containerImg = document.getElementById('image');
    const titleStars = document.getElementById('description-modal');
    const modalBody = document.getElementById('modal-body');

    containerImg.innerHTML = `<img src="${img}" alt="${title}">`;

    titleStars.innerHTML = `
                        <h5 class="modal-title">${title}</h5>
                        <div class="stars">${rating}
                            <i class="fas fa-star"></i>                           
                        </div>         
    `;

    modalBody.innerHTML = `
                        <p>Lugar de origen: ${state}</p>
                        <p>${description}</p>
                        <div class="priceProduct">$ ${price} mxn</div>
    `;
}



