document.addEventListener('DOMContentLoaded', init())

function init(){
    fetchQuotes()
    gettingForm()
}

/////////////////////////CREATING ELEMENTS///////////////////////////////
function createLi(){
    let li = document.createElement("li")
    li.classList.add('quote-card')
    return li
}

function createBlockQuote(){
    let blockQuote = document.createElement('BLOCKQUOTE')
    blockQuote.classList.add('blockquote')
    return blockQuote
}

function createPar(){
    let p = document.createElement('p')
    p.classList.add('mb-0')
    return p
}

function createFooter(){
  let foot = document.createElement('footer')
  foot.classList.add('blockquote-footer')
  return foot
}

function createButton(){
    let btn = document.createElement('btn')
    return btn
}

function createSpan(quote){
   let span = document.createElement('span')
   span.innerText = quote.likes.length
    return span
}

/////////////////////GETTING ELEMENTS/////////////////////////
function getUl(){
   let ul =  document.getElementById('quote-list')
   return ul
}

function quoteForm(){
    let quote = document.querySelector('#new-quote').value
    return quote
}

function authorForm(){
   let author = document.querySelector('#author').value
   return author
}
document.querySelector('#author').value

/////////////////////GETTING ALL OF THE QUOTES/////////////////////
function fetchQuotes(){
    fetch('http://localhost:3000/quotes?_embed=likes')
        .then(resp => resp.json())
        .then(data => data.forEach(getQuotes))
}

///////////////////PUT EACH QUOTE TO DOM/////////////////////////////
function getQuotes(quote){
    let ul = getUl()
    let li = createLi()
    li.id = quote.id
    let block = createBlockQuote()
    let p = createPar()
        p.innerText = quote.quote
    let footer = createFooter()
        footer.innerText = quote.author
    let btn1 = createButton()
        btn1.classList.add('btn-success')
        btn1.innerText = 'Likes: '
    let span = createSpan(quote)
        btn1.append(span)
        btn1.addEventListener('click', (e) => addingLikes(e, quote))
    let btn2 = createButton()
        btn2.classList.add('btn-danger')
        btn2.innerText = 'Delete'
        btn2.addEventListener('click', (e) => deleteQuote(e, quote))
    let br = document.createElement('br')
    block.append(p, footer, br, btn1, btn2)
    li.append(block)
    ul.appendChild(li)
}

///////////////////ADDING QUOTES TO DOM && DATABASE///////////////////////////

function gettingForm(){
    let form = document.getElementById('new-quote-form')
    form.addEventListener('submit', newQuote)
    return form
}

function newQuote(e){
 e.preventDefault()
 let quote = quoteForm()
 let author = authorForm()
 form = gettingForm()
 
 
    fetch('http://localhost:3000/quotes?_embed=likes',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            quote: quote,
            author: author,
            likes: []
        })
    })
    .then(resp => resp.json())
    .then(data => {
        getQuotes(data)
    })
   form.reset()
}

///////////////////DELETING QUOTES///////////////////////

function deleteQuote(e, quote){
    let li = e.target.parentElement.parentElement
    let ul = getUl()
    ul.removeChild(li)
    fetch(`http://localhost:3000/quotes/${quote.id}`,{
        method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(data => data)
}


/////////////////ADDING LIKES/////////////////////////////

function addingLikes(e, quote){
    e.preventDefault()
    
    let quoteId= quote.id 
    let createdTime = Date.now()
    

    fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            quoteId: quoteId,
            createdAt: createdTime
        })
    })
    .then(resp => resp.json())
    .then(data => {console.log(data)})
    getLikes(e)
}

function getLikes(e){
    let like = parseInt(e.target.children[0].innerText)
    like += 1
    return e.target.children[0].innerText = `${like}`
}