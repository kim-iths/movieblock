import './startScreen.css';
import { Carousel } from '3d-react-carousal';
import { useState, useEffect } from 'react';
import GetData from './GetData';
import { Link } from "react-router-dom";
import { colors } from '@material-ui/core';


const StartScreen = () => {

    const [newMovies, setNewMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [slides, setSlides] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(async () => {
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=86f237d170416093156de7affa43927e`;
        let data = await GetData(url);
        console.log('3. Got data in startscreen', data.results);
        setNewMovies(data.results);
    }, [])
    
    useEffect(async () => {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=86f237d170416093156de7affa43927e&page=${currentPage}`;
        let data = await GetData(url);
        console.log('3. Got data in startscreen', data.results);
        setPopularMovies(data.results);
    }, [])

    useEffect(() => {
        createSlides();
    },[newMovies])

    function createSlides() {
        let slide = newMovies.map((newMovie, index) => (
            <div key={index} className="movie-slide-div">
                <Link to="/filminfo" style={{ textDecoration: 'none' }}>
                    <img src={`https://image.tmdb.org/t/p/original${newMovie.backdrop_path}`} alt={newMovie.title} />,
            <p className="movie-slide-title">{newMovie.title}</p>,
            <aside className="movie-slide-heart">&#x2665;</aside>,
            </Link>
            </div>
        ));
        setSlides(slide);
        
    }
    console.log("slides:", slides)

    if (slides.length > 0) {
        return (
            <div className="startscreen-wrap">
                <section id="movie-slider">
                    <h2 className="title-new-movies">Nya filmer</h2>
                    <Carousel slides={slides} autoplay={true} interval={5000} />
                </section>
                <section id="popular-movies">
                    <h3 className="title-popular-movies">Populära filmer</h3>
                    <div className="popular-movies-container">
                        <div className="grids-popular-movies">
                            {popularMovies.map((popularMovie, index) => (
                                <div key={index} className="popular-movies-div">
                                    <Link to="/filminfo" >
                                        <img src={`https://image.tmdb.org/t/p/w500${popularMovie.poster_path}`} alt={popularMovie.title} />
                                    </Link>
                                    <p>{popularMovie.title}</p>
                                    <aside className="movie-heart">&#x2665;</aside>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="page-buttons">
                        <div id="previous-page-button"><h4 id="previous-page-text"> {"< Föregående sida"} </h4></div>
                        <div id="next-page-button"><h4 id="next-page-text"> {"Nästa sida >"} </h4></div>
                    </div>
                </section>
            </div>
        )
    } else return (<h3 className="loading-text">Loading...</h3>)
}

export default StartScreen;