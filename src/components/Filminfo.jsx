import './filmInfo.css'
import React, { Component, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import GetData from './GetData';

const Filminfo = () => {

    const [title, setTitle] = useState("")
    const [info, setInfo] = useState({
        title: "name", 
         year: "", 
         playtime: 0, 
         overview: "", 
         bannerImage: "", 
         cast: "", 
         genres: "", 
         similarMovies: []})
    
    useEffect(async () => {
        const placeholderIdString = "550"
        const url = "https://api.themoviedb.org/3/movie/" + placeholderIdString + "?api_key=86f237d170416093156de7affa43927e&language=en-US"
    
        const creditsUrl = "https://api.themoviedb.org/3/movie/" + placeholderIdString + "/credits?api_key=86f237d170416093156de7affa43927e&language=en-US"

        const similarUrl = "https://api.themoviedb.org/3/movie/" + placeholderIdString + "/similar?api_key=86f237d170416093156de7affa43927e&language=en-US&page=1"

        const data = await GetData(url)
        const creditsData = await GetData(creditsUrl)
        const similarData = await GetData(similarUrl)
        
        //movie
        let title = data.title
        let year = data.release_date
        let playtime = data.runtime
        let synopsis = data.overview
        let bannerImage = data.backdrop_path
        let genres = data.genres

        //credits
        let cast = creditsData.cast

        //similar movies
        let similarMovies = similarData.results
        let amountSimilarMovies = 10

        let elements = []

        for(let i = 0; i < amountSimilarMovies; i++){

            let currentTitle = similarMovies[i].title

            let currentImage = similarMovies[i].poster_path
            currentImage = "https://image.tmdb.org/t/p/w500" + currentImage

            elements.push(
            <div className="similar-movie">
                <img src={currentImage} alt={currentTitle} className="movie-poster"/>
                <p>{currentTitle}</p>
            </div>)
        }

        //convert variables to their correct values

        //cast -> "name, name, name..."
        
        let amountActors = 4
        let castString = ""

        for(let i = 0; i < amountActors; i++){
            if(i > 0 && i != amountActors){
                castString += ", "
            }

            castString += cast[i].name

            if(i == amountActors-1){
                castString += "..."
            }

        }
        
        //1999-05-16 -> 1999
        year = year.substring(0,4)

        //139 -> 2h 19m
        const hours = Math.floor(playtime / 60)
        const minutes = playtime % 60
        playtime = hours + "h " + minutes + "m"

        // /aösldköaldsk.jpg -> https://image.tmdb.org/t/p/w500/aösldköaldsk.jpg
        bannerImage = "https://image.tmdb.org/t/p/w500" + bannerImage

        //genres -> action, adventure, whatever
        let genresString = ""

        genres.forEach((e, i) => {
            if(i != 0 && i != genres.length){
                genresString += ", "
            }
            genresString += e.name
        });

        setInfo({title: title, 
            year: year, 
            playtime: playtime, 
            overview: synopsis, 
            bannerImage: bannerImage, 
            cast: castString, 
            genres: genresString, 
            similarMovies: elements})
    }, [])

    return(
        <section>
            <div className="movie-banner">
                <div className="background-wrapper">
                    <img className="banner-image-background" src={info.bannerImage} alt="movie" />
                </div>
                <img className="banner-image" src={info.bannerImage} alt="movie" />
                <span className="movie-name">{info.title}</span>
                <span className="movie-year-time">{info.year} / {info.playtime}</span>
            </div>
            <div className="movie-info-content">
                <div className="synopsis-div column">
                    <p className="bold">Handling</p>
                    <p className="movie-synopsis">{info.overview}</p>
                </div>
                <div className="actors-div column">
                    <p className="bold">Skådespelare</p>
                    <p className="movie-actors">{info.cast}</p>
                </div>
                <div className="genres-div column">
                    <p className="bold">Kategorier</p>
                    <p className="movie-genres">{info.genres}</p>
                </div>
            </div>
            <div className="buy">
                <span>199 kr</span>
                <button className="buy-button">Köp</button>
            </div>
            <div className="similar-movies">
                <p>Liknande filmer</p>
                <div className="movie-row">
                    {info.similarMovies}
                    {/* <div className="related-movie"></div>
                    <div className="related-movie"></div>
                    <div className="related-movie"></div>
                    <div className="related-movie"></div>
                    <div className="related-movie"></div> */}
                </div>
            </div>
        </section>
    )
}

export default Filminfo;