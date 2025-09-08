const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");
const modalContainer = document.getElementById("modal-container");
const plantsDetailsModal = document.getElementById("plants-details-modal");
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
    .then((data) => displayAllPlants(data.plants))
    .catch((err) => {
      alert("Something went worng");
      console.log(err);
    });
};

const displayPlantCategories = (categories) => {
  categories.forEach((category) => {
    categoriesContainer.innerHTML += `
         <li
         id="${category.id}"
          class="text-black list-none hover:bg-green-500 transition-all rounded py-1.5 px-2 hover:text-white cursor-pointer text-sm"
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
      showLoading();
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

  if (e.target.localName === "h4") {
    // console.log("hello h4");
    handleViewDetailsModal(e);
  }
});

const displayAllPlants = (allPlants) => {
  if (allPlants.length === 0) {
    alert("No plants for this cateory");
    return;
  }
  cardContainer.innerHTML = "";
  allPlants.forEach((plant) => {
    cardContainer.innerHTML += `
     <div id="${
       plant.id
     }" class="w-full bg-white flex justify-between flex-col  rounded-xl">
            <div class="space-y-2">
              <img
                class="mx-auto w-full h-[200px] md:h-[200px] object-cover rounded-xl bg-slate-300"
                src="${plant.image}"
                alt=""
              />
              <h4 class="font-medium px-2.5 cursor-pointer">${
                plant.name ? plant.name : "N/A"
              }</h4>
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

const handleViewDetailsModal = (e) => {
  const id = e.target.parentNode.parentNode.id;
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => displayPlantDetails(data.plants))
    .catch((err) => {
      alert("Something went worng");
      console.log(err);
    });
};

const displayPlantDetails = (plant) => {
  plantsDetailsModal.showModal();
  modalContainer.innerHTML = `
    <div class="flex justify-between items-center">
    <div class="font-semibold text-[16px]">
    <p >${plant.name}</p>
    <p class="font-semibold">৳ ${plant.price}</p>
      </div>
         <p
        class="px-3 text-center font-semibold py-1 text-[12px] bg-green-100 rounded-full">
          ${plant.category ? plant.category : plant.category}
        </p>
    </div>
      <img
        class="mx-auto w-full h-[220px] md:h-[330px] object-cover rounded-xl bg-slate-300"
        src="${plant.image ? plant.image : "N/A"}" alt="" />
    <p>${plant.description}</p>
  
  `;
};

const handleAddToCart = (e) => {
  const id = e.target.parentNode.parentNode.id;
  const title =
    e.target.parentNode.parentNode.children[0].children[1].innerText;
  const price = parseInt(
    e.target.parentNode.children[0].children[1].children[1].innerText
  );
  const cartInfo = {
    id,
    title,
    price,
  };
  plantCart.push(cartInfo);
  const totalPrice = plantCart.reduce((acc, cur) => cur.price + acc, 0);
  innerValue.innerText = totalPrice;
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
              <p onclick="handleDeleteCartItem('${cartItem.id}')" class="cursor-pointer text-[14px]">
              <i class="fa-solid fa-xmark"></i>
              </p> 
         </div>
    `;
  });
};

const handleDeleteCartItem = (id) => {
  const filteredBookMarks = plantCart.filter((cartItem) => cartItem.id !== id);
  plantCart = filteredBookMarks;
  const totalPrice = plantCart.reduce((acc, cur) => cur.price + acc, 0);
  innerValue.innerText = totalPrice;
  displayCartInfo(plantCart);
};

const showLoading = () => {
  cardContainer.innerHTML = `
        <div class="w-full mx-auto py-24 text-center col-span-3">
              <span class="loading loading-bars loading-xl"></span>
        </div>
  `;
};

loadAllPlants();
loadCategories();
