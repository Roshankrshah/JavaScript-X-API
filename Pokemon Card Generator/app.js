const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

  const url = `https://pokeapi.co/api/v2/pokemon/`;

  const card = document.getElementById('card');
  const btn = document.querySelector('.btn');

  let getPokeData = ()=>{
    let id = Math.floor(Math.random()%200)+1;

    const finalUrl = url + id;

    fetch(finalUrl).then((resp)=>resp.json())
    .then((data)=>{
        generateCard(data);
    })
  };

  let generateCard = (data)=>{
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[1].toUpperCase() + data.name.slice(1);
    console.log("hi")
    const statAttack =data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    console.log(hp,pokeName,statAttack);
  }

  btn.addEventListener('click',getPokeData);
  window.addEventListener('DOMContentLoaded',getPokeData);