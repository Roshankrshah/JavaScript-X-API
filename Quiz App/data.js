const fetchques = async (totalQuestions, category, diffculty)=>{
    const url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${diffculty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
export default fetchques;