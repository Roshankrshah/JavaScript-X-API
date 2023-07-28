const formEle = document.querySelector('form');
const inputEle = document.querySelector('.search-input');
const searchResults = document.querySelector('.result-container');
const btn = document.querySelector('.show-more-btn');

const accessKey = "DKIZnX2ZmwYykmKkAoDfJXQbO2r4_aJxfD3ypjZ0iRQ";

let page = 1;

async function displayImages() {
    console.log('2');
    const query = inputEle.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        const results = data.results;
        if(page == 1){
            searchResults.innerHTML = "";
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
            btn.style.display = 'block';
        }

    }catch(err){
        
    }
}

formEle.addEventListener('submit',(e)=>{
    e.preventDefault();
    displayImages();
});

btn.addEventListener('click',()=>{
    displayImages();
})