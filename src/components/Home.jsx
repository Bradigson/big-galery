import '../assets/styles/Home.scss';
import {useState, useEffect} from 'react';
import Header from './Header.jsx';
import Section from './SectionShowPhoto.jsx';

const Home = ()=>{

    return(
        <div className="home-container">
            <Header/>
            <Section/>
            
        </div>
    )
}
export default Home;