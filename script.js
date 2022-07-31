let user = fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response)

let section = document.querySelector('.section');

section.classList.add('section');

const loadCards = async () => {
    let newPosts = await user;

    let card = await newNew.json();

    card.forEach(function (item, index) {

        let div = document.createElement('div');

        let p = document.createElement('p');

        p.textContent = item.body;

        let img = document.createElement('img');
        img.src = "/invalid.png";
        img.classList.add('close-image');

        div.appendChild(p);
        div.appendChild(img)
        section.appendChild(div);
        div.classList.add('mini-container');
        p.classList.add('text-content');
        p.id = index + 1;
        img.addEventListener('click', deleteElement);

    });

}

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


let closeModal = async () =>{

  close.style.backgroundColor = "#d6dfdc";
  close.style.cursor = "not-allowed";
  

  let user =   fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
      title: postTitle.value,
      body: postText.value,
      userId: newId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },

  }).then(data => data)

  let newData = await user;
    
  if(newData.status === 201){ 

    modal_container.classList.remove('show');
    section.style.display = "flex";
    close.style.backgroundColor = "#58c49b";
    close.style.cursor = "pointer";

  }

}

close.addEventListener('click',closeModal)

const postNewData = async () => {


  let addedPost = fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
      title: postTitle.value,
      body: postText.value,
      userId: newId,
   
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },

  })
    .then((response) => response.json())
    .then((newData) => newData);

  let addedPost_data = await addedPost;
  let newUser = [];
  newUser.push(addedPost_data)

  newUser.forEach(function (item, index) {
    let div = document.createElement('div');

    let p = document.createElement('p');

    p.textContent = item.body;

    let img = document.createElement('img');
    img.src = "/invalid.png";

    img.classList.add('close-image')

    div.appendChild(p);
    div.appendChild(img)
    section.appendChild(div);
    div.classList.add('mini-container');
    p.classList.add('text-content');
    p.id = newId;
    img.addEventListener('click', deleteElement);

  });

}

close.addEventListener('click', postNewData)
 
