class Quote {
    constructor(obj){
        this.author = obj.author 
        this.id = obj.id 
        this.quote = obj.quote 
        this.all = Quote.all.push(this) 
    }

     addQuote(){
        let li = document.createElement('li')
        li.classList.add('quote-card')
        li.id = this.id
    
        let blockquote = document.createElement('blockquote')
        blockquote.classList.add('blockquote')
    
        let p = document.createElement('p')
        p.classList.add('mb-0')
        p.innerText = this.quote
    
        let footer = document.createElement('footer')
        footer.classList.add('blockquote-footer')
        footer.innerText = this.author
    
        let br = document.createElement('br')
    
        let btnLikes = document.createElement('button')
        btnLikes.classList.add('btn-success')
        btnLikes.innerText = `Likes: ${Like.numberOfLikes(this.id)}`
        btnLikes.addEventListener('click', Like.createLike)
        btnLikes.dataset.quoteId = this.id

        let btnEdit = document.createElement('button')
        btnEdit.classList.add('btn-warning')
        btnEdit.innerText = "Edit"
        btnEdit.addEventListener('click', this.editQuoteForm)
        btnEdit.dataset.quoteId = this.id
        

        let btnDelete = document.createElement('button')
        btnDelete.classList.add('btn-danger')
        btnDelete.innerText = "Delete"
        btnDelete.addEventListener('click', this.deleteQuote)
        btnDelete.dataset.quoteId = this.id
    
        blockquote.append(p, footer, br, btnLikes, btnEdit, btnDelete)
        li.append(blockquote)
        quoteList().append(li)
    }

    static editQuote(event){
        event.preventDefault()
       
        let quote = Quote.findQuote(this.dataset.quoteId)
        let newQuote = this.editQuote.value

        fetch(`http://localhost:3000/quotes/${this.dataset.quoteId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({quote: newQuote})
        })
        .then(resp => resp.json())
        .then(editedQuote =>{
            quote.quote = editedQuote.quote
            let p = document.createElement('p')
            p.innerText = editedQuote.quote
            this.parentNode.replaceChild(p, this.parentNode.firstChild )
        })
    }

    editQuoteForm(){
        console.log(this, this.parentNode.firstChild)
        let form = document.createElement('form')
        form.addEventListener('submit', Quote.editQuote)
        form.dataset.quoteId = this.dataset.quoteId
        
        let input = document.createElement('input')
        input.value = this.parentNode.firstChild.innerText
        input.classList.add('form-control')
        input.name = "editQuote"

        let submitButton = document.createElement('button')
        submitButton.innerText = "Submit"
        submitButton.classList.add('btn-primary')
        submitButton.type = 'submit'

        form.append(input, submitButton)
        this.parentNode.replaceChild(form, this.parentNode.firstChild )
    }

    deleteQuote(){
        let quoteId = this.dataset.quoteId
        
        // quote = Quote.findQuote(quoteId)
        fetch(`http://127.0.0.1:3000/quotes/${quoteId}`,{
            method: 'DELETE'
        })
        quoteLi(quoteId).remove()
    }

    static addQuotes(){
        Quote.all.forEach(quote => quote.addQuote())
    }

    static sortQuotes(){
        quoteList().innerHTML = ''
        let currentStatus = this.innerText.split(" ")[2]
        
        if (currentStatus === "Author") {
            this.innerText = "Sort by: ID"
            let sortedQuotes = [...Quote.all]
            sortedQuotes.sort((a, b) => {
                let x = a.author.toLowerCase();
                let y = b.author.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
            sortedQuotes.forEach(quote => quote.addQuote())
        } else {
            this.innerText = "Sort by: Author"
            Quote.addQuotes()
        }
    }

    static getQuotes(){
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(resp => resp.json())
        .then(quotes => {
            quotes.forEach(quote => {
                new Quote(quote)
                quote.likes.forEach(like => new Like(like))
            })
            Quote.addQuotes()
            console.log(quotes)
        })
    }

    static createQuote(event){
        event.preventDefault()

        let data = {
            quote: this.quote.value, 
            author: this.author.value,
        }

        fetch('http://localhost:3000/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(quote => {
            let newQuote = new Quote(quote)
            newQuote.addQuote()
        })
    }

    static findQuote(quoteId){
        return Quote.all.find(quote => quote.id == quoteId)
    }
}
Quote.all = []