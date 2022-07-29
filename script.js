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

