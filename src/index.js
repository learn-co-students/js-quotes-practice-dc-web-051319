// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener('DOMContentLoaded', function(){
    Quote.getQuotes()
    newQuoteForm().addEventListener('submit', Quote.createQuote)
    sortButton().addEventListener('click', Quote.sortQuotes)
})

// Selectors

function quoteList(){
    return document.getElementById('quote-list')
}

function newQuoteForm(){
    return document.getElementById('new-quote-form')
}

function quoteLi(quoteId){
    return document.getElementById(quoteId)
}

function sortButton(){
    return document.getElementById('sortButton')
}


