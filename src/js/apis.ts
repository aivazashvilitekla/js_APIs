export interface Country {
  altSpellings: string;
  currency: string;
  population: number;
  flagPng: string;
}
export interface Movie {
  Runtime: string;
  Country: string;
  Year: number;
  Actors: string;
}
export function getMovie(movieName: string): Promise<Movie> {
  return fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=f2c8c22d`)
    .then((response) => {
      if (!response.ok) {
        alert("შეცდომა, სცადეთ სხვა ფილმი");
      } else {
        return response.json();
      }
    })
    .then((movie) => {
      return {
        Runtime: movie.Runtime,
        Country: movie.Country,
        Year: movie.Year,
        Actors: movie.Actors,
      };
    });
}
export function getCountry(country: string): Promise<Array<Country>> {
  return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        alert("შეცდომა, სცადეთ სხვა ფილმი");
      } else {
        return response.json();
      }
    })
    .then(
      (data) => data
      // {
      //   return {
      //     altSpellings: data.altSpellings[0],
      //   currency: Object.keys(data.currencies)[0],
      //   population: data.population,
      //   flags: {
      //     png: data.flags.png,
      //   }
      //   }
      // }
    )
    .catch(() => alert("Error"));
}
