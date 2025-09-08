const loadPlants = (categoryId = "") => {
  fetch(
    categoryId
      ? `https://openapi.programming-hero.com/api/category/${categoryId}`
      : "https://openapi.programming-hero.com/api/plants"
  )
    .then((res) => res.json())
    .then((json) => displayPlants(json.plants));
};
const displayPlants = (plants) => {
  const plantsContainer = document.getElementById("plant-container");
  plantsContainer.innerHTML = "";
  for (const plant of plants) {
    const newDiv = document.createElement("div");
    const plantCard = `
      <div class="bg-white p-4 rounded-lg gap-2 grid">
      <img class="w-full h-[186px] rounded-lg object-cover" src="${plant.image}" alt="${plant.name}" />
      <h4 class="font-semibold">${plant.name}</h4>
      <p>${plant.description}
      </p>
      <div class="flex justify-between w-full">
      <span
      class="bg-green-100 text-green-500 font-medium rounded-[50px] p-1 px-3"
      >${plant.category}</span
      >
      <span class="font-medium">৳${plant.price}</span>
      </div>
      <div class="">
      <button
      onclick="onAddToCart(${plant.id})"
      class="bg-[#15803D] text-white hover:bg-green-300 hover:text-black rounded-[50px] btn border-none shadow-none w-full"
      >
      Add to Cart
      </button>
      </div>
      </div>
      
      `;
    newDiv.innerHTML = plantCard;
    plantsContainer.append(newDiv);
  }
};

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.status ? json.categories : null))
    .catch((err) => console.log(err));
};
const displayCategories = (categories) => {
  const ul = document.getElementById("categories-container");
  const li = document.createElement("li");
  const allTrees = `
      <button  onclick="changeCategory('all-trees')"
        class="hover:bg-[#15803D] hover:text-white w-full text-left rounded-sm p-1 px-2" >
        All Trees
     </button>`;
  li.innerHTML = allTrees;

  ul.append(li);
  for (let category of categories) {
    const li = document.createElement("li");
    li.innerHTML = `
         <button
         onclick="changeCategory(${category.id})"
         class="hover:bg-[#15803D] hover:text-white w-full text-left rounded-sm p-1 px-2">
            ${category.category_name}
        </button>
        `;
    ul.append(li);
  }
};

const changeCategory = (id) => {
  console.log(id);
  loadPlants(id === "all-trees" ? "" : id);
};

const onAddToCart = (id) => {
  console.log(id);
};

loadCategories();
loadPlants();
