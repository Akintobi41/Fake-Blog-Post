let loadOut = document.querySelector('#loading'),

  newBody = document.querySelector('body')

  open = document.querySelector('#open'),

  postTitle = document.querySelector('.post-title'),

  postText = document.querySelector('.post-text'),

  inputSearch = document.querySelector('input[type=search'),

  modal_container = document.querySelector('.modal-container'),

  close = document.querySelector('.submit'),

  btn_prev = document.querySelector('#btn_prev'),

  btn_next = document.querySelector('#btn_next'),

  postFooter = document.querySelector('footer'),

  selectBtn = document.querySelector('select'),

  section = document.querySelector('.section'),

  // For Pagination 
  current_page = 1,

  records_per_page = 8,

  page_span = document.querySelector('#page'),
  // 

  newId = 100;  // For adding new ID's after fetching new cards

let miniContainer; // For appending the new containers after fetching

const user = fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => {
    loaderWrapper.style.display = "none"
    return response
  });

// Loader Display
const loaderWrapper = document.querySelector(".loader-icon");
loaderWrapper.style.display = "grid"
postFooter.style.display = "none";
//

// Fetch and add cards to UI
const loadCards = async () => {
  let newPost = await user;

  if (newPost.status === 200) {
    postFooter.style.display = "flex";
  }

  let card = await newPost.json();

  card.forEach(function (item, index) {
    // Creating cards UI
    let div = document.createElement('div'),
      p = document.createElement('p');

    p.textContent = item.body;

    let img = document.createElement('img');
    img.src = "/invalid.png";
    img.classList.add('close-image');

    let new_img = document.createElement('img');
    new_img.src = "/create-outline.svg";
    new_img.classList.add('edit-content');

    // Appending cards and new elements to section
    div.appendChild(p);
    div.appendChild(img);
    div.appendChild(new_img);
    section.appendChild(div);
    div.classList.add('mini-container');
    p.classList.add('text-content');
    p.id = index + 1;
    img.addEventListener('click', deleted, { once: true });
    new_img.addEventListener('click', runEdit, { once: true })
  });

  miniContainer = document.querySelectorAll('.mini-container'); // Assigning the new cards to the miniContainer variable
  changePage(1); // Pagination
  inputSearch.addEventListener('input', newResults); // Searching Content
  selectBtn.addEventListener('change', sortContent); // Sorting Content
}

loadCards();
//

// Submitting new content after posting
let closeModal = async () => {
  // Updated styles for submit button
  close.style.backgroundColor = "transparent";
  close.style.color = "#f5f5f5";
  close.style.cursor = "not-allowed";

  let user = fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: postTitle.value,
      body: postText.value,
      userId: newId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },

  }).then(data => data.json())

  let newData = await user;

  if (newData.status === 201) {
    modal_container.style.display = "none";
    modal_container.classList.remove('show');

    section.style.display = "flex";
    postFooter.style.display = "flex";

    // Revert styles for Submit button
    close.style.backgroundColor = "#3f4b9d";
    close.style.cursor = "pointer";

    let addedPost_data = await user,
      usable_data = await addedPost_data.json(),

      newUser = []; // Array to store new data 

    newUser.push(usable_data)

    newUser.forEach(function (elements) {
      let firstContainer = document.querySelector('.mini-container'),
        div = document.createElement('div'),
        p = document.createElement('p');

      p.textContent = elements.body;

      let img = document.createElement('img'),
        img2 = document.createElement('img');

      img.src = "/invalid.png";
      img2.src = "/create-outline.svg";

      img.classList.add('close-image');
      img2.classList.add('edit-content');

      div.appendChild(p);
      div.appendChild(img);
      div.appendChild(img2);

      section.insertBefore(div, firstContainer);

      miniContainer = Array.from(miniContainer)  //  Updated miniContainer
      miniContainer.unshift(div)                 // Updated search results to include newly added posts

      div.classList.add('mini-container');
      p.classList.add('text-content');

      p.id = newId;

      img.addEventListener('click', deleted, true);

      img2.addEventListener('click', function (e) {

        let postTitle = document.querySelector('.post-title'),

          postText = document.querySelector('.post-text');

        close.removeEventListener('click', closeModal);

        postFooter.style.display = "none";
        section.style.display = "none";
        postTitle.value = e.target.previousSibling.previousSibling.id.title;
        postText.value = e.target.previousSibling.previousSibling.textContent;

        new_text = e.target.previousSibling.previousSibling;
        if (postTitle.value == "undefined") {
          postTitle.value = "No Title";
        }

        modal_container.style.display = "flex"
        modal_container.classList.add('show');

        let patchResource = async (e) => {

          new_text.textContent = postText.value;

          fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PATCH',
            body: JSON.stringify({
              title: postTitle.value,
              body: postText.value

            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())

          modal_container.style.display = "none";
          modal_container.classList.remove('show');
          section.style.display = "flex";
          postFooter.style.display = "flex";

          e.stopImmediatePropagation();
        }
        close.addEventListener('click', patchResource);
      })

    });

  }
}


