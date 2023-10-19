import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-e5846-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(shoppingListInDB, inputValue);
  clearInputField();
});

onValue(shoppingListInDB, function (snapshot) {
  let itemsArray = Object.values(snapshot.val());
  clearShoppingList();
  for (let i = 0; i < itemsArray.length; i++) {
    addShoppingListItem(itemsArray[i]);
  }
});

function clearInputField() {
  inputFieldEl.value = "";
}

function clearShoppingList() {
  shoppingListEl.innerHTML = "";
}

function addShoppingListItem(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
