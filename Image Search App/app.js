const formEle = document.querySelector('form');
const inputEle = document.querySelector('.search-input');
const searchResults = document.querySelector('.result-container');
const showMoreBtn = document.querySelector('.show-more-btn');
const searchBtn = document.querySelector('.show-more-btn');

const accessKey = "DKIZnX2ZmwYykmKkAoDfJXQbO2r4_aJxfD3ypjZ0iRQ";

let page = 1;

async function displayImages() {
    const query = inputEle.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
    try {

        if(page == 1){
            searchResults.innerHTML = `<div class="loading"></div>`;
        }

        const resp = await fetch(url);
        const data = await resp.json();
        const results = data.results;
        
        if(page == 1){
            searchResults.innerHTML = ``;
        }

        results.map((result)=>{
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("result");

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';
            imageLink.textContent = result.alt_description;
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
            
        })
        page++;
        if(page>1){
            showMoreBtn.style.display = 'block';
        }

    }catch(err){
        
    }
}

formEle.addEventListener('submit',(e)=>{
    e.preventDefault();
    page=1;
    displayImages();
});



showMoreBtn.addEventListener('click',()=>{
    displayImages();
})
