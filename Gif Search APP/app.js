const submitBtn = document.getElementById('submit-btn');

let generateGif = ()=>{
    console.log("Fuck you baby disha")

    let loader = document.querySelector('.loader');
    loader.style.display = "block";
    document.querySelector('.wrapper').style.display = 'none';
}
submitBtn.addEventListener('click',generateGif);