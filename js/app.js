

//Add the car
const addProducts = document.getElementById('products');

 addCar = ()=> {
    e.preventDefaul();
     
    if(e.target.classList.contains('add-car')){
         const product = e.target.parentElement.parentElement;


    }
}

addProductsCar = (addProducts)=>{
    

}


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
    const products = json.results.concat(Json.results);    

    products.forEach(element => {    

            let output = `
                <div class="col-md-3 mb-3">
                    <div class="boxInner">
                        <div class="image">
                            <img src="${element.thumbnail}" alt="${element.title}">
                        </div>
                        <div class="text elements-data">${element.title}</div>
                        <div class="price">$${element.price} mxn</div> 
                        <a href="#modal" data-toggle="modal" class="elements-data" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}"> 
                            <img id="eye" src="assets/images/eye.png" class="elements-data border border-info rounded-circle p-1 mb-1" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}">                    
                        </a>
                        <div class="buttonShop">Comprar</div>                   
                </div>
            `   
            container.insertAdjacentHTML('beforeend', output);        
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
    const dataSet = e.target.dataset;

    fetch(`https://api.mercadolibre.com//items/${e.target.dataset.id}/description`).then(response => {
        response.json().then(json => {
            const description = json.plain_text;
            paintInfoModal(dataSet, description);
        })
    })
}

paintInfoModal = (dataSet, description) => {
    const containerImg = document.getElementById('image');
    const titleStars = document.getElementById('description-modal');
    const modalBody = document.getElementById('modal-body');

    containerImg.innerHTML = `<img src="${dataSet.img}" alt="${dataSet.title}">`;

    titleStars.innerHTML = `
                        <h5 class="modal-title">${dataSet.title}</h5>
                        <div class="stars">${dataSet.rating}
                            <i class="fas fa-star"></i>                           
                        </div>         
    `;

    modalBody.innerHTML = `
                        <p>Lugar de origen: ${dataSet.state}</p>
                        <p>${description}</p>
                        <div class="priceProduct">$ ${dataSet.price} mxn</div>
    `;

}

const containerCart = document.getElementById("container-cart");
const containerCard = document.getElementById("container-card");

showSectionCart = (e) => {
    console.log(containerCart.classList.contains("d-none"))
    if (containerCart.classList.contains("d-none") && containerCard.classList.contains("d-block")){
        containerCart.classList.remove("d-none");
        containerCard.classList.remove("d-block");
        containerCard.classList.add("d-none");
    } else {
        containerCart.classList.remove("d-block");
        containerCard.classList.remove("d-none");
        containerCard.classList.add("d-block");
    }
};

let cart = document.getElementById("image-cart")
cart.addEventListener("click", showSectionCart);

showSectionShop = (e) => {
    console.log("si entra")
    console.log("cart", containerCart.classList.contains("d-none"))
    console.log("card", containerCard.classList.contains("d-none"))
    if (containerCart.classList.contains("d-none") == false && containerCard.classList.contains("d-none") == true){
        containerCart.classList.remove("d-none");
        containerCard.classList.remove("d-none");
        containerCard.classList.add("d-block");
    };
};

let shop = document.getElementById("shop");
shop.addEventListener("click", showSectionShop)


const containerMenu = document.getElementById("container-menu");
const containerInput = document.getElementById("container-input");

showInput = (e) => {
    if(containerInput.classList.contains("d-none") && containerMenu.classList.contains("d-block")){
        containerInput.classList.remove("d-none");
        containerMenu.classList.remove("d-block");
        containerMenu.classList.add("d-none");
    } else {
        console.log("chido")
        containerInput.classList.remove("d-block");
        containerMenu.classList.remove("d-none");
        containerMenu.classList.add("d-block");
    }
};

let btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", showInput);

showMenu = (e) => {
    containerInput.innerText = "";
    containerInput.innerHTML = `<div id="container-menu" class="container d-block">
    <nav class="row menu">
        <div class="col-md-6">
            <div class="ecommerce">
                <h1><img class="logo" src="assets/images/logo-ecoshop.png" alt="logo"></h1>
                <ul>
                    <a id="shop"><li>Shop</li></a>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
        <div class="col-md-3">
            <div class="itemsNumber">0 ITEMS $0.00</div>
        </div>
        <div class="col-md-2">
            <a id="image-cart"><i class="fas fa-shopping-cart"></i></a>
        </div>
        <div class="col-md-1 search">
            <a id="btn-search"><i class="fas fa-search"></i></a>
            
        </div>
    </nav>
</div>`
    console.log("menu", containerMenu.classList.contains("d-none"));
    console.log("input", containerInput.classList.contains("d-block"))
    /*if(containerMenu.classList.contains("d-none") == true && containerInput.classList.contains("d-block") == false){
        containerMenu.classList.remove("d-none");
        containerMenu.classList.add("d-block");
        containerInput.classList.remove("d-block");
    };*/
};

let btnCloseInput = document.getElementById("close-input");
btnCloseInput.addEventListener("click", showMenu);


