import { getMovie, getCountry } from "./apis.js";

const movieInput = document.getElementById("movieInput");
const minutes = document.getElementById("minutes");
const population = document.getElementById("population");

const releasedTd = document.getElementById("released");
const actorsTd = document.getElementById("actors");
const currencyParent = document.getElementById("currencyParent");

export async function displayInfo() {
  let movieName = movieInput.value;

  let movies = await getMovie(movieName);
  console.log(movies);
  let country = await getCountry(movies.Country);

  // გამოტანა
  const date = new Date();
  if (movies.Year == date.getFullYear()) {
    releasedTd.innerText = `this year`;
  } else {
    releasedTd.innerText = `${
      new Date().getFullYear() - movies.Year
    } years ago`;
  }
  // სრული სახელებიდან მხოლოდ სახელების ამოღება
  let names = movies.Actors.split(", ").map((item) => item.split(" ")[0]);
  actorsTd.innerText = names;
  // თითოეული ქვეყნის ჩამატება დივში
  country.forEach((c) => {
    currencyParent.innerHTML += `<div>
          <p>Country - ${c.altSpellings[0]}</p>
          <span id='currency'>Currency - ${
            Object.keys(c.currencies)[0]
          } <br> flag - <img id='flagimg' src="${c.flags.png}"></span>
      </div>`;
  });
}
let sumOfPopulation = 0;
export async function displayInfo2(moviesArray) {
  let mov1 = await getMovie(moviesArray[0]);
  let mov2 = await getMovie(moviesArray[1]);
  let mov3 = await getMovie(moviesArray[2]);

  // სამი ფილმის ხანგრძლივობის ჯამი წუთებში
  let sum = [mov1, mov2, mov3].reduce((acc, curr) => {
    //   "132 minutes" იყო ობიექტში და split-ით იმ 132 წუთს ვიღებ
    return (acc += Number(curr.Runtime.split(" ")[0]));
  }, 0);

  // სიიდან განმეორებადი ქვეყნების ამოშლა, აქ რაღაცები ძალიან გავართულე მგონი ;დ
  // სეტში ვამატებ ქვეყნებს
  let uniqueCountries = new Set(
    [
      mov1.Country.split(", "),
      mov2.Country.split(", "),
      mov3.Country.split(", "),
    ].flat()
  );
  let arr = [];
  // სეტის ელემენტები ისევ მასივში გადამყავს
  for (let item of uniqueCountries.values()) arr.push(item);

  // getPopulation ფუნქციას გადაეცემა ქვეყნების მასივი, თითოეული ქვეყნის მოსახლეობას იღებს და ამატებს
  await getPopulation(arr);
  minutes.innerText = `Minutes - ${sum}`;
  population.innerText = `Population - ${sumOfPopulation}`;
}
async function getPopulation(arr) {
  for await (const country of arr) {
      let p = await getCountry(country);
      console.log(p[0].population);
    sumOfPopulation += p[0].population;
  }
}
