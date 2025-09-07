const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");
const innerValue = document.getElementById("total-Count");

let plantCart = [];
const loadCategories = () => {
  const url = `https://openapi.programming-hero.com/api/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlantCategories(data.categories))
    .catch((err) => {
      alert("Something went worng");
      console.log(err);
    });
};

const loadAllPlants = () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllPlants(data.plants))
    .catch((err) => {
      alert("Something went worng");
      console.log(err);
    });
};

const loadPlantsByCategories = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllPlants(data.plants));
};

const displayPlantCategories = (categories) => {
  categories.forEach((category) => {
    categoriesContainer.innerHTML += `
         <li
         id="${category.id}"
          class="text-black list-none hover:bg-green-500 transition-all rounded py-1.5 px-2 hover:text-white cursor-pointer"
                >
            ${category?.category_name ? category?.category_name : "N/A"}
          </li>
    `;
  });
  categoriesContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("bg-green-700");
      li.classList.remove("text-white");
    });
    if (e.target.localName === "li") {
      e.target.classList.add("text-white");
      e.target.classList.add("bg-green-700");
      loadPlantsByCategories(e.target.id);
    }
  });
};

cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleAddToCart(e);
  }
});

const displayAllPlants = (allPlants) => {
  cardContainer.innerHTML = "";
  allPlants.forEach((plant) => {
    cardContainer.innerHTML += `
     <div id="${
       plant.id
     }" class="w-full bg-white flex justify-between flex-col  rounded-xl">
            <div class="space-y-2">
              <img
                class="mx-auto w-full h-[330px] md:h-[200px] object-cover rounded-xl bg-slate-300"
                src="${plant.image}"
                alt=""
              />
              <p class="font-medium px-2.5">${
                plant.name ? plant.name : "N/A"
              }</p>
              <p class="text-sm px-2.5">
                ${plant.description}
              </p>
            </div>
           <div class="space-y-2 mt-2 px-2.5">
              <div class="flex justify-between">
                <p
                  class="px-3 font-semibold text-xs py-1 bg-green-100 rounded-full"
                >
                   ${plant.category ? plant.category : plant.category}
                </p>
                <div class="flex gap-1">
                 <p class="font-bold text-[14px]">৳</p>
                <span>${plant.price}</span>
                </div>
               
              </div>
              <button
                class="w-full my-3 py-2 rounded-full bg-green-700 font-medium text-sm cursor-pointer hover:bg-green-800 text-white transition-all"
              >
                Add to Cart
              </button>
           </div>
            </div>
  `;
  });
};

let total = 0;
const handleAddToCart = (e) => {
  const title =
    e.target.parentNode.parentNode.children[0].children[1].innerText;
  const price = parseInt(
    e.target.parentNode.children[0].children[1].children[1].innerText
  );
  total += price;
  innerValue.innerText = total;

  const cartInfo = {
    title,
    price,
  };
  plantCart.push(cartInfo);
  displayCartInfo(plantCart);
};

const displayCartInfo = (plantCart) => {
  cartContainer.innerHTML = "";
  plantCart.forEach((cartItem) => {
    cartContainer.innerHTML += `
             <div
               class="p-2 flex items-center justify-between rounded-md bg-green-50"
              >
                <div>
                  <h4 class="text-[14px] font-semibold mb-1">${cartItem.title}</h4>
                  <p class="text-sm text-gray-700">৳ ${cartItem.price}</p>
                </div>
                <span class="cursor-pointer">
                  <i class="fa-solid fa-xmark text-[13px]"></i>
                </span>
         </div>
    `;
  });
};

loadAllPlants();
loadCategories();
