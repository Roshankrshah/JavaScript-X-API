const submitBtn = document.getElementById('submit-btn');

let generateGif = () => {

    let loader = document.querySelector('.loader');
    loader.style.display = "block";
    document.querySelector('.wrapper').style.display = 'none';

    let q = document.getElementById('search-box').value.trim();
    
    let gifCount = document.getElementById('quantity').value;
    let rated = document.getElementById('rate').value;
    let lang = document.getElementById('lang').value;
    
    let finalUrl = `https://api.giphy.com/v1/gifs/search?api_key=3zJoxXPwk67dhxthrrqGI579oEcz1yAK&q=${q}&limit=${gifCount}&rating=${rated}&lang=${lang}`;
    document.querySelector(".wrapper").innerHTML = "";

    fetch(finalUrl).then((resp) => resp.json())
        .then((info) => {
            let gifsData = info.data;

            if(gifsData.length == 0){
                throw "Not Found";
            }

            gifsData.forEach((gif) => {
                let container = document.createElement('div');
                container.classList.add("container");
                let iframe = document.createElement("img");

                //console.log(gif.images.downsized_medium);
                iframe.setAttribute("src", gif.images.downsized_medium.url);

                iframe.onload = () => {
                    gifCount--;
                    if (gifCount == 0) {
                        loader.style.display = "none";
                        document.querySelector('.wrapper').style.display = "grid";
                    }
                }
                
                container.append(iframe);
                let copyBtn = document.createElement("button");
                copyBtn.innerText = "Copy Link";

                copyBtn.onclick = () => {
                    let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;

                    navigator.clipboard
                    .writeText(copyLink)
                    .then(() => {
                        alert("GIF copied to clipboard");
                    })
                    .catch(() => {
                        alert("Error");
                    });
                }
                container.append(copyBtn);
                document.querySelector(".wrapper").append(container);
                
            })
        }).catch(()=>{
            if(q.length == 0){
                loader.style.display = "none";
                document.querySelector('.wrapper').style.display = "block";
                document.getElementsByClassName('wrapper')[0].innerHTML = `<h3 class="error">The input field cannot be empty</h3>`;
            }
        })
}
submitBtn.addEventListener('click', generateGif);