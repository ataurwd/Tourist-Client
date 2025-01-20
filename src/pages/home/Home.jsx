import React, { useContext } from 'react';
import Heading from './Heading';
import Overview from './Overview';
import { FormContext } from './../../context/FormData';
import TravelGuide from './TravelGuide';
import HomeStory from './HomeStory';
import { useLoaderData } from 'react-router-dom';
import JoinUs from './JoinUs';
import Galary from './Galary';

const Home = () => {
    const storyData = useLoaderData();

    return (
        <div>
            <Heading />
            <Overview />
            <TravelGuide />
            <HomeStory storyData={storyData} />
            <JoinUs />
            <Galary/>
        </div>
    );
};

export default Home;