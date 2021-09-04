import React, { useState } from 'react';
import './MainFeed.css'

const MainFeed = () => {
    const [feedList, setFeedList] = useState([]);
    const [feedLoading, setFeedLoading] = useState(true);

    const loadFeed = async () => {
        await setTimeout(()=> {setFeedLoading(false)}, 9000);
    }

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

    loadFeed();
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