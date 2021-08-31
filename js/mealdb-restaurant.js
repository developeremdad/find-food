const searchField = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadData(searchText);
    searchField.value = '';
}


const loadData = (foodName) => {
    if (foodName == '') {
        document.getElementById('error-empty').style.display = 'block';
    }
    else {
        document.getElementById('error-empty').style.display = 'none';
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
    }
}

const displayFood = (meals) => {
    if (meals == null) {
        document.getElementById('error-msg').style.display = 'block';
        // alert('Error found');
    }
    else {
        document.getElementById('error-msg').style.display = 'none';
        const divContainer = document.getElementById('div-container');
        detailContainer.textContent = '';
        // divContainer.innerHTML = '';
        // or
        divContainer.textContent = '';
        meals.forEach(meal => {
            // console.log(meal);
            // document.getElementById('spinner-div').style.display = 'block';
            const div = document.createElement('div');
            div.innerHTML = `
            <div onclick="loadDataMeal(${meal.idMeal})" class="col">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title text-center text-info">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            </div>
        `;
            divContainer.appendChild(div);
        });
        // document.getElementById('spinner-div').style.display = 'none';
    }
}

// load meal details data
const loadDataMeal = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    mealDetails(data.meals[0]);
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => mealDetails(data.meals[0]))
}

const detailContainer = document.getElementById('details-container');
const mealDetails = (meal) => {
    // console.log('meal field clicked', meal.strTags);
    detailContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
            <div " class="col">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title text-center text-info">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            </div>
        `;
    detailContainer.appendChild(div);
}



// document.getElementById("search-button").addEventListener("click", function () {
//     const searchValue = document.getElementById("search-field").value;
//     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
//         .then(response => response.json())
//         .then(data => {
//         console.log(data);
//         //searchValue.value ="";
//         displayMeal(data);
//     }).catch(error => {
//         console.log(error);
//         document.getElementById("no-meal-found").style.display = "block";
//     })
// })