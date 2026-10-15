// Part 1: a pretend library. In Part 2 you replace fakeSearch with a real search using fetch.
// const FAKE_BOOKS = [
//   { key: "/works/OL893414W", title: "Dune", author_name: ["Frank Herbert"], first_publish_year: 1965 },
//   { key: "/works/OL35623W", title: "Parable of the Sower", author_name: ["Octavia E. Butler"], first_publish_year: 1993 },
//   { key: "/works/OL35616W", title: "Kindred", author_name: ["Octavia E. Butler"], first_publish_year: 1979 },
//   { key: "/works/OL66554W", title: "Pride and Prejudice", author_name: ["Jane Austen"], first_publish_year: 1813 },
//   { key: "/works/OL27513W", title: "The Fellowship of the Ring", author_name: ["J.R.R. Tolkien"], first_publish_year: 1954 },
//   { key: "/works/OL1168083W", title: "Nineteen Eighty-Four", author_name: ["George Orwell"], first_publish_year: 1949 },
// ];

// Pretends to be a slow website: after one second it calls whenDone with the books that match.
// function fakeSearch(query, whenDone) {
//   setTimeout(() => {
//     const q = query.toLowerCase();
//     const matches = FAKE_BOOKS.filter(
//       (book) =>
//         book.title.toLowerCase().includes(q) ||
//         book.author_name.some((name) => name.toLowerCase().includes(q))
//     );
//     whenDone(matches);
//   }, 1000);
// }



// ------------------------ PART 2 ---------------------------------
const form = document.querySelector("#search-form"); // form variable
const input = document.querySelector("#query"); // query variable
const statusMessage = document.querySelector("#status"); // status message variable
const results = document.querySelector("#results"); // basically the book list
console.log(form, input, statusMessage, results); // log contents of all variables

function renderResults(books) {
  results.textContent = "";
  books.forEach(function (book) {
    const li = document.createElement("li");
    li.textContent = book.title + " — " + book.author_name[0] + " (" + book.first_publish_year + ")";
    const save = document.createElement("button");
    save.textContent = "Save";
    save.addEventListener("click", function () {
      console.log("save", book.title);
    });
    li.append(save);
    results.append(li);
  });
}

// search query open library with appended user search, returns the data from JSON
async function searchBooks(query) {
  const url = "https://openlibrary.org/search.json?limit=10&q=" + encodeURIComponent(query);
  console.log("fetching", url);
  const response = await fetch(url);
  const data = await response.json();
  return data.docs;
}

// submit event listener, searches and displays books
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const query = input.value;
  console.log("searching for", query);

  // wait for books, then render in list
  statusMessage.textContent = "Searching...";
  const books = await searchBooks(query);
  console.log("got", books);
  renderResults(books);

  // if no books found, update status
  if (books.length === 0) {
    statusMessage.textContent = "No books found";
  } else {
    statusMessage.textContent = "";
  }
});