//LANDING PAGE
const searchBar = document.getElementById('search');

searchBar.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const userSearch = searchBar.value;

    event.preventDefault();
    // console.log(userSearch)
    searchBar.value = '';

    window.location.href = `/insights.html?location=${userSearch}`;
  }
})
