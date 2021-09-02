const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const bookMainDiv = document.getElementById("bookMainDiv");
const errorMessageDiv = document.getElementById("errorMessage");
const loadingMessageDiv = document.getElementById("loadingMessage");
searchButton.addEventListener("click", function () {
    let loading = "loading"
    const searchQuery = searchInput.value;
    if (searchQuery === '') {
        errorMessageDiv.innerText = 'Please Enter a value in search field';
        document.getElementById("total").innerText = ""
        bookMainDiv.innerHTML = ""
        return;
    }
    bookMainDiv.innerHTML = "";
    if(loading==="loading") {
        loadingMessageDiv.innerText = "Loading......."
        errorMessageDiv.innerText = ""
        document.getElementById("total").innerText = ""

       }

    const url = `https://openlibrary.org/search.json?q=${searchQuery}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            bookDisplayFunction(data.docs.slice(0, 30))
            loading = ""
        });

});



const bookDisplayFunction = (books) => {

    if (books.length === 0) {
        errorMessageDiv.innerText = "Sorry! No Results Found"
        document.getElementById("total").innerText = ""
        loadingMessageDiv.innerText = ""
    }
    else {
        searchInput.value = '';
        loadingMessageDiv.innerText = ""
        document.getElementById("total").innerText = `Number of Results ${books.length}`;

        errorMessageDiv.innerText = "";
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col-md-4')
            div.innerHTML = `
            <div class="card m-5 mainCard" style="width: ;">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid w-100" alt="No Book Image">
            <div class="card-body">
              <h3 class="card-title mt-2">${book.title}</h3>        
              <h5 class="card-subtitle mt-2">Author Name: ${book.author_name}</h5>
              <h5 class="card-subtitle mt-2">Publisher: ${book.publisher} </h5>
              <h5 class="card-subtitle mt-2">First Published: ${book.publish_date}</h5>
              </div>
    
          </div>
          
    `;
            bookMainDiv.appendChild(div);

        });
    };
}