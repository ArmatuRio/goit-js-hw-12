import'./sass/main.scss';
import'./js/input';
import getRefs from "./js/country-refs";
import fetchCountries from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import Notiflix from "notiflix";
import debounce from 'lodash.debounce';



const refs = getRefs();
const DEBOUNCE_DELAY = 300;


refs.inputRef.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value.trim();
    
    if (searchQuery === '') {
        clearData()
        return;
    };

    fetchCountries(searchQuery)
        .then(updateCountryList)     
}


function updateCountryList(data) {
    const renderCountryList = countryListTpl(data);
    clearData();

    if (data.length === 1) {
        renderCountryCard(data);
        
    } else if (data.length > 10) {
        makeInfoMsg('Too many matches found. Please enter a more specific name.')
    } else if (data.status === 404) {
        makeErrorMsg('Oops, there is no country with that name');
    } else {
        refs.countryListContainer.innerHTML = renderCountryList;
    }
};


function makeErrorMsg(message) {
    Notiflix.Notify.failure(message)
};

function makeInfoMsg(message) {
    Notiflix.Notify.info(message)
};


function renderCountryCard(country) {
    const countryMarkup = countryCardTpl(country);
    refs.countryContainer.innerHTML = countryMarkup;
};

function clearData() {
    refs.countryListContainer.innerHTML = '';
    refs.countryContainer.innerHTML = '';
};