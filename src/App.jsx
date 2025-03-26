import { useState  , useEffect} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=5703f8c8"



function App() {

  const[movies , setMovies] = useState([])
  const[searchterm , setSearchterm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search);
  }
  
  useEffect(()=>{
    searchMovies('superman')
  },[]);

  return(
    <div className='app'>
      <h1>MovieScreen</h1>
      
        <div className='search'>
          <input 
            placeholder='Search for your favorite movies...'
            value={searchterm}
            onChange={(e)=>setSearchterm(e.target.value)}
          />
          <img 
            src={SearchIcon}
            alt="searchIcon"
            onClick={()=>{searchMovies(searchterm)}}
          />
        </div>  

      {
        movies.length>0 
        ?(
            <div className='container'>
              {movies.map((movie)=>(
                <MovieCard movie={movie} />
              ))}
            </div>
        ) :
        (
          <div className='empty'>
              <h2>No movie found</h2>
          </div>
        )
      }

    </div>
  )
}

export default App
