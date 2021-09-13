// Load API data 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
  document.getElementById('search-input').value = '';
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="single-product h-100">
      <div>
        <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p class="text-primary">Category: ${product.category}</p>
      <h2 class="fw-bold">Price: $${product.price}</h2>
      <h4>Rating Count: ${product.rating.count}<h4>
      <h4>Rating: ${product.rating.rate}<h4>
      <div class="mt-3">
        <button onclick="addToCart(${product.price})"class="btn btn-outline-success">Add to Cart</button>
        <button onclick="detailsButton(${product.id})"class="btn btn-outline-info">Details</button>
      </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Update quantity and call for update price and tax 
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// update rate of products tax and charges
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// single Details Modal function 
const detailsButton = id => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
};

// modals data 
const showDetails = data => {
  const details = document.getElementById('modal');
  details.innerHTML = `
  <div class="single-details-modal" id="details">
        <div class="d-flex align-items-center justify-content-between">
          <img width="180px" src="${data.image}" alt="">
          <div class="ms-3">
            <h5>Name: ${data.title}</h5>
            <h3>Price: $${data.price}</h3>
            <p>${data.description}</p>
          </div>
        </div>
        <button onclick="modalClose()" type="button" class="w-25 btn btn-danger">Close</button>
      </div>
  `;
  document.getElementById('modal').classList.add('modal-active');
}

// Close Modal function 
const modalClose = () => {
  document.getElementById('modal').classList.remove('modal-active');
};