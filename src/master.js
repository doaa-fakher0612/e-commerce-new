cart = document.querySelector(".cart");
counter = document.querySelector(".counter");
ordersMenu = document.querySelector(".ordersMenu");

// counter.innerText = ordersMenu.childElementCount;

cart.onmouseover = function () {
  ordersMenu.style.display = "flex";
};
cart.onmouseout = function () {
  ordersMenu.style.display = "none";
};

let imgCarousel = document.querySelector("#carousel_image");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

let imgs = [
  "./imgs/carousel4.jpg",
  "./imgs/carousel3.jpg",
  "./imgs/carousel2.jpg",
];
console.log("imgCarousel.src ===> ", imgCarousel);
let currentImg = imgs.indexOf(imgCarousel.src);
//console.log(currentImg);

let carouserTimer = setInterval(nextClicked, 2000);

prevBtn.onclick = prevClicked;

function prevClicked() {
  console.log("clicked");
  console.log("imgCarousel.src", imgCarousel.src);
  currentImg--;
  if (currentImg < 0) {
    currentImg = imgs.length - 1;

    imgCarousel.src = imgs[currentImg];
  } else {
    imgCarousel.src = imgs[currentImg];
  }
}

nextBtn.onclick = nextClicked;

function nextClicked() {
  currentImg++;
  if (currentImg == imgs.length) {
    currentImg = 0;
    imgCarousel.src = imgs[currentImg];
  } else {
  }
  imgCarousel.src = imgs[currentImg];
}

// categories list

async function getCategory() {
  let response = await fetch("https://fakestoreapi.com/products/categories");
  // console.log(response);
  let data = await response.json();
  return data;
}
let categoryList = document.querySelector("#category-list");

async function createCategoryList() {
  let categories = await getCategory();

  categories.forEach((category) => {
    let categoryELement = document.createElement("div");
    categoryList.appendChild(categoryELement);
    categoryELement.classList.add(
      "category",
      "break-words",
      "p-3",
      "bg-neutral-200",
      "rounded",
      "hover:text-orange-500",
      "transition",
      "duration-300",
      "cursor-pointer",
    );

    categoryELement.innerText = category;
  });
}
createCategoryList();

// create card function
let cardsContainer = document.querySelector(".cards");
function createCard(arr) {
  arr.forEach((item) => {
    let card = document.createElement("div");
    card.classList.add(
      "card",
      "bg-white",
      "flex",
      "gap-4",
      "flex-col",
      "rounded",
      "p-2",
      "items-start",
      "shadow-lg",
      "break-words",
      "justify-between",
    );
    cardsContainer.appendChild(card);

    let imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv", "w-full", "rounded", "h-2/4", "bg-white");
    card.appendChild(imgDiv);

    let img = document.createElement("img");
    img.classList.add(
      "w-full",
      "rounded",
      "productImg",
      "h-full",
      "object-contain",
    );
    imgDiv.appendChild(img);

    let text = document.createElement("div");
    text.classList.add("flex", "flex-col", "gap-2");
    card.appendChild(text);

    let h1 = document.createElement("h1");
    h1.classList.add("title", "text-2xl", "font-bold");
    text.appendChild(h1);

    let p = document.createElement("p");
    p.classList.add(
      "desc",
      "text-gray-600",
      "text-sm",
      "md:text-base",
      "break-words",
    );
    text.appendChild(p);

    let bottomCard = document.createElement("div");
    bottomCard.classList.add(
      "flex",
      "flex-col",
      "justify-center",
      "items-start",
      "w-full",
      "gap-4",
    );
    card.appendChild(bottomCard);

    let price = document.createElement("h4");
    price.classList.add("price", "text-orange-600", "font-bold", "text-xl");
    bottomCard.appendChild(price);

    let hr = document.createElement("hr");
    hr.classList.add("w-full", "h-1", "text-gray-900");
    bottomCard.appendChild(hr);

    let button = document.createElement("button");
    button.classList.add(
      "add-to-cart",
      "w-full",
      "h-fit",
      "bg-cyan-600",
      "text-white",
      "rounded",
      "p-2",
      "text-center",
      "md:text-lg",
      "text-sm",
      "hover:bg-cyan-900",
      "active:bg-cyan-900",
    );
    button.setAttribute("id", item.id);
    button.innerHTML = "Add to  cart";
    bottomCard.appendChild(button);
  });
  
}

async function getProductsOfCategory(categoryName) {
//   console.log("hello from getProductsOfCategory");
  // fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
  // .then(res => res.json())
  // .then(data=> {console.log(data)})
  // .catch(err=>console.log(err))

  let response = await fetch(
    `https://fakestoreapi.com/products/category/${categoryName}`,
  );
  let date = await response.json();

  return date;
}

async function displayProductsOfCategory(categoryName) {
  let dataOfCategory = await getProductsOfCategory(categoryName);
  console.log("dataOfCategory");
  console.log(dataOfCategory);

  createCard(dataOfCategory);
  addBtnClicked()
  let titles = document.querySelectorAll(".title");
  let imgs = document.querySelectorAll(".productImg");
  let descriptions = document.querySelectorAll(".desc");
  let prices = document.querySelectorAll(".price");

  dataOfCategory.forEach((item, index) => {
    imgs[index].src = item.image;
    titles[index].innerHTML = item.title;
    descriptions[index].innerHTML = item.description;
    prices[index].innerHTML = `Price : ${item.price}$`;
  });
//   console.log("the end");
}

// createCard([1,2,3,4]) // it works

async function switchCategory() {
  await displayProductsOfCategory("electronics");
  categoryList.addEventListener("click", async (e) => {
    cardsContainer.innerHTML = "";
    // console.log(e.target.innerText);
    // console.log( await  getProductsOfCategory(e.target.innerText))
    // await getProductsOfCategory(e.target.innerText);
    await displayProductsOfCategory(e.target.innerText);
  });
}
switchCategory();


async function addToLocalStorage(id) {
    console.log("hellllo from locaaal")
    // Fetch product data from the API
    let response = await fetch(`https://fakestoreapi.com/products/${id}`);
    let data = await response.json();
    console.log("Product fetched: ", data);
    // Retrieve existing products from local storage
    let existingProducts =
      JSON.parse(window.localStorage.getItem("products")) || [];
  
    // Add the new product to the existing list
    existingProducts.push(data);
    console.log("Updated product list: ", existingProducts);

    // Save the updated list back to local storage
    window.localStorage.setItem("products", JSON.stringify(existingProducts));
  }


