# JavaScript Quotes Practice
- 1. Read directions (you won't understand everything yet)
- 2. Get to know your starter code (DOM/html) and your data (server's data)
- 3. Re-read directions (things should make more sense)
- 4. User stories (see quotes, Submit the form to create a new quote, click delete button to delete quote)
    - Think about how to translate into the 3 pillars

## Learning Goals

1. Use `json-server` to provide a basic RESTful data store
2. Build a simple, event-driven, JavaScript DOM-modifying application

## Introduction

Hello, let's build a simple app that allows us to keep track of our favorite quotes and who said them.

## Use `json-server` to Provide a Basic RESTful Data Store

If you don't have `json-server` installed, run `$ npm i -g json-server`.

If you already have it installed, run the server by: `$ json-server --watch
db.json`.

## Build a simple, Event-driven, JavaScript DOM-modifying application

* Populate page with quotes with a `GET` request to
  `http://localhost:3000/quotes?_embed=likes`.

* Each quote should have the following structure:
  ```html
    <li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer class="blockquote-footer">Someone famous</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
  ```

* Submitting the form creates a new quote and adds it to the list of quotes
  without having to refresh the page. (Whether you choose to optimistically
  render or not is up to you).

* Clicking the delete button should delete the respective quote from the
  database and remove it from the page without having to refresh.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Clicking the like button will create a like for this particular quote in the
  API and update the number of likes displayed on the page without having to
  refresh.
  * Use a `POST` request to `http://localhost:3000/likes`
  * The body of the request should be a JSON object containing a key of
    `quoteId`, with an _integer_ value. Use the ID of the quote you're creating
    the like for — e.g. `{ quoteId: 5 }` to create a like for quote 5. IMPORTANT:
    if the `quoteID` is a string for some reason (for example, if you've pulled
    the ID from a dataset) the index page will not include the like you
    create on _any_ quote.
  * Bonus (not required): add a `createdAt` key to your object to track when
    the like was created. Use [UNIX time][] (the number of seconds since
    January 1, 1970). The  [documentation][] for the JS `Date` class may be
    helpful here!

## Extend Your Learning

* Add an edit button to each quote-card that will allow the editing of a quote. _(Hint: there is no 'correct' way to do this. You can try creating a hidden form that will only show up when hitting the edit button.)_
  * Add a sort button that can be toggled on or off. When off the list of
    quotes will appear sorted by the ID. When the sort is active, it will
    display the quotes by author's name, alphabetically.
  * One way of doing this is to sort the quotes in JS after you've retrieved them from the API. Try this way first.
  * Another way of doing this is to make a fetch to `http://localhost:3000/quotes?_sort=author`
  * What are the pros and cons in doing the sorting on the client vs. the server? Discuss with a partner.

## Conclusion

Building an application like this is a typical interview exercise. It's not
uncommon to be set in front of a foreign computer (or asked to bring your own)
and to receive a specification like this.

[UNIX time]: https://en.wikipedia.org/wiki/Unix_time
[documentation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
