//anonymous function

$(function() {
    /*Bindings that execute when page loads*/

   //All recipe API calls
   loadRecipes() // load all recipes in API
   $("#addRecipeBtn").click(addRecipe) // add in a new custom recipe in API
   $("#recipeDisplay").on("click", "#deleteBtn" , deleteRecipe) // delete any new or old recipe from API
})



function loadRecipes(){
    $.ajax({
        url: "https://usman-cui-recipies.herokuapp.com/api/recipes",
        method: "GET",
        error: function (res){
            var fetchDiv = $("#recipeDisplay")
            fetchDiv.html(`<h3 style="color:red"> An Erorr Has Occured, Cannot Fetch the Content at this time! </h3>`)
            console.log("An Error Occurred " + res)
        },
        success: function (res) {

            $("#recipeDisplay").empty()
            
            for (let i=0;i<res.length;i++){
                let recipeData = res[i]
                console.log("Recipe name=" + recipeData.title + " & Recipe ID = " + recipeData._id)
                $("#recipeDisplay").append(`<div class="recipeDiv" id="recipeDisplay" recipeID="${recipeData._id}"> <h5>${recipeData.title}</h5> <p> ${recipeData.body} </p> <button class="btn btn-info" id="editBtn"> Edit </button> <button class="btn btn-danger" id="deleteBtn"> Delete </button> </div>`)
            }
        }
    })
}

function addRecipe(){
    var recipeName = $("#recipeName").val()
    var recipeDescription = $("#recipeDescription").val()

    $.ajax({
        url:"https://usman-cui-recipies.herokuapp.com/api/recipes",
        method:"POST",
        //title and body are names of actual API's attributes/props.
        data: {title: recipeName, body: recipeDescription},
        error: function(res){console.log("Failed to Add Recipe!" + res)},

        success: function (res) {
            console.log("Recipe Entry Successfull")
            loadRecipes()
        }


    })

}

function deleteRecipe(){
    console.log("Delete button pressed!")
    //selecting the currently clicked div
    var delBtn = $(this)
    var parentDiv = delBtn.closest(".recipeDiv")
    id = parentDiv.attr("recipeID")
    

    console.log("Recipe ID to be Deleted = " + id)

   
    $.ajax({
        url:'https://usman-cui-recipies.herokuapp.com/api/recipes/'+id,
        method:"DELETE",

        success: function(res){
            loadRecipes() 
        }
    })
    

}

//update any existing recipe using this function
function editRecipe(){
    var editBtnID = $(this)
    var parentDiv = editBtnID.closest(".recipeDiv")
    id = editBtnID.attr("recipeID")

    console.log(`Editing Recipe of ID = ${id}`)
} 
