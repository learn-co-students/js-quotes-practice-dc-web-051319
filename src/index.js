// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.


//1. When DOMContentLoaded, get fetch the server, dom render the quotes
//2. When submit of the form, POST fetch, add one more quote to the ul


document.addEventListener("DOMContentLoaded", () => {
  getForm().addEventListener("submit", addQuote)
  getQuotes()
})

function getForm(){
  return document.getElementById("new-quote-form")
}

function addQuote(event){
event.preventDefault()
let quote = event.target.querySelector("#new-quote").value
let author = event.target.querySelector("#author").value
fetch('http://localhost:3000/quotes', {

 method: "POST",
 headers: {
   'Content-Type': 'application/json'},
body: JSON.stringify({"quote": quote,
                      "author": author
                              })
})
.then(resp => resp.json())
.then(data => renderQuote(data))

}

function getQuotes(){
  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(res => res.json())
  .then(data => {
    data.forEach(quote => {
      renderQuote(quote)
    })
  })
}

function renderQuote(quote){
  //do something with each quote
  console.log(quote)
  let li = document.createElement("li")
  getUl().appendChild(li)
  li.classList.add("quote-card")
  li.id = quote.id


  let blockquote = document.createElement('blockquote')
  li.appendChild(blockquote)
  blockquote.classList.add('blockquote')

  let p = document.createElement('p')
  let footer = document.createElement('footer')
  let br = document.createElement('br')
  let button1 = document.createElement('button')
  let button2 = document.createElement('button')
  button2.addEventListener("click", function(){
    // console.log(quote)
    deleteQuote(quote)
  })
  blockquote.append(p, footer, br, button1, button2)

  //styling
  p.classList.add("mb-0")
  p.innerText = quote.quote
  footer.classList.add("blockquote-footer")
  footer.innerText = quote.author
  button1.innerText = "Likes: "
  button1.classList.add("btn-success")
  let span = document.createElement('span')
  button1.append(span)
  if(quote.likes){
    span.innerText = quote.likes.length
  }else{
    span.innerText = "0"
  }
  button2.innerText = "Delete"
  button2.classList.add("btn-danger")
}

function getUl() {
  return document.querySelector('ul')
}

function deleteQuote(quote){
  // console.log(event)

      fetch(`http://localhost:3000/quotes/${quote.id}`,{
        method: "DELETE"
      }).then(response => response.json())
      .then( data => {
        let li = document.getElementById(`${quote.id}`)
        li.remove()
      })
}








//
