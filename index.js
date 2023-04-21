let movie= "Scream"
let search = document.querySelector("#search");
search.addEventListener("click", getMovie)
search.addEventListener("input", (e)=>{
    movie = e.target.value;
    if(movie === ""){
        movie = "Scream"
    }
    getMovie();
})
document.addEventListener("DOMContentLoaded", getMovie)
function getMovie(){
    let url = `http://www.omdbapi.com/?apikey=a535cfbb&s=${movie}`
    fetch(url)
    .then(result =>{
        console.log(result);
        return result.json()
    })
    .then(date=>{
        console.log(date);
        printHTML(date.Search)
    })
}
function printHTML(cards){
    
    let contenido = document.querySelector("#cards")
    let plantilla = ""
    cards.forEach(card=>{
        let {Title, Year, imdbID, Type, Poster} = card
        plantilla +=`
    <div class="card bg-dark" style="width: 18rem;">
        <img src="${Poster}" class="card-img-top" alt="...">
    <div class="card-body bg-dark">
            <h5 class="card-title" style="color:white;">${Title}</h5>
            <p>Pelicula</p>
    </div>
    <ul class="list-group list-group-flush bg-dark">
        <li class="list-group-item bg-dark"style="color:white;">Type: ${Type}</li>
        <li class="list-group-item bg-dark"style="color:white;">Year: ${Year}</li>
        <button class="bg-success" style="border-color:transparent; color:white">Mostar mas</button>
     </ul>
    </div>
        `
    })  
    contenido.innerHTML = plantilla
    
}