// Posting new content
open.addEventListener('click', postContent)

function postContent(e) {
  postTitle.value = '';                     // Empty input field
  postText.value = '';                      // Empty input field

  modal_container.style.display = "flex";   // Show Modal
  modal_container.classList.add('show');    // Add class to the modal

  section.style.display = "none";           // Hide content
  postFooter.style.display = "none";        // Hide footer showing pagination

  newId++;
  close.addEventListener('click', closeModal, { once: true })   // Making posts post only once
}

const refreshBtn = document.querySelector('.all-posts');

refreshBtn.addEventListener('click', loadCards)  // Refresh Page


// Delete Items
let deleted = async (e) => {

  const loaderWrapper = document.querySelector(".loader-icon")
  loaderWrapper.style.display = "grid"

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${e.target.previousSibling.id}`, {
      method: 'DELETE',
    })

    if (res.ok == true) {
      let child = e.target.parentElement;
      child.parentElement.removeChild(child)
    }
  }
  catch (e) {
    console.error(e)
  }
  finally {
    e.stopPropagation();
    loaderWrapper.style.display = "none";
  }

};
//


// Editing Content

let runEdit = async (e) => {
  e.stopPropagation();   // new change
  modal_container.style.display = "flex";

  try {
    let new_card = await fetch('https://jsonplaceholder.typicode.com/posts'),
      card1 = await new_card.json()

    postFooter.style.display = "none";

    section.style.display = "none";

    postTitle.value = card1[e.target.previousSibling.previousSibling.id].title;

    postText.value = e.target.previousSibling.previousSibling.textContent;

    new_text = e.target.previousSibling.previousSibling;

    modal_container.classList.add('show');
  }
  catch (error) {
    console.error("Error occurred during editing")
  }

  let patchResource = async () => {
    new_text.textContent = postText.value;

    fetch('https://jsonplaceholder.typicode.com/posts/`${card[e.target.previousSibling.previousSibling.id].id}`', {

      method: 'PATCH',
      body: JSON.stringify({
        title: postTitle.value,
        body: postText.value

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())

    modal_container.style.display = "none";
    modal_container.classList.remove('show');
    section.style.display = "flex";
    postFooter.style.display = "flex";

  }
  close.addEventListener('click', patchResource, { once: true });
};
// Editing content 
//Dark Mode Effect
const body = document.querySelector('body'),
  toggle = document.getElementById('toggle'),
  postDiv = document.querySelector('.post-div .posts'),
  postLink = document.querySelector('.post-div a');

toggle.addEventListener('click', function () {
  toggle.classList.toggle('active');
  body.classList.toggle('active');
  postDiv.classList.toggle('active');
  postLink.classList.toggle('active');
})

// Pagination

function prev() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page)
  }
}

function next() {
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page)
  }

}

function changePage(page) {
  if (page < 1) page = 1;  // starting point;

  if (page > numPages) page = numPages(); // ending point

  section.innerHTML = '';
  btn_next.addEventListener('click', next);
  btn_prev.addEventListener('click', prev);

  for (let i = (page - 1) * records_per_page; i < (page * records_per_page) && i < miniContainer.length; i++) {
    section.appendChild(miniContainer[i]);
  }

  page_span.innerHTML = `${page}/${numPages()}`

  if ((page) == 1) {
    btn_prev.style.visibility = "hidden";
  }
  else {
    btn_prev.style.visibility = "visible";
  }
  if ((page) == numPages()) {
    btn_next.style.visibility = "hidden";
  }
  else {
    btn_next.style.visibility = "visible";
  }

}

function numPages(page) {
  return Math.ceil(miniContainer.length / records_per_page)
}

//
