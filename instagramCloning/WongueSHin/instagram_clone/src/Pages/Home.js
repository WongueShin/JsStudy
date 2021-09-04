import React, {useState, useEffect} from "react";
import axios from "axios";
import {Route} from "react-router-dom";
import NavigationBar from './Component/NavigationBar';
import MainFeed from './Component/MainFeed';
import Account from './Component/Account';
import Loading from "./Component/Loading";
import Post from "./Component/Post";

import './Home.css';
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
    
    let [isLoading, setIsLoading] = useState(true);
    
    if (isLoading){
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }
    

    let[navigateProps, setNavigateProps] = useState(null);

    if (navigateProps == null) {
        setNavigateProps(
            {
                user_small_profile : 'Anonymous',
            }
        )
    }

    return(
        isLoading?
        <div id="Home"> 
        <Loading/>
        </div> :
        <BrowserRouter>
            <div id = "main">
            <NavigationBar props= {navigateProps}/>
            <div className='feedNAc'>
                <MainFeed/>
                <Account/>
            </div>
            <Route exact path="/post" component={Post}/>
            </div>
        </BrowserRouter>
    );
   
}

    
function loadPages() {
    
}

export default Home