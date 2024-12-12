
let myResult;

fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(jsonData => {
        myResult = jsonData;
    })
    .catch(err => console.error( err));

    document.getElementById('reset-btn').addEventListener('click', function() {
       document.getElementById('user-search-bar').value=''
       const resultsDiv = document.getElementById('view-result');
       resultsDiv.innerHTML = '';
   
    })

document.getElementById('search-btn').addEventListener('click', function() {
    const input = document.getElementById('user-search-bar').value.toLowerCase(); 
    let resultArr = [];
    if(input == "beach" || input == "beaches"){
        myResult.beaches.forEach(beach => {
            resultArr.push(beach)
        });
    }else if(input == "temples" || input == "temple"){
        myResult.temples.forEach(temple => {
            resultArr.push(temple);
        });
    }else if(input == "country" || input == "countries"){
        myResult.countries.forEach(country => {
            country.cities.forEach(city => {
                resultArr.push(city);
            });
        });
    }
    showResult(resultArr);
});


function showResult(resultArr) {
    const resultsDiv = document.getElementById('view-result');
    resultsDiv.innerHTML = '';

    if (resultArr.length === 0) {
        resultsDiv.innerHTML = 'No results found.';
        return;
    }

    resultArr.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <h2>${result.name}</h2>
            <img src="${result.imageUrl}" alt="${result.name}">
            <p>${result.description}</p>
        `;
        resultsDiv.appendChild(item);
    });
}