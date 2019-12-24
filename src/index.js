// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 


///LIKES ARENT WORKING RIGHT, DELETE AND POST IS WORKING
///WHEN  I ADD NEW QUOTE IT COMES OUT AS UNDEFINED AT FIRST BUT THEN  REVERTS TO 0 AFTER REFRESH

let quotesGet = "http://localhost:3000/quotes?_embed=likes"
let quotesGet2 = "http://localhost:3000/quotes"
let likesUrl =  "http://localhost:3000/likes"


document.addEventListener("DOMContentLoaded", ()=>{
    fetchContent()
    
    getForm().addEventListener("submit", addQuote)
})

function addLike(event){
    // debugger
    id = event.target.id
    fetch(likesUrl+"/"+id, {
        method: "POST",
        headers: {"contentType": "application/json"},
        body: JSON.stringify(event)
        }).then(response => response.json())
        .then(data => console.log(data))

}

function addQuote(event){
    event.preventDefault()
    debugger
    let quote = document.getElementById("new-quote").value
    let author = document.getElementById("author").value
    // let likes = "0"

    console.log("adding quote")
    fetch(quotesGet, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "appliction/json"
        },
        body: JSON.stringify({
            "quote": quote,
            "author":  author,
            // "likes":  0
        })
    })
        .then(response => response.json())
        .then(result => renderQuote(result))
         
    }





function fetchContent(){
    fetch(quotesGet)
    .then(response => response.json())
    .then(quotes => quotes.forEach(quote => renderQuote(quote)))
}

function renderQuote(quote){
    
    let quoteCard = document.createElement("li")
    quoteCard.className += "quote-card"
    quoteCard.dataset.cardId = quote.id
    
    
    let blockQuote = document.createElement("blockquote")
    blockQuote.className += "blockQuote"
    

    let p= document.createElement("p")
    p.className += "mb-0"
    p.innerText = quote.quote

    let footer = document.createElement("footer")
    footer.className += "blockquotte-footer"
    footer.innerText = quote.author

    let br = document.createElement("br")

    let likeButton = document.createElement("button")
    likeButton.className += "btn-success"
    likeButton.id = quote.id
    likeButton.addEventListener('click', addLike)
  

    let span = document.createElement('span')
    span.innerText = quote.likes.length

    let deleteButton = document.createElement("button")
    deleteButton.className += "btn-danger"
    deleteButton.innerText = "Delete"
    deleteButton.addEventListener('click', deletePost)


    likeButton.append(span)
    blockQuote.append(p,footer,br,likeButton,deleteButton)
    quoteCard.append(blockQuote)
    getQuoteList().appendChild(quoteCard)
}



function deletePost(event){
    let currentChild = event.currentTarget
    fetch(quotesGet2+'/'+ getQuoteCardId(event), {
        method: 'DELETE',
        })
        .then(res => res.json()) 
        .then(res => console.log(res))
        currentChild.parentElement.parentElement.remove()
}

////selctorssss

function getQuoteList(){
    return document.querySelector("#quote-list")  
}

function getQuoteCardId(event){
return event.target.parentElement.parentNode.dataset.cardId
}

function getForm(){
    return document.querySelector("form")
}