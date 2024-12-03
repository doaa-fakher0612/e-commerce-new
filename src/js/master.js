



let currentCarouselImg = document.querySelector("#carousel_image");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

let carouselImgs = [
  "./imgs/carousel4.jpg",
  "./imgs/carousel3.jpg",
  "./imgs/carousel2.jpg",
];
console.log("currentCarouselImg.src ===> ", currentCarouselImg);
let currentImgIndex = carouselImgs.indexOf(currentCarouselImg.src);
//console.log(currentImgIndex);



let carouselInterval;
resetTimer();
function resetTimer(){
  if (carouselInterval){
    clearInterval(carouselInterval)
  }
  else{
    carouselInterval = setInterval(handelClickNext, 2000)
  }
}


nextBtn.onclick = handelClickNext;

function handelClickNext() {
  currentImgIndex++;
  if (currentImgIndex == carouselImgs.length) {
    // console.log("currentImgIndex == carouselImgs.length")
    currentImgIndex = 0;
    currentCarouselImg.src = carouselImgs[currentImgIndex];
  } else {
  }
  currentCarouselImg.src = carouselImgs[currentImgIndex];

}

prevBtn.onclick =  handelClickPrev;

function handelClickPrev() {
  resetTimer()
  console.log("clicked");
  console.log("currentCarouselImg.src", currentCarouselImg.src);
  currentImgIndex--;
  if (currentImgIndex < 0) {
    currentImgIndex = carouselImgs.length - 1;
    currentCarouselImg.src = carouselImgs[currentImgIndex];
  } else {
    currentCarouselImg.src = carouselImgs[currentImgIndex];
  }
}


// categories list

async function fetchCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");

  const data = await response.json();
  return data;
}

let categoryList = document.querySelector("#category-list");

function createCategoryElement(category){
 
  let categoryELement = document.createElement("div");
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
    categoryELement.onclick=()=>{
      console.log(category +" Clicked")
      createProductsList(category)
    };
    categoryELement.innerText =category
    // category.charAt(0).toUpperCase() + category.slice(1);
    return categoryELement;
} 

function renderCategoriesList(categories){

categories.forEach((category)=>{
  const categoryELement = createCategoryElement(category)
  categoryList.appendChild(categoryELement)
})
}

async function createCategoriesList(){
  let categories = await fetchCategories()

  
  renderCategoriesList(categories)
  const firstCategory = categories[0];
  console.log("firstCategory "+firstCategory )
  if (firstCategory) {
    createProductsList(firstCategory);
  }
}

createCategoriesList();


 

// Products List
let productsContainer = document.querySelector("#products-container");

async function fetchCategoryProducts(categoryName) {

  let response = await fetch(
    `https://fakestoreapi.com/products/category/${categoryName}`,
  );
  let date = await response.json();

  return date;
}


function renderCategoryProducts(products){
  productsContainer.innerHTML = "";
products.forEach((product)=>{
  let productCard = document.createElement("div");
  productCard.classList.add(
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
  productsContainer.appendChild(productCard);

  let imgContainer = document.createElement("div");
  imgContainer.classList.add(
    "imageContainer",
    "w-full",
    "rounded",
    "h-80",
    "p-4",
  );
  productCard.appendChild(imgContainer);

  let productImage = document.createElement("img");
  productImage.classList.add(
    "productImg",
    "w-full",
    "rounded",
    "h-full",
    "object-contain",
  );
  imgContainer.appendChild(productImage);
  productImage.src = product.image;

  let textContainer = document.createElement("div");
  textContainer.classList.add(
    "flex",
    "flex-col",
    "gap-2"
  );
  productCard.appendChild(textContainer);

  let productTitle = document.createElement("h1");
  productTitle.classList.add("title", "md:text-2xl", "font-bold", "text-xl","line-clamp-1");
  textContainer.appendChild(productTitle);
  productTitle.innerText = product.title;

  let productDescription = document.createElement("p");
  productDescription.classList.add(
    "desc",
    "text-gray-600",
    "text-sm",
    "md:text-base",
    "break-words",
    "line-clamp-3"
  );
  textContainer.appendChild(productDescription);
  productDescription.innerText = product.description;

  let productFooter = document.createElement("div");
  productFooter.classList.add(
    "productFooter",
    "flex",
    "flex-col",
    "items-start",
    "justify-center",
    "w-full",
    "gap-4",

  );
  productCard.appendChild(productFooter);

  let productPrice = document.createElement("h4");
  productPrice.classList.add(
    "price",
    "text-orange-600",
    "font-bold",
    "text-xl",
    "bg-white",
    
  );
productPrice.innerText =`Price: ${product.price} $`;

  productFooter.appendChild(productPrice);

  let footerSeparator = document.createElement("hr");
  footerSeparator.classList.add( "w-full", "h-1", "text-gray-900");
  productFooter.appendChild(footerSeparator);

  let addToCartButton = document.createElement("button");
  addToCartButton.classList.add(
    "add-to-cart",
    "w-full",
    "h-fit",
    "bg-cyan-600",
    "text-white",
    "rounded-xl",
    "text-center",
    "md:text-lg",
    "text-sm",
    "p-2",
    "hover:bg-cyan-900",
    "active:bg-cyan-900",
  );
  addToCartButton.innerHTML = "Add to cart";
  productFooter.appendChild(addToCartButton);
  
  addToCartButton.onclick = ()=>{
addToCart(product)
  }
})
}



async function createProductsList(category) {
 let categoryProducts = await fetchCategoryProducts(category);

   renderCategoryProducts(categoryProducts)
}

// async function addToLocalStorage(id) {
//   console.log("hellllo from locaaal");
//   // Fetch product data from the API
//   let response = await fetch(`https://fakestoreapi.com/products/${id}`);
//   let data = await response.json();
//   console.log("Product fetched: ", data);
//   // Retrieve existing products from local storage
//   let existingProducts =
//     JSON.parse(window.localStorage.getItem("products")) || [];

//   // Add the new product to the existing list
//   existingProducts.push(data);
//   console.log("Updated product list: ", existingProducts);

//   // Save the updated list back to local storage
//   window.localStorage.setItem("products", JSON.stringify(existingProducts));
// }
