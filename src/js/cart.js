let cartContainer = document.querySelector("#cart-container");
let cart = document.querySelector("#cart");
let navMenu = document.querySelector("#nav-menu");

console.log("cart", cart);
cart.onmouseover = function () {
  cartContainer.style.display = "flex";
};
cart.onmouseout = function () {
  cartContainer.style.display = "none";
};

navMenu.onmouseover = function () {
  cartContainer.style.display = "flex";
};
navMenu.onmouseout = function () {
  cartContainer.style.display = "none";
};

let cartItems = [];

const localStorageItems = localStorage.getItem("cart");
if (localStorageItems) {
  const localStorageCartItems = JSON.parse(localStorageItems);

  cartItems = localStorageCartItems;
  renderCartItems(cartItems);
}

function renderCartItems(cartItems) {
  let cartCounter = document.querySelector("#cart-counter");
  cartCounter.innerText = cartItems.length;
  cartContainer.innerHTML = "";
  cartItems.forEach((cartItem) => {
    let cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add(
      "item",
      "flex",
      "flex-col",
      "gap-2",
      "w-full",
    );
    cartContainer.appendChild(cartItemContainer);

    let cartItemDataContainer = document.createElement("div");
    cartItemDataContainer.classList.add(
      "item",
      "flex",
      "flex-row",
      "gap-4",
      "w-full",
      "p-2",
    );
    cartItemContainer.appendChild(cartItemDataContainer);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add(
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
    cartItemDataContainer.appendChild(imgContainer);

    let cartItemImage = document.createElement("img");
    cartItemImage.classList.add(
      "img",
      "w-full",
      "h-full",
      "rounded",
      "object-contain",
    );
    cartItemImage.src = cartItem.image;
    imgContainer.appendChild(cartItemImage);

    let cartItemTextContainer = document.createElement("div");
    cartItemTextContainer.classList.add(
      "data",
      "flex",
      "flex-col",
      "justify-center",
      "gap-2",
    );
    cartItemDataContainer.appendChild(cartItemTextContainer);

    let cartItemTitle = document.createElement("p");
    cartItemTitle.innerText = cartItem.title;
    cartItemTextContainer.appendChild(cartItemTitle);

    let cartItemPrice = document.createElement("h4");
    cartItemPrice.classList.add(
      "price",
      "text-orange-600",
      "font-bold",
      "md:text-xl",
      "text-base",
    );
    cartItemPrice.innerText = "Price: " + cartItem.price + " $";
    cartItemTextContainer.appendChild(cartItemPrice);

    let cartItemRemoveButton = document.createElement("button");
    cartItemRemoveButton.classList.add(
      "rounded",
      "w-full",
      "p-3",
      "bg-orange-500",
      "text-white",
      "text-sm",
      "hover:bg-orange-600",
    );
    cartItemRemoveButton.innerText = "Remove item";

    cartItemRemoveButton.onclick = function () {
      const newCartItems = cartItems.filter(
        (currentCartItem) => currentCartItem.id != cartItem.id,
      );

      cartItems = newCartItems;
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      renderCartItems(newCartItems);

      // }
    };
    cartItemRemoveButton.innerText = "Remove item";
    cartItemRemoveButton.onclick = function () {
      let found = false;

      // Filter to exclude only the first match
      const newCartItems = cartItems.filter((currentCartItem) => {
        if (!found && currentCartItem.id === cartItem.id) {
          found = true; // Skip the first match
          return false;
        }
        return true; // Keep the rest
      });

      // Update local storage and re-render
      cartItems = newCartItems;
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      renderCartItems(newCartItems);
    };

    cartItemContainer.appendChild(cartItemRemoveButton);

    const cartItemsSeparator = document.createElement("hr");
    cartItemsSeparator.classList.add("w-full", "h-1", "text-gray-900");
    cartContainer.appendChild(cartItemsSeparator);
  });
}

function addToCart(product) {
  cartItems.push(product);
  renderCartItems(cartItems);
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
