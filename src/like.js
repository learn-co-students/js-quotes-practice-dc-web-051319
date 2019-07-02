class Like {
    constructor(like) {
        this.id = like.id 
        this.quoteId = like.quoteId
        this.all = Like.all.push(this) 
    }

    static createLike() {
        let quoteId = parseInt(this.dataset.quoteId)

        fetch('http://localhost:3000/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({quoteId: quoteId, createdAt: new Date().valueOf()
            })
        })
        .then(resp => resp.json())
        .then(like => new Like(like))

        this.innerText = `Likes: ${Like.numberOfLikes(quoteId) + 1}`
    }

    static numberOfLikes(quoteId) {
        return (Like.all.filter(like => like.quoteId == quoteId)).length
    }
}
Like.all = []