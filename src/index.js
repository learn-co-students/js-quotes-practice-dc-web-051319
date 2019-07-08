// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener('DOMContentLoaded', init)


function init() {
  getQuotes()
  form().addEventListener('submit', addQuote)
}


const QUOTES = "http://localhost:3000/quotes"
const LIKES = "http://localhost:3000/likes"


function getQuotes() {
  fetch(`${QUOTES}/?_embed=likes`).then(r => r.json())
  .then(quotes => quotes.forEach(quote => renderCard(quote)))
}


function addQuote(e) {
  e.preventDefault()
  const quote = form().querySelector('#new-quote').value
  const author = form().querySelector('#author').value
  
  fetch(QUOTES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({quote: quote, author: author, likes: []})
  })
  .then(r => r.json()).then(quote => renderCard(quote))
  .catch(error => alert('Error:', error));
}


function deleteQuote() {
  const quote = event.target.closest('.quote-card')
  const id = quote.dataset.id

  fetch(`${QUOTES}/${id}`, {method: "DELETE"})
  .then(r => r.json).then(quote.remove())
}


function likeQuote() {
  const quote = event.target.closest('.quote-card')
  const id = parseInt(quote.dataset.id)
  const likes = event.target.querySelector('span')

  fetch(LIKES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      quoteId: id, 
      createdAt: Date.now()
    })
  })
  .then(r => r.json()
  .then(likes.innerText = parseInt(likes.innerText) + 1))
}


function renderCard(quote) {
  const quoteList = document.getElementById('quote-list')

  const card =`
  <li class='quote-card' data-id=${quote.id}>
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <button class='btn-success' onclick="likeQuote()">Likes: <span>${quote.likes.length}</span></button>
      <button class='btn-danger' onclick="deleteQuote()">Delete</button>
    </blockquote>
  </li>`

  quoteList.innerHTML += card
}


function form() {
  return document.querySelector('#new-quote-form')
}