export interface Country{
    altSpellings: Array<String>,
    flags: Object
    
}
export interface Movie{
    Runtime: String,
    Country: String,
    Year: Number,
    Actors: String,
    
}
export function getMovie(movieName: String): Promise<Movie> {
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
  export function getCountry(country: String): Promise<Array<Country>> {
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
  