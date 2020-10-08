import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import AddMovieForm from "./Movies/AddMovieForm";
import axios from 'axios';

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const {push} = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const removeMovie = movie => {
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      getMovieList();
      push('/')
    })
    .catch(err => {
      console.error('DELETE error: ', err)
    })
  } 

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} removeMovie={removeMovie} />
      </Route>

      <Route path='/add-movie'>
        <AddMovieForm movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovieForm movies={movieList} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
