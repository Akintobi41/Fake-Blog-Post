let loadOut = document.querySelector('#loading');

let open = document.querySelector('#open');

let inputSearch = document.querySelector('input[type=search');

let modal_container = document.querySelector('.modal-container');

let close = document.querySelector('.submit');

const postTitle = document.querySelector('.post-title');

const postText = document.querySelector('.post-text');

let btn_prev = document.querySelector('#btn_prev');

let btn_next = document.querySelector('#btn_next');

// For Pagination 

let current_page = 1;

let records_per_page = 12;

//

let page_span = document.querySelector('#page')

let newId = 100;

let user = fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response)

let section = document.querySelector('.section');

section.classList.add('section');
loadOut.style.display = "block";

loadOut.style.top = "40%";


const loadCards = async () => {

  let newPost = await user;

  if (newPost.status === 200) {
  
    loadOut.style.display = "none";
    loadOut.style.top = "initial";
    loadOut.style.left = "initial";

  }

  let card = await newPost.json();

  card.forEach(function (item, index) {
  
    let div = document.createElement('div');
  
    let p = document.createElement('p');
  
    p.textContent = item.body;

    let img = document.createElement('img');
    img.src = "/invalid.png";
    img.classList.add('close-image');

    let new_img = document.createElement('img');
    new_img.src = "/create-outline.svg";
    new_img.classList.add('edit-content') 


    div.appendChild(p);
    div.appendChild(img)
    div.appendChild(new_img)
    section.appendChild(div);
    div.classList.add('mini-container');
    p.classList.add('text-content');
    p.id = index + 1;
    img.addEventListener('click', deleteElement);
  
  });

  let new_text;
  let editContent = document.querySelectorAll('.edit-content');

  editContent.forEach(function(editBtn){ 

        editBtn.addEventListener('click',function(e){ 
        modal_container.classList.add('show');
      section.style.display = "none";
      postTitle.value = card[e.target.previousSibling.previousSibling.id].title;
      postText.value = e.target.previousSibling.previousSibling.textContent;

      // e.target.previousSibling.previousSibling = postText.value;
      //
      // e.stopPropagation();
      new_text  =  e.target.previousSibling.previousSibling;    
      close.removeEventListener('click',closeModal);
      close.removeEventListener('click',postNewData);

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
         
          modal_container.classList.remove('show');
          section.style.display = "flex";

        e.stopImmediatePropagation();
          
        }
        close.addEventListener('click',patchResource);  
        // e.stopImmediatePropagation();
    
    });

  }) 
    
    
 
   

   // editing content 
  
 
  
  let miniContainer = document.querySelectorAll('.mini-container');

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

    let page_span = document.querySelector('#page')

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

  changePage(1);

  inputSearch.addEventListener('input',newResults);


  function newResults(){ 

    let newSection = Array.from(miniContainer).filter(function(item){
       return item.textContent.startsWith(inputSearch.value);
  })
  
    section.innerHTML = '';
     
    section.append(...newSection)

    btn_next.removeEventListener('click', next);
    btn_prev.removeEventListener('click', prev);

  let current_page1 = 1;

    function prev2() {

      if (current_page1 > 1) {
          current_page1--;
          changePage(current_page1)
        }
      }
    
      function next2() {

        if (current_page1 < numPages()) {
          current_page1++;
          changePage(current_page1)
        }

      }
    
      function changePage(page) {

        
    
        if (page < 1) page = 1;  // starting point;
    
        if (page > numPages()) page = numPages(); // ending point

        section.innerHTML = '';
    
        btn_next.addEventListener('click', next2);
        btn_prev.addEventListener('click', prev2);
 
        if(newSection.length){ 
     
          for (let i = (page - 1) * records_per_page; i < (page * records_per_page) && i < newSection.length; i++) {
      
            section.appendChild(newSection[i]);
        }
      
      }
      
      else{ 

       section.innerHTML = `<p class="no-result">No results found..</p>`;
      
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
        return Math.ceil(newSection.length / records_per_page)
      }
    
      changePage(1);

    }

 // Sort Content

  let selectBtn = document.querySelector('select');

     // Sorting content

  selectBtn.addEventListener('change',sortContent);

  function sortContent(e){


    btn_next.removeEventListener('click', next);
    btn_prev.removeEventListener('click', prev);
      
    //  current_page = 1;
 
      let newSort = Array.from(miniContainer).map(function(item){ 
     
        return item
   
        });

      if(e.target.value == 0){ 
       
      newSort.sort((a,b)=> (a.children[0].textContent.length > b.children[0].textContent.length) ? 1 : -1)
      
      section.innerHTML = '';

      section.append(...newSort);
      
      function prev2() {

        if (current_page > 1) {
          current_page--;
          changePage(current_page)
         }
         
         }
    
      function next2() {
         
        if (current_page < numPages()) {
          current_page++;
          changePage(current_page)
        }

      }
    
      function changePage(page) {

        if (page < 1) page = 1;  // starting point;
    
        if (page > numPages) page = numPages(); // ending point
    
        section.innerHTML = '';
    
        btn_next.addEventListener('click', next2);
        btn_prev.addEventListener('click', prev2);
    
        for (let i = (page - 1) * records_per_page; i < (page * records_per_page) && i < newSort.length; i++) {
          section.appendChild(newSort[i]);
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
        return Math.ceil(newSort.length / records_per_page)
      }
    
      changePage(1);

    }
 
   if(e.target.value == 1){ 

    newSort.sort((a,b)=> (a.children[0].textContent.length < b.children[0].textContent.length) ? 1 : -1)
      
    section.innerHTML = '';

    section.append(...newSort);
   
    function prev2() {

      if (current_page > 1) {
  
        current_page--;
        changePage(current_page)
      }
      
    }
  
    function next2() {
       
      if (current_page < numPages()) {
        current_page++;
        changePage(current_page)
      }

    }
  
    function changePage(page) {

      if (page < 1) page = 1;  // starting point;
  
      if (page > numPages) page = numPages(); // ending point
  
      section.innerHTML = '';
  
      btn_next.addEventListener('click', next2);
      btn_prev.addEventListener('click', prev2);
  
      for (let i = (page - 1) * records_per_page; i < (page * records_per_page) && i < newSort.length; i++) {
        section.appendChild(newSort[i]);
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
      return Math.ceil(newSort.length / records_per_page)
    }
  
    changePage(1);
  
  }

     }

}

loadCards();

const refreshBtn = document.querySelector('.all-posts');

refreshBtn.addEventListener('click', loadCards)

function deleteElement(e) {

  section.style.filter = `blur(1rem)`;

  let deleted = async () => {

    fetch(`https://jsonplaceholder.typicode.com/posts/${e.target.previousSibling.id}`, {

      method: 'DELETE',

    }).then((data) => {

      if (data.status === 200) {
        
        section.style.filter = `none`;

      }
      if (data.ok == true) {
        let child = e.target.parentElement;
        child.parentElement.removeChild(child)
      }
    })

  };

  deleted();
}
open.addEventListener('click', function () {
  postTitle.value = '';
  postText.value = '';

  modal_container.classList.add('show');
  section.style.display = "none";
  document.querySelector('footer').style.display = "none"
  newId++;

})
