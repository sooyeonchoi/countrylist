// input: so we can search
// div

// function 1) filter the countries

const countriesContainer = document.querySelector(".countryBox");

const filterText = {
  searchText: " ",
  sortMode: "name",
  sortDirection: "asc"
};

const filterCountries = () => {
  return countriesObject
    .filter(country => {
      const searchName = country.name
        .toLowerCase()
        .includes(filterText.searchText);
      const searchCapital = country.capital
        .toLowerCase()
        .includes(filterText.searchText);
      const searchLanguage = country.languages.find(language =>
        language.toLowerCase().includes(filterText.searchText)
      );
      return searchName || searchCapital || searchLanguage;
    })
    .sort((a, b) => {
      const left = a[filterText.sortMode];
      const right = b[filterText.sortMode];
      if (left > right) {
        return filterText.sortDirection === "asc" ? 1 : -1;
      } else if (left < right) {
        return filterText.sortDirection === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });
};

const showCountries = () => {
  const result = filterCountries();
  countriesContainer.innerHTML = ""; //this is how we activate html
  result.forEach(country => {
    const { name, languages, population, capital, flag } = country;
    const countryBox = document.createElement("div");
    countryBox.className = "country";
    countryBox.innerHTML = `
    <img src="${flag}" />
    <h3> ${name}</h3>
    <p> ${capital}</p>
    <p>${languages.join(", ")}</p>
    <p>${population.toLocaleString()}</p>  
    `;
    countriesContainer.appendChild(countryBox);
  });
};
showCountries();

document.querySelector(".search").addEventListener("input", e => {
  filterText.searchText = e.target.value.toLowerCase();
  showCountries();
});

document.querySelectorAll(".sort").forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault(); // we don't want to refresh everytime we visit the website
    e.target.classList.add("active"); // it's for css
    if (e.target.classList.contains("name")) {
      filterText.sortMode = "name";
    } else if (e.target.classList.contains("capital")) {
      filterText.sortMode = "capital";
    } else if (e.target.classList.contains("population")) {
      filterText.sortMode = "population";
    }
    showCountries();
  });
});

document.querySelectorAll(".sort-direction").forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.contains("asc")) {
      filterText.sortDirection = "asc";
    } else if (e.target.classList.contains("dsc")) {
      filterText.sortDirection = "dsc";
    }
    showCountries();
  });
});
