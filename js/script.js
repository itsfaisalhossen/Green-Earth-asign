const categoriesContainer = document.getElementById("categories-container");

const loadCategories = () => {
  const url = `https://openapi.programming-hero.com/api/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlantCategories(data.categories))
    .catch((err) => {
      alert("Something went worng");
    });
};

const displayPlantCategories = (categories) => {
  categories.forEach((category) => {
    // console.log(category);
    categoriesContainer.innerHTML += `
         <li
         id="${category.id}"
          class="text-black list-none hover:bg-green-800 transition-all rounded py-1.5 px-2 hover:text-white cursor-pointer"
                >
            ${category?.category_name ? category?.category_name : "N/A"}
          </li>
    `;
  });
  categoriesContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("bg-green-800");
      li.classList.remove("text-white");
    });
    if (e.target.localName === "li") {
      e.target.classList.add("text-white");
      e.target.classList.add("bg-green-800");
    }
    // console.log("This is id----->", id);
  });
};

loadCategories();
