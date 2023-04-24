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
        <li class="list-group-item bg-dark"style="border-color:transparent; color:white;">Type: ${Type}</li>
        <li class="list-group-item bg-dark"style="border-color:transparent; color:white;">Year: ${Year}</li>
        <button class="btn btn-primary btnDetalle" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" img="${Poster}" titulo="${Title}" year="${Year}" id="${imdbID}" tipo="${Type}">Mas Info</button>
      
     </ul>
    </div>
        `
    })  
    contenido.innerHTML = plantilla

    contenido.addEventListener('click', (e) => {
        let htmlTitle = '';
        let htmlModal = '';
        let htmlTable = '';
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');
  
        const btnDetalle = e.target.classList[2];
        if (btnDetalle == 'btnDetalle') {
          const img = e.target.getAttribute("img");
          const titulo = e.target.getAttribute("titulo");
          const year = e.target.getAttribute("year");
          const id = e.target.getAttribute("id");
          const type = e.target.getAttribute("tipo");
          htmlModal += `
          <img src="${img}">
          <table class="table text-light">
                  <thead>
                    <tr>
                      <th scope="col">Pelicula</th>
                      <th scope="col">Año</th>
                      <th scope="col">Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${titulo}</td>
                      <td>${year}</td>
                      <td>${id}</td>
                    </tr>
                   
                  </tbody>
                </table>
          `
          htmlTitle += `${titulo}`
          modalBody.innerHTML = htmlModal + htmlTable;
          modalTitle.innerHTML = htmlTitle;
  
        } else {
          console.log('Ño');
        }
       
      })
}
