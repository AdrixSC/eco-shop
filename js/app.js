const container = document.getElementById('container');
const containerAll = document.getElementById("container-all")
window.addEventListener('load', () => {
    getJson();
})

getJson = (e) => {
    // limpiar contenedor de productos

    fetch(`https://api.mercadolibre.com/sites/MLM/search?q=ecologico`)
        .then(response => {
            response.json().then(json => {
                fetch('https://api.mercadolibre.com/sites/MLM/search?q=sustentable').then(response => {
                    response.json().then(Json => {
                        paintDataJson(json, Json);
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
    const productsData = localStorage.setItem('products', JSON.stringify(products));

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
                        <div data-id="${element.id}" class="buttonShop">Agregar a carrito</div>
                </div>
            `
        container.insertAdjacentHTML('beforeend', output);
    })
    let elementsData = document.getElementsByClassName('elements-data');
    elementEvent(elementsData);
    let buttonAddCart = document.getElementsByClassName('buttonShop');
    converToArray(buttonAddCart);


}

let searchInput = document.getElementById('search-products');

filterProducts = () => {
    let data = JSON.parse(localStorage.getItem('products'));
    //console.log(data);
    let inputValue = searchInput.value.toLowerCase();
    //console.log(inputValue);
    let prueba = data.filter(prodctF => {
        return prodctF.title.toLowerCase().indexOf(inputValue) >= 0
    });
    console.log(prueba);
    paintProducsFilters(prueba)

}
searchInput.addEventListener('keyup', filterProducts);

paintProducsFilters = (prueba) => {

    container.innerText = '';
    prueba.forEach(producSelected => {

        let templateFilters = `
                <div class="col-md-3 mb-3">
                    <div class="boxInner">
                        <div class="image">
                            <img src="${producSelected.thumbnail}" alt="${producSelected.title}">
                        </div>
                        <div class="text elements-data">${producSelected.title}</div>
                        <div class="price">$${producSelected.price} mxn</div>
                        <a href="#modal" data-toggle="modal" class="elements-data" data-price="${producSelected.price}" data-title="${producSelected.title}" data-img="${producSelected.thumbnail}" data-id="${producSelected.id}" data-rating="${producSelected.reviews.rating_average}" data-state="${producSelected.address.state_name}">
                            <img id="eye" src="assets/images/eye.png" class="elements-data border border-info rounded-circle p-1 mb-1" data-price="${producSelected.price}" data-title="${producSelected.title}" data-img="${producSelected.thumbnail}" data-id="${producSelected.id}" data-rating="${producSelected.reviews.rating_average}" data-state="${producSelected.address.state_name}">
                        </a>
                        <div data-id"${producSelected.id}" class="buttonShop">Agregar a carrito</div>
                </div>
            `
        container.insertAdjacentHTML('beforeend', templateFilters);
    })
    let elementsData = document.getElementsByClassName('elements-data');
    elementEvent(elementsData);
    let buttonAddCart = document.getElementsByClassName('buttonShop');
    converToArray(buttonAddCart);
}

converToArray = (buttonAddCart) => {
    let addItemsId = Array.from(buttonAddCart);
    addItemsId.forEach(item => {
        item.addEventListener('click', chageButtonStatus);
    })

}

chageButtonStatus = (e) => {
    const button = e.target;

    if (button.innerText == 'Agregar a carrito') {
        addCounter();
        addItems(button);
        button.innerText = 'Quitar del carrito';
        button.style.backgroundColor = '#35B729';
    } else {
        removeCounter();
        removeItems(button);
        button.innerText = 'Agregar a carrito';
        button.style.backgroundColor = '#0c4d6c';
        button.style
    }
}

const arrayCart = [];
addItems = (button) => {
    arrayCart.push(button.dataset.id);
}

removeItems = (button) => {
    const indexDelete = arrayCart.indexOf(button.dataset.id);
    arrayCart.splice(indexDelete, 1);
    localStorage.setItem('cart', JSON.stringify(arrayCart));
    filterProducts();
}

filterProducts = (productsSelection) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const data = JSON.parse(localStorage.getItem('products'));

    let products = cart.map(id => {
        return data.find(element => {
            return element.id === id;
        });
    });
    localStorage.setItem('order', JSON.stringify(products));
    // console.log(JSON.parse(localStorage.getItem('order')));
    paintOrder();
}

const containerOrder = document.getElementById('container-cart');

const priceArray = [];
paintOrder = () => {
    const order = JSON.parse(localStorage.getItem('order'));
    containerOrder.innerHTML = "";
    order.forEach(element => {
        let output = `
            <div class="row boxGeneral">
                <div class="col-md-6">
                    <div class="imageProduct">
                        <img src="${element.thumbnail}" alt="${element.title}">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="titleProduct">${element.title}</div>
                    <div class="priceProduct">$<span class="sumProduct">${element.price}</span></div>

                </div>
            </div>
        `;
    containerOrder.insertAdjacentHTML('beforeend', output);
    localStorage.setItem('price', JSON)
    });

    const price = document.getElementsByClassName('sumProduct');
    priceTotal(price);
}
/////////abi

priceTotal = (price) => {
    const priceArray = Array.from(price);
    let total2 = priceArray.map(element => parseInt(element.innerText));
    let total3 = total2.reduce((a,b) => a + b)
    console.log(total3);

    let template2 = `
      <div class="price-style">Total a pagar:$${total3}</div>
      `;
      containerOrder.insertAdjacentHTML('beforeend', template2);
      getPayPal(total3);


}
//////   comienza lo de paypal   ///////////////////////////////////////////////////////////////////7
 getPayPal = (total3) => {
   paypal.Button.render({

              env: 'sandbox', // sandbox | production

              // PayPal Client IDs - replace with your own
              // Create a PayPal app: https://developer.paypal.com/developer/applications/create
              client: {
                  sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                  production: 'Ac2b_qAucwEeMyFHqI9PXqpTrg1Dv5wThMV3lfLXFSuNg3NBJj3eMuRzOgXTPtkDLRGFGGBX61M_Kuw_'
              },

              // Show the buyer a 'Pay Now' button in the checkout flow
              commit: true,

              // payment() is called when the button is clicked
              payment: function(data, actions) {

                  // Make a call to the REST api to create the payment
                  return actions.payment.create({
                      payment: {
                          transactions: [
                              {
                                  amount: { total: `${total3}`, currency: 'MXN' }
                              }
                          ]
                      }
                  });
              },

              // onAuthorize() is called when the buyer approves the payment
              onAuthorize: function(data, actions) {

                  // Make a call to the REST api to execute the payment
                  return actions.payment.execute().then(function() {
                      window.alert('Payment Complete!');
                  });
              }

          }, '#paypal-button-container');
}


/////
addCounter = () => {
    let counterItems = parseInt(document.getElementById('counter-items').innerText);
    let counter = document.getElementById('counter-items');
    counterItems += 1;
    counter.innerHTML = counterItems;
}

removeCounter = () => {
    let counterItems = parseInt(document.getElementById('counter-items').innerText);
    let counter = document.getElementById('counter-items');
    counterItems -= 1
    counter.innerHTML = counterItems;
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
                        <h5 class="modal-title color-blue">${dataSet.title}</h5>
                        <div class="stars font-weight-bold">${dataSet.rating}
                            <i class="color-blue fas fa-star"></i>
                        </div>
    `;
    modalBody.innerHTML = `
                        <p>Lugar de origen: ${dataSet.state}</p>
                        <p>${description}</p>
                        <div class="color-blue priceProduct text-center font-weight-bold">$ ${dataSet.price} mxn</div>
    `;
}


const containerCart = document.getElementById("container-cart");
const containerCard = document.getElementById("container-card");

showSectionCart = (e) => {
    containerCart.classList.remove("d-none");
    containerCart.classList.add("d-block");
    containerCard.classList.remove("d-block");
    containerCard.classList.add("d-none");
};

showSectionProduct = (e) => {
    containerCart.classList.remove("d-block");
    containerCart.classList.add("d-none");
    containerCard.classList.remove("d-none");
    containerCard.classList.add("d-block");
}


let shop = document.getElementById("shop").addEventListener("click", showSectionProduct);

cartList = () => {
    document.getElementById("image-cart").addEventListener("click", showSectionCart);
    document.getElementById("image-cart").addEventListener("click", paintOrder);
}

cartList();


const containerMenu = document.getElementById("container-menu");
const containerInput = document.getElementById("container-input");

showInput = (e) => {
    containerInput.classList.remove("d-none");
    containerInput.classList.add("d-block");
};

showMenu = (e) => {
    containerInput.classList.remove("d-block");
    containerInput.classList.add("d-none");
};

let btnSearch = document.getElementById("btn-search").addEventListener("click", showInput);

btn = () => {
    document.getElementById("close-input").addEventListener("click", showMenu);
    document.getElementById("close-input").addEventListener("click", getJson);
}

btn();
