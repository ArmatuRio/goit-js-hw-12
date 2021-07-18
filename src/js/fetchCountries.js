export default function fetchCountries(searchQuery) {
    return fetch(
      `https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;population;flag;languages;capital`,
    )
      .then(res => res.json())
      .catch(error => error);
    }