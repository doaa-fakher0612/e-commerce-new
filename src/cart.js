let counter = document.querySelector(".counter");
let ordersMenu = document.querySelector(".ordersMenu");
let cart = document.querySelector(".cart");
let allProducts = JSON.parse(window.localStorage.getItem("products")) || [];
counter.innerText = allProducts.length;

cart.onmouseover = function () {
  ordersMenu.style.display = "flex";
};
cart.onmouseout = function () {
  ordersMenu.style.display = "none";
};

function addBtnClicked() {
  let addBtns = document.querySelectorAll(".add-to-cart");

  addBtns.forEach((btn) => {
    btn.addEventListener("click", async function (e) {
      console.log("clicked :" + e.target.id);
      await addToLocalStorage(e.target.id);
      createItemsInCartMenu();

      // increaseCartCount();
      // addToCartMenu();
    });
  });
}

addBtnClicked();

function createItemsInCartMenu() {
  let allProducts = JSON.parse(window.localStorage.getItem("products")) || [];
  console.log("Products in cart: ", allProducts);

  console.log("allProducts.length  " + allProducts.length);

  if (allProducts.length >= 0) {
    counter.innerText = allProducts.length;

    ordersMenu.innerHTML = "";

    allProducts.forEach((product) => {
      console.log("Rendering product in cart: ", product);

      let globalItem = document.createElement("div");
      globalItem.classList.add("item", "flex", "flex-col", "gap-2", "w-full");
      ordersMenu.appendChild(globalItem);

      let item = document.createElement("div");
      item.classList.add("item", "flex", "flex-row", "gap-4", "w-full", "p-2");
      globalItem.appendChild(item);

      let imgDivItem = document.createElement("div");
      imgDivItem.classList.add(
        "imgDiv",
        "w-32",
        "h-32",
        "md:w-20",
        "md:h-20",
        "rounded",
        "flex",
        "flex-col",
        "gap-2",
      );
      item.appendChild(imgDivItem);

      let img = document.createElement("img");
      img.classList.add("img", "w-full", "h-full", "rounded", "object-contain");
      img.src = product.image;
      imgDivItem.appendChild(img);

      let data = document.createElement("div");
      data.classList.add("data", "flex", "flex-col", "justify-center", "gap-2");
      item.appendChild(data);

      let title = document.createElement("p");
      title.innerText = `product [${product.id}] : ${product.title}`;
      data.appendChild(title);

      let price = document.createElement("h4");
      price.classList.add("price", "text-orange-600", "font-bold", "md:text-xl" ,"text-base" );
      price.innerText = product.price + "$";
      data.appendChild(price);

      let removeBtn = document.createElement("button");
      removeBtn.classList.add(
        "rounded",
        "w-full",
        "p-3",
        "bg-orange-500",
        "text-white",
        "text-sm",
        "hover:bg-orange-600",
      );
      removeBtn.innerText = "Remove item";
      removeBtn.onclick = function () {
        console.log("removed");

        removeBtn.parentElement.innerHTML = "";

        // let filteredProducts = allProducts.filter(
        //   (item) => item.id != product.id,
        // );
        // console.log("filteredProducts: "+filteredProducts);
        // window.localStorage.setItem("products",JSON.stringify(filteredProducts))

        let indexToRemove = allProducts.findIndex(
          (item) => item.id == product.id,
        );

        if (indexToRemove !== -1) {
          allProducts.splice(indexToRemove, 1); // Remove only the first match
          console.log("Updated products list: " + allProducts);
          window.localStorage.setItem("products", JSON.stringify(allProducts));

          // Re-render the cart
          createItemsInCartMenu();
        }
      };
      globalItem.appendChild(removeBtn);

      let hr = document.createElement("hr");
      hr.classList.add("w-full", "h-1", "text-gray-900");
      ordersMenu.appendChild(hr);
    });
  } else {
    console.log("No products to display in cart.");
  }
}
createItemsInCartMenu();
