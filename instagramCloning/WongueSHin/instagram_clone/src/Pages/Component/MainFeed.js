import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainFeed.css'

const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYzMTA3MDIyNSwiZXhwIjoxNjYyNjI3ODI1fQ.IF2QzxsvzgjsXU6743mJyBwyDgJ7FKGENWNcLSQP4xE';
const SERVER_URL = 'http://dev.jhprac.shop/'

const MainFeed = () => {
    const [feedList, setFeedList] = useState([]);
    const [feedLoading, setFeedLoading] = useState(true);

    //useEffect(()=> {
    //    axios.get(SERVER_URL+"/feeds",{headers:{'x-access-token': JWT_TOKEN}})
    //    .then(
    //        (response) => console.log(response)
    //    )
    //    .catch(
    //        (response) => console.log(response)
    //    )
    //}, [])`

    const LoadLogo = () => {
        return(
            <div>            
                <img className='loadIcon' src='./img/loading.png'/>
            </div>
        )
    }

    const FeedLoadingScreen = () => {
        return(
        <div className='feedContainer'>
            <LoadLogo/>
            <div className='feedList'>
            <div className='feed'>
                <div className='feedWA'>
                    <div className='WAprofileplace'/>
                    <div className='WAnameplace'/>
                </div>
                <div className='feedImageLoading'/>
                <div className='feedContentHolder'/>
            </div>
            </div>
        </div>
        );
    }

    if (feedLoading) {
        return(
            <FeedLoadingScreen/>
        );
    }
    return(
        <h3>MainFeed</h3>
    )
}

export default MainFeed