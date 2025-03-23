var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _element, _modalDiv, _detailModal;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function createElement(tag, className, textContent, attributes = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  Object.entries(attributes).forEach(([key, value]) => {
    element[key] = value;
  });
  return element;
}
const RESTAURANT_ITEMS = [
  {
    id: "1",
    categoryImgSrc: "./images/category-korean.png",
    category: "한식",
    name: "피양콩할마니",
    distance: "10",
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, '피양'은 평안도 사투리로 '평양'을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    favorite: false
  },
  {
    id: "2",
    categoryImgSrc: "./images/category-chinese.png",
    category: "중식",
    name: "친친",
    distance: "5",
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    favorite: false
  },
  {
    id: "3",
    categoryImgSrc: "./images/category-japanese.png",
    category: "일식",
    name: "잇쇼우",
    distance: "10",
    description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
    favorite: false
  },
  {
    id: "4",
    categoryImgSrc: "./images/category-western.png",
    category: "양식",
    name: "이태리키친",
    distance: "20",
    description: "늘 변화를 추구하는 이태리키친입니다.",
    favorite: false
  },
  {
    id: "5",
    categoryImgSrc: "./images/category-asian.png",
    category: "아시안",
    name: "호아빈 삼성점",
    distance: "15",
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    favorite: false
  },
  {
    id: "6",
    categoryImgSrc: "./images/category-etc.png",
    category: "기타",
    name: "도스타코스 선릉점",
    distance: "5",
    description: "멕시칸 캐주얼 그릴",
    favorite: false
  }
];
const CATEGORY_OPTIONS = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타"
];
const DISTANCE_OPTIONS = ["5", "10", "15", "20", "30"];
const CATEGORY_IMAGES = {
  한식: "korean",
  중식: "chinese",
  일식: "japanese",
  양식: "western",
  아시안: "asian",
  기타: "etc"
};
function createButton({ className, textContent, buttonType, onClick }) {
  const button = createElement(
    "button",
    `${className} button text-caption`,
    textContent,
    !buttonType ? {} : { type: buttonType }
  );
  button.addEventListener("click", (event) => {
    onClick(event);
  });
  return button;
}
function createInputBox({ label, isRequired, type, helpText = "", onChange }) {
  const inputBoxDiv = createElement("div", `form-item ${isRequired && "form-item--required"}`);
  const inputLabel = createElement("label", null, label, { for: `${type} text-caption` });
  const input = createElement("input", null, null, {
    type: "text",
    name: type,
    id: type,
    required: isRequired
  });
  const helpTextSpan = createElement("span", "help-text text-caption", helpText);
  inputBoxDiv.append(inputLabel, input);
  if (helpText !== "") {
    inputBoxDiv.appendChild(helpTextSpan);
  }
  input.addEventListener("change", (event) => {
    onChange(event);
  });
  return inputBoxDiv;
}
function createSectionContainer(className) {
  return createElement("section", className);
}
function createSelectBox({ options, isRequired, type, onChange }) {
  const selectBoxDiv = createElement("div", `form-item ${"form-item--required"}`);
  const categoryLabel = createElement(
    "label",
    null,
    type === "category" ? "카테고리" : "거리(도보 이동 시간)",
    { for: `${type} text-caption` }
  );
  const selectBox = createElement("select", null, null, {
    name: type,
    id: type,
    required: true
  });
  const fragment = new DocumentFragment();
  fragment.appendChild(createElement("option", null, "선택해 주세요", { value: "" }));
  options.forEach((option) => {
    const optionTag = createElement("option", null, option, { value: option });
    fragment.appendChild(optionTag);
  });
  selectBox.appendChild(fragment);
  selectBoxDiv.append(categoryLabel, selectBox);
  selectBox.addEventListener("change", (event) => {
    onChange(event);
  });
  return selectBoxDiv;
}
function createTextArea({ label, type, helpText = "", onChange }) {
  const textAreaDiv = createElement("div", "form-item");
  const textLabel = createElement("label", null, label, { for: `${type} text-caption` });
  const textArea = createElement("textarea", null, null, {
    name: type,
    id: type,
    cols: "30",
    rows: "5"
  });
  textArea.addEventListener("change", (event) => {
    onChange(event);
  });
  const helpTextSpan = createElement("span", "help-text text-caption", helpText);
  textAreaDiv.append(textLabel, textArea);
  if (helpText !== "") {
    textAreaDiv.appendChild(helpTextSpan);
  }
  return textAreaDiv;
}
const restaurantInput = {
  category: null,
  name: null,
  distance: null,
  description: null,
  link: null
};
function resetInput() {
  document.querySelector("select#category").value = "";
  document.querySelector("input#name").value = "";
  document.querySelector("select#distance").value = "";
  document.querySelector("textarea#description").value = "";
  document.querySelector("input#link").value = "";
}
function createRestaurantEnrollModal(onEnroll) {
  const modal = new Modal();
  const $modalTitle = createElement("h2", "modal-title text-title", "새로운 음식점");
  const $enrollForm = createElement("form");
  const $categoryBox = createSelectBox({
    options: CATEGORY_OPTIONS,
    isRequired: true,
    type: "category",
    onChange: (event) => {
      restaurantInput.category = event.target.value;
    }
  });
  const $$nameInputBox = createInputBox({
    label: "이름",
    isRequired: true,
    type: "name",
    onChange: (event) => {
      restaurantInput.name = event.target.value;
    }
  });
  const $distanceBox = createSelectBox({
    options: DISTANCE_OPTIONS,
    isRequired: true,
    type: "distance",
    onChange: (event) => {
      restaurantInput.distance = event.target.value;
    }
  });
  const $descriptionTextArea = createTextArea({
    label: "설명",
    type: "description",
    helpText: "메뉴 등 추가 정보를 입력해 주세요.",
    onChange: (event) => {
      restaurantInput.description = event.target.value;
    }
  });
  const $$linkInputBox = createInputBox({
    label: "참고 링크",
    isRequired: false,
    type: "link",
    helpText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    onChange: (event) => {
      restaurantInput.link = event.target.value;
    }
  });
  const $buttonContainer = createSectionContainer("button-container");
  const $cancelButton = createButton({
    className: "button--secondary",
    textContent: "취소하기",
    buttonType: "button",
    onClick: () => {
      modal.toggle();
    }
  });
  const $enrollButton = createButton({
    className: "button--primary",
    textContent: "등록하기",
    onClick: (event) => {
      event.preventDefault();
      if (!restaurantInput.category || !restaurantInput.name || !restaurantInput.distance) {
        alert("카테고리, 이름, 거리 항목은 필수 입력입니다.");
        return;
      }
      restaurantInput.categoryImgSrc = `./images/category-${CATEGORY_IMAGES[restaurantInput.category]}.png`;
      onEnroll(restaurantInput);
      modal.toggle();
    }
  });
  $buttonContainer.append($cancelButton, $enrollButton);
  $enrollForm.append(
    $categoryBox,
    $$nameInputBox,
    $distanceBox,
    $descriptionTextArea,
    $$linkInputBox,
    $buttonContainer
  );
  const fragment = new DocumentFragment();
  fragment.append($modalTitle, $enrollForm);
  modal.appendModalContent(fragment);
  return modal;
}
class Modal {
  constructor() {
    __privateAdd(this, _element);
    __privateAdd(this, _modalDiv);
    __privateSet(this, _element, this.initModal());
  }
  initModal() {
    const modalContainer = createElement("div", "modal");
    const modalBackdrop = createElement("div", "modal-backdrop");
    __privateSet(this, _modalDiv, createElement("div", "modal-container"));
    modalContainer.append(modalBackdrop, __privateGet(this, _modalDiv));
    return modalContainer;
  }
  appendModalContent(content) {
    console.log(__privateGet(this, _modalDiv), content);
    __privateGet(this, _modalDiv).appendChild(content);
  }
  toggle() {
    __privateGet(this, _element).classList.toggle("modal--open");
    console.log(__privateGet(this, _element).classList.contains("modal--open"));
    if (!__privateGet(this, _element).classList.contains("modal--open")) {
      resetInput();
    }
  }
  getElement() {
    return __privateGet(this, _element);
  }
}
_element = new WeakMap();
_modalDiv = new WeakMap();
class RestaurantDetailModal {
  constructor() {
    __privateAdd(this, _detailModal);
    __privateSet(this, _detailModal, new Modal());
  }
  updateModalContent({ data, onDelete }) {
    const $restaurantItem = createRestaurantItem(data);
    $restaurantItem.classList.add("restaurant__column");
    const $buttonContainer = createElement("div", "button-container");
    const $deleteButton = createButton({
      className: "button--secondary",
      textContent: "삭제하기",
      buttonType: "button",
      onClick: (event) => {
        onDelete(event, data.id);
        __privateGet(this, _detailModal).toggle();
      }
    });
    const $closeButton = createButton({
      className: "button--primary",
      textContent: "닫기",
      onClick: () => __privateGet(this, _detailModal).toggle()
    });
    $buttonContainer.append($deleteButton, $closeButton);
    const fragment = new DocumentFragment();
    fragment.append($restaurantItem, $buttonContainer);
    __privateGet(this, _detailModal).appendModalContent(fragment);
  }
  get modal() {
    return __privateGet(this, _detailModal);
  }
}
_detailModal = new WeakMap();
const STORAGE_KEY = "addedRestaurants";
function getStoredRestaurants() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}
function saveRestaurants(restaurants) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
}
function deleteRestaurantById(id) {
  const storedData = getStoredRestaurants().filter((item) => item.id !== id);
  saveRestaurants(storedData);
}
function getAllRestaurants() {
  return [...RESTAURANT_ITEMS, ...getStoredRestaurants()];
}
function createRestaurantData(data) {
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    categoryImgSrc: data.categoryImgSrc,
    distance: data.distance,
    description: data.description,
    favorite: data.favorite || false
  };
}
function toggleFavorite(id) {
  const restaurant = RESTAURANT_ITEMS.find((item) => item.id === id);
  if (restaurant) {
    restaurant.favorite = !restaurant.favorite;
    saveRestaurants(RESTAURANT_ITEMS);
  }
}
function getFavoriteRestaurants() {
  return RESTAURANT_ITEMS.filter((item) => item.favorite);
}
function createTags(data) {
  const categoryImg = createElement("img", "category-icon", null, {
    src: data.categoryImgSrc,
    alt: data.category
  });
  const nameHeading = createElement("h3", "restaurant__name text-subtitle", data.name);
  const distanceSpan = createElement(
    "span",
    "restaurant__distance text-body",
    `캠퍼스부터 ${data.distance}분 내`
  );
  const starImg = createElement("img", "restaurant__star", null, {
    src: data.favorite ? "./images/Star.png" : "./images/Star border.png",
    alt: "favorite star"
  });
  const descriptionPara = createElement("p", "restaurant__description text-body", data.description);
  return { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara };
}
function createRestaurantItem(data) {
  const restaurantItem = createElement("li", "restaurant");
  const categoryDiv = createElement("div", "restaurant__category");
  const infoDiv = createElement("div", "restaurant__info");
  const titleDiv = createElement("div", "restaurant__title");
  const flexDiv = createElement("div", "flex");
  const restaurantData = createRestaurantData(data);
  const { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara } = createTags(restaurantData);
  if (restaurantData.favorite) {
    starImg.classList.add("favorite");
  }
  starImg.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(restaurantData.id);
    const newSrc = starImg.src.includes("Star.png") ? "./images/Star border.png" : "./images/Star.png";
    starImg.src = newSrc;
    updateFavoriteRestaurants();
  });
  restaurantItem.addEventListener("click", () => {
    const modal = new RestaurantDetailModal();
    modal.updateModalContent({
      data,
      onDelete: (event, id) => {
        handleDeleteRestaurant(id);
      }
    });
    document.body.appendChild(modal.modal.getElement());
    modal.modal.toggle();
  });
  categoryDiv.append(categoryImg);
  titleDiv.append(nameHeading, distanceSpan);
  flexDiv.append(titleDiv, starImg);
  infoDiv.append(flexDiv, descriptionPara);
  restaurantItem.append(categoryDiv, infoDiv);
  return restaurantItem;
}
function updateFavoriteRestaurants() {
  const favoriteRestaurants = getFavoriteRestaurants();
  const $favoriteTabContent = document.querySelector(".favorite-tab-content");
  $favoriteTabContent.innerHTML = "";
  favoriteRestaurants.forEach((data) => {
    const restaurantItem = createRestaurantItem(data);
    $favoriteTabContent.appendChild(restaurantItem);
  });
}
function createRestaurantList(datas) {
  const restaurantList = createElement("ul", "restaurant-list");
  const fragment = new DocumentFragment();
  datas.forEach((data) => {
    const restaurantItem = createRestaurantItem(data);
    fragment.appendChild(restaurantItem);
  });
  restaurantList.appendChild(fragment);
  return restaurantList;
}
function handleDeleteRestaurant(id) {
  deleteRestaurantById(id);
  const $container = document.querySelector(".restaurant-list-container");
  const $updatedList = createRestaurantList(getAllRestaurants());
  const oldList = $container.querySelector(".restaurant-list");
  if (oldList) oldList.remove();
  $container.appendChild($updatedList);
}
function createFilterBox({ onCategoryChange, onSortChange }) {
  const $filterContainer = createElement("section", "restaurant-filter-container");
  const $categoryFilter = createElement("select", "restaurant-filter", null, {
    name: "category",
    id: "category-filter"
  });
  const categoryOptions = ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"];
  categoryOptions.forEach((category) => {
    const $option = createElement("option", null, category, { value: category });
    $categoryFilter.appendChild($option);
  });
  const $sortFilter = createElement("select", "restaurant-filter", null, {
    name: "sorting",
    id: "sorting-filter"
  });
  const sortOptions = [
    { label: "이름순", value: "name" },
    { label: "거리순", value: "distance" }
  ];
  sortOptions.forEach(({ label, value }) => {
    const $option = createElement("option", null, label, { value });
    $sortFilter.appendChild($option);
  });
  $categoryFilter.addEventListener("change", (event) => onCategoryChange(event.target.value));
  $sortFilter.addEventListener("change", (event) => onSortChange(event.target.value));
  $filterContainer.append($categoryFilter, $sortFilter);
  return $filterContainer;
}
function createTabBar(onTabClick) {
  const tabBarContainer = createElement("div", "restaurant-tab-bar-container");
  const allTab = createElement("div", "tab-item", "모든 음식점");
  allTab.classList.add("tab-item-selected");
  const favoriteTab = createElement("div", "tab-item", "자주 가는 음식점");
  const handleTabClick = (tab) => {
    if (tab === "all") {
      allTab.classList.add("tab-item-selected");
      favoriteTab.classList.remove("tab-item-selected");
    } else {
      favoriteTab.classList.add("tab-item-selected");
      allTab.classList.remove("tab-item-selected");
    }
    onTabClick(tab);
  };
  allTab.addEventListener("click", () => handleTabClick("all"));
  favoriteTab.addEventListener("click", () => handleTabClick("favorite"));
  tabBarContainer.appendChild(allTab);
  tabBarContainer.appendChild(favoriteTab);
  return tabBarContainer;
}
const program = {
  enrollRestaurantModal: null,
  filteredItems: [],
  loadData() {
    const storedData = JSON.parse(localStorage.getItem("addedRestaurants")) || [];
    this.filteredItems = [...RESTAURANT_ITEMS, ...storedData];
    this.filteredItems = [...RESTAURANT_ITEMS, ...storedData].map((item) => {
      const storedRestaurant = storedData.find((stored) => stored.id === item.id);
      if (storedRestaurant) {
        item.favorite = storedRestaurant.favorite;
      }
      return item;
    });
  },
  initUI() {
    this.loadData();
    const $main = document.getElementsByTagName("main")[0];
    const $filterContainer = createSectionContainer("restaurant-list-container");
    const $filterBox = createFilterBox({
      onCategoryChange: this.handleCategoryFilter.bind(this),
      onSortChange: this.handleSortFilter.bind(this)
    });
    $filterContainer.appendChild($filterBox);
    const $tabBar = createTabBar(this.handleTabClick.bind(this));
    $filterContainer.appendChild($tabBar);
    $filterContainer.appendChild(createRestaurantList(this.filteredItems));
    const $enrollRestaurantModal = createRestaurantEnrollModal(this.addRestaurant.bind(this));
    this.enrollRestaurantModal = $enrollRestaurantModal;
    $main.append($filterContainer, $enrollRestaurantModal.getElement());
  },
  initEvent() {
    const $openModalButton = document.querySelector(".gnb__button");
    $openModalButton.addEventListener("click", () => {
      this.enrollRestaurantModal.toggle();
    });
    const $backDrop = document.querySelector(".modal-backdrop");
    $backDrop.addEventListener("click", () => {
      this.enrollRestaurantModal.toggle();
    });
  },
  handleCategoryFilter(selectedCategory) {
    this.filteredItems = selectedCategory === "전체" ? [...RESTAURANT_ITEMS] : RESTAURANT_ITEMS.filter((item) => item.category === selectedCategory);
    this.updateRestaurantList();
  },
  handleSortFilter(selectedSort) {
    if (selectedSort === "name") {
      this.filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === "distance") {
      this.filteredItems.sort((a, b) => Number(a.distance) - Number(b.distance));
    }
    this.updateRestaurantList();
  },
  handleTabClick(tab) {
    if (tab === "favorite") {
      this.filteredItems = this.filteredItems.filter((item) => item.favorite);
    } else {
      this.loadData();
    }
    this.updateRestaurantList();
  },
  addRestaurant(newRestaurant) {
    const storedData = JSON.parse(localStorage.getItem("addedRestaurants")) || [];
    storedData.push(newRestaurant);
    localStorage.setItem("addedRestaurants", JSON.stringify(storedData));
    this.filteredItems.push(newRestaurant);
    this.updateRestaurantList();
  },
  updateRestaurantList() {
    const $filteredList = createRestaurantList(this.filteredItems);
    const $container = document.querySelector(".restaurant-list-container");
    const oldList = $container.querySelector(".restaurant-list");
    if (oldList) oldList.remove();
    $container.appendChild($filteredList);
  }
};
program.initUI();
program.initEvent();
