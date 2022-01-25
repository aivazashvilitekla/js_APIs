// აქ ისევ ცუდად მაქვს იმპორტები სავარაუდოდ ;დ
import { displayInfo, displayInfo2 } from "./js/displayInfo1.js";
import css from "./../css/style.css";

const searchBtn = document.getElementById("searchBtn");
const searchBtn2 = document.getElementById("searchBtn2");

const movie1 = document.getElementById("movieInput1");
const movie2 = document.getElementById("movieInput2");
const movie3 = document.getElementById("movieInput3");

// პირველი დავალება
searchBtn.addEventListener("click", () => {
  displayInfo();
});
// მეორე დავალება
searchBtn2.addEventListener("click", () => {
  const moviesArray = [movie1.value, movie2.value, movie3.value];
  displayInfo2(moviesArray);
});




