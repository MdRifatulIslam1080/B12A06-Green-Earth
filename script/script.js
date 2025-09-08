let cateId = "cate-id-all-trees";

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
    // Use 'of' for iterables like arrays
    const newDiv = document.createElement("div");
    const plantCard = `
      <div class="bg-white p-4 rounded-lg gap-2 grid">
        <div onclick='showPlantDetails(${JSON.stringify(
          plant
        )})' class="cursor-pointer">
            <img class="w-full h-[186px] rounded-lg object-cover" src="${
              plant.image
            }" alt="${plant.name}" />
            <h4 class="font-semibold">${plant.name}</h4>
            <p>${plant.description}</p>
            <div class="flex justify-between w-full">
                <span class="bg-green-100 text-green-500 font-medium rounded-[50px] p-1 px-3">${
                  plant.category
                }</span>
                <span class="font-medium">৳${plant.price}</span>
            </div>
        </div>
        <div>
            <button
                onclick="onAddToCart(${plant.id})"
                class="bg-[#15803D] text-white hover:bg-green-300 hover:text-black rounded-[50px] btn border-none shadow-none w-full"
            >
              Add to Cart
            </button>
        </div>
      </div>`;
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
      <button id="cate-id-all-trees" onclick="changeCategory('all-trees')"
        class="hover:bg-[#15803D] hover:text-white w-full text-left rounded-sm p-1 px-2" >
        All Trees
     </button>`;
  li.innerHTML = allTrees;

  ul.append(li);
  for (let category of categories) {
    const li = document.createElement("li");
    li.innerHTML = `
         <button
         id="cate-id-${category.id}"
         onclick="changeCategory(${category.id})"
         class="hover:bg-[#15803D] hover:text-white w-full text-left rounded-sm p-1 px-2">
            ${category.category_name}
        </button>
        `;
    ul.append(li);
  }
  changeCategoryStyle();
};

const changeCategoryStyle = (clearId = null) => {
  const category = document.getElementById(clearId ? clearId : cateId);
  category.className = clearId
    ? "hover:bg-[#15803D] hover:text-white w-full text-left rounded-sm p-1 px-2"
    : "bg-[#15803D] text-white w-full text-left rounded-sm p-1 px-2";
};

const changeCategory = (id) => {
  loadPlants(id === "all-trees" ? "" : id);
  changeCategoryStyle(cateId);
  cateId = `cate-id-${id}`;
  changeCategoryStyle();
};
const showPlantDetails = (plant) => {
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-80 object-cover rounded-lg mb-4"/>
        <h2 class="text-2xl font-bold mb-2">${plant.name}</h2>
        <p class="text-gray-600 mb-4">${plant.description}</p>
        <div class="flex items-center justify-between mb-2">
            <span class="font-medium">Category:</span>
            <span class="bg-green-100 text-green-500 font-medium rounded-[50px] p-1 px-3">${plant.category}</span>
        </div>
        <div class="flex items-center justify-between mb-4">
            <span class="font-medium">Price:</span>
            <span class="text-lg font-bold">৳${plant.price}</span>
        </div>
        <p class="text-sm text-gray-500">${plant.care_instructions}</p>
    `;

  // Show the modal using DaisyUI's built-in method
  const modal = document.getElementById("my_modal");
  modal.showModal();
};

const onAddToCart = (id) => {
  console.log("Add to cart clicked for plant ID:", id);
};

loadCategories();
loadPlants();
