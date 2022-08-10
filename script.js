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
