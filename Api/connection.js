import axios from 'axios';

const API_KEY = '5565f48351a0ea1ff8489791809e72b2'


export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `
      https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );
 
    return response.data.results;
      
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};



export const fetchDetails = async (MovieId)=>{
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${MovieId}?api_key=${API_KEY}`)
    return response.data
  }catch(error){
    console.error('Error  fetching movie details : ' , error)
  }
}