import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MovieList from './MovieList';


const initialData = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
    id: '',
}

const UpdateMovieForm = (props) => {
    const [movie, setMovie] = useState({initialData})
    const [error, setError] = useState('')
    const {id} = useParams();
    const {push} = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res)
                setMovie(res.data)
            })
            .catch(err => {
                console.error(err)
                setError(`There was an error: ${err.message}. If this error persists, please contact webmaster at help@topmovies.com`)
            })
    }, [id])

    const handleChanges = (e) => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
        console.log(movie)
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log('UPDATE sucessful!', res);
                props.setMovieList(res.data)
                push(`/movies/${id}`);
            })
            .catch(err => {
                console.error(err)
                setError(`There was an error UPDATING this movie: ${err.message}`)
            })
        
    }
    
    return (
        <div>
            {error.length > 0 
            ? <div>{error}</div>
            : <form onSubmit={handleSubmit}>
                <input type='text' 
                    name='title'
                    value={movie.title} 
                    onChange={handleChanges}
                />
                <input type='text'
                    name='director' 
                    value={movie.director} 
                    onChange={handleChanges}
                 />
                <input type='number' 
                    name='metascore' 
                    value={movie.metascore} 
                    onChange={handleChanges}
                />
                <textarea 
                    name='stars' 
                    value={movie.stars} 
                    onChange={handleChanges}
                />
                <button>Update Movie</button>
             </form>
            }
        </div>
    );
}

export default UpdateMovieForm;