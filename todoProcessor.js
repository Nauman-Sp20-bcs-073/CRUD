//anonymous function

$(function() {
    /*Bindings that execute when page loads*/

        handleContent()
   $("#Posts").on("click", "div" , getID)

   //All recipe API calls
   loadRecipes() // load all recipes in API
   $("#addRecipeBtn").click(addRecipe) // add in a new custom recipe in API
   $("#recipeDisplay").on("click", "#deleteBtn" , deleteRecipe) // delete any new or old recipe from API
})

function handleContent(){
    $.ajax({
        url:'https://jsonplaceholder.typicode.com/posts',
        method:'GET',
        error: function (res){
            var fetchDiv = $("#Posts")
            fetchDiv.html(`<h2> An Erorr Has Occured, Cannot Fetch the Content at this time! </h2>`)
            console.log("An Error Occurred " + res)
        },
        success: function(res){
         $('#Posts').empty();
         console.log(res);
         for(let i=0;i<res.length;i++){
            let data=res[i];
            $('#Posts').append(`<div id="posts-child" text_id=${data.id}> <h4>Title:</h4> ${data.title} </div>`)
         }

        },

    })
}

function getID(){
    //selecting the currently clicked div
    var div_id = $(this)
  // var Posts_div = div_id.closest("#posts-child")
    var id = div_id.attr("text_id")

    console.log(id)

    $.ajax({
        url:'https://jsonplaceholder.typicode.com/posts/'+id,
        method:"DELETE",

        success: function(){
            handleContent()
        }
    })

    

}
