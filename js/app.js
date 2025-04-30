// http://www.omdbapi.com/?i=tt3896198&apikey=1ccec928

const search = document.getElementById('search-btn')
const searchValueInput = document.getElementById('search-value')
const movieInfo = document.querySelector('.movie-body')
const exploring = document.querySelector('.exploring')
const watchlistBtn = document.querySelector('.watchlist-btn')
const notFound = document.querySelector('.not-found')

search.addEventListener('click', getMovies)


async function getMovies() {

    exploring.style.display = 'none'
    notFound.style.display = 'none'
    movieInfo.innerHTML = ''

    const searchValue = searchValueInput.value
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=1ccec928&s=${searchValue}`)
        const data = await res.json()

        const movieIds = data.Search.map(movie => movie.imdbID)

        movieIds.forEach(id => {
       
        const movies = fetch(`https://www.omdbapi.com/?apikey=1ccec928&i=${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                movieInfo.innerHTML += `
                    <section class="movie-container">
                        <img class="movie-img" id="movie-img" src="${data.Poster}" alt="">
                        <div class="movie-details">
                            <div class="title-rating">
                                <h2 class="movie-title" id="movie-title">${data.Title}</h2>
                                <img class="star" src="img/star.png" alt="">
                                <span class="rating" id="rating">${data.imdbRating}</span>
                            </div>
                            <div class="length-genre-watchlist">
                                <span>${data.Runtime}</span>
                                <span>${data.Genre}</span>
                                <div class="watchlist-add">
                                    <img class="watchlist-btn" src="img/add.png" alt="">
                                    <span>Watchlist</span>
                                </div>
                                
                            </div>
                            <p class="movie-paragraph" id="movie-paragraph">${data.Plot.slice(0, 132)}</p>
                            
                        </div>
                    </section>
                `
            })
        })
    } catch (error) {
        notFound.style.display = 'flex'
        return
    }
    
}
