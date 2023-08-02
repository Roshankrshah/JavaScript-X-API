const url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';

const fetchques = async ()=>{
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default fetchques;