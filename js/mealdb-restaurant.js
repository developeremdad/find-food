const spinner = document.getElementById('spinner-div');
const searchField = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if (searchText === '') {
        document.getElementById('error-empty').style.display = 'block';
        return;
    }
    else {
        loadData(searchText);
        searchField.value = '';
    }
}

// get input vlaue and check 
const loadData = (foodName) => {
    spinner.style.display = 'block';
        document.getElementById('error-empty').style.display = 'none';
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
}

// display searching food 
const displayFood = (meals) => {
    if (meals == null) {
        spinner.style.display = 'none';
        document.getElementById('error-msg').style.display = 'block';
        return;
        // alert('Error found');
    }
    else {
        spinner.style.display = 'none';
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
    spinner.style.display = 'block';
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
    spinner.style.display = 'none';
    // console.log('meal field clicked', meal.strTags);
    detailContainer.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('row', 'justify-content-center');
    div.innerHTML = `
            <div class="col-lg-4">
                <div class="card">
                    <h4 class="text-center text-warning mb-4 bg-light p-2">Product Details</h4>
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title text-center text-info">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button class="btn btn-primary px-5" type="button">Order Now</button>
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