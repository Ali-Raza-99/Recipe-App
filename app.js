(async function(){

     const response = await fetch("./recipes.json");
     const recipes = await response.json();
     const ul = document.getElementById('recipe-list')
     const title = document.getElementById('title')
     const detailArea = document.getElementById('detailArea')
     // console.log(recipes)

     const input = document.getElementById('inp')
     const btnElem = document.getElementById('search-btn')

     function search() {

          let query = input.value
          if (query.length  < 4 && isNaN(query) ) {
               alert('please enter atleast a word')
               input.value = ''

          }
   
           else if (isNaN(query) ) {
               

                    ul.innerHTML = ''
                    const results = recipes.filter(function (recipe) {
                         return (recipe.title.toLowerCase().includes(query) ||
                         recipe.ingredients.join(' ').toLowerCase().includes(query))
                         // if (query != recipe.title.toLowerCase().includes(query)) {
                         //      alert('recipe not found')
                         // }
                    })
                    displaySearchResults(results)
                    console.log(results)
                    
                    input.value = ''
               }
               else if(!isNaN(query)){
                    alert('Numbers are not allowed')
                    input.value = ''
               }
               
       

     
    
     }


     function displaySearchResults(results){
   
          
          results.forEach(element => {
          const li = document.createElement('li')
              li.innerHTML = `
              <div id="title" class="mt-2 title shadow p-2 rounded">${element.title}</div>
        `
              ul.appendChild(li)
              li.addEventListener('click',function () {
              loadRecipeDetails(element)
              })
          });

          // showIngredients(results)
     }

     function loadRecipeDetails(element){
          // detailArea.innerHTML = ''
          detailArea.innerHTML = `
          <div class="dynamic-detail-area">
          <h5 class="p-2 mx-4" id="recipe-name">${element.title}</h5>
        <ul class="p-2 mx-4" id="recipe-detail-container">${element.ingredients.map(function(ingredients){
          return `<li> ${ingredients}</li>`
        }).join("")}</ul> 
        <h5 class=' p-2 mx-4'>Instructions</h5>
        <div class='instruction p-2 mx-4'>${element.instructions}</div>
        </div>
          `
          
     }

   
     btnElem.addEventListener('click',search)

})();