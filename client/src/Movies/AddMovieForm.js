import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';


const initialData = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const AddMovieForm = (props) => {
    const [newMovie, setNewMovie] = useState({...initialData})
    const [error, setError] = useState('')
    const {push} = useHistory();

    const handleChanges = (e) => {
        e.persist();
        setNewMovie({
            ...newMovie,
            [e.target.name]: 
               e.target.name === 'stars'
                    ? e.target.value.split(',')
                    : e.target.value
        })
        console.log(newMovie)
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                console.log('POST sucessful!', res);
                props.setMovieList(res.data)
                push(`/`);
            })
            .catch(err => {
                console.error(err)
                setError(`There was an error POSTING this movie: ${err.message}`)
            })
        
    }
    
    return (
        <div>
            {error.length > 0 
            ? <div>{error}</div>
            : <form onSubmit={handleSubmit}>
                <label>Title:
                    <input type='text' 
                        name='title'
                        value={newMovie.title} 
                        onChange={handleChanges} 
                    />
                </label>
                <label>Director:
                <input type='text'
                    name='director' 
                    value={newMovie.director} 
                    onChange={handleChanges}
                 />
                </label>
                <label>Metascore:
                <input type='number' 
                    name='metascore' 
                    value={newMovie.metascore} 
                    onChange={handleChanges}
                />
                </label>
                <label>Stars:(seperate by comma)
                <textarea 
                    name='stars' 
                    value={newMovie.stars} 
                    onChange={handleChanges}
                />
                </label>
                <button>Add Movie</button>
             </form>
            }
        </div>
    );
}

export default AddMovieForm;