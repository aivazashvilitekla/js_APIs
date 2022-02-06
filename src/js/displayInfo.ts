import { getMovie, getCountry, Country, Movie } from "./apis";

const movieInput: HTMLInputElement = <HTMLInputElement>document.getElementById("movieInput");
const minutes: HTMLElement = document.getElementById("minutes");
const population: HTMLElement = document.getElementById("population");

const releasedTd: HTMLElement = document.getElementById("released");
const actorsTd: HTMLElement = document.getElementById("actors");
const currencyParent: HTMLElement = document.getElementById("currencyParent");

export async function displayInfo() {
  const movieName: String = movieInput.value;

    const movies: Movie = await getMovie(movieName);
  const country: Array<Country> = await getCountry(movies.Country);
    
  const date: Date = new Date();
  if (movies.Year == date.getFullYear()) {
    releasedTd.innerText = `this year`;
  } else {
    releasedTd.innerText = `${
      new Date().getFullYear() - Number(movies.Year)
    } years ago`;
  }
  
    const names: string = movies.Actors.split(", ").map((item) => item.split(" ")[0]).join();
  actorsTd.innerText = names;
  
  currencyParent.innerHTML = '';
  country.forEach((c) => {
    renderCountry(c);
  });
}
export async function displayInfo2(moviesArray) {
  const mov1: Movie = await getMovie(moviesArray[0]);
  const mov2: Movie = await getMovie(moviesArray[1]);
  const mov3: Movie = await getMovie(moviesArray[2]);

  const sumOfRuntime = [mov1, mov2, mov3].reduce((acc: any, curr: any) => {
    return (acc += parseInt(curr.Runtime));
  }, 0);

  const uniqueCountries: Set<string> = new Set(
    [
      mov1.Country.split(", "),
      mov2.Country.split(", "),
      mov3.Country.split(", "),
    ].flat()
  );

  const populationNum: Number = await getPopulation(Array.from(uniqueCountries));
  minutes.innerText = `Minutes - ${sumOfRuntime}`;
  population.innerText = `Population - ${populationNum}`;
}
async function getPopulation(arr): Promise<Number> {
  const getPopulations = await Promise.all(
    arr.map((country) => getCountry(country))
  ).then((data) => data.map((x) => x[0].population));
  return getPopulations.reduce((a, b) => a + b);
}
function renderCountry(country): void{
  currencyParent.innerHTML += `<div>
          <p>Country - ${country.altSpellings[0]}</p>
          <span id='currency'>Currency - ${
            Object.keys(country.currencies)[0]
          } <br> flag - <img id='flagimg' src="${country.flags.png}"></span>
      </div>`;
}