export interface Country{
    altSpellings: Array<string>,
    flags: Object
    
}
export interface Movie{
    Runtime: string,
    Country: string,
    Year: Number,
    Actors: string,
    
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
      .then((data) => data)
      .catch(() => alert("Error"));
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
      .then((data) => data)
      .catch(() => alert("Error"));
  }
  