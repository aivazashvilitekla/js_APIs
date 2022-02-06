import { displayInfo, displayInfo2 } from "./js/displayInfo";
import "./../css/style.css" ;

const searchBtn: HTMLElement = document.getElementById("searchBtn");
const searchBtn2: HTMLElement = document.getElementById("searchBtn2");

const movie1: HTMLInputElement = <HTMLInputElement>document.getElementById("movieInput1");
const movie2: HTMLInputElement = <HTMLInputElement>document.getElementById("movieInput2");
const movie3: HTMLInputElement = <HTMLInputElement>document.getElementById("movieInput3");

// პირველი დავალება
searchBtn.addEventListener("click", () => {
  displayInfo();
});
// მეორე დავალება
searchBtn2.addEventListener("click", () => {
  const moviesArray = [movie1.value, movie2.value, movie3.value];
  displayInfo2(moviesArray);
});




