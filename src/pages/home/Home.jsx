import React, { useContext } from 'react';
import Heading from './Heading';
import Overview from './Overview';
import { FormContext } from './../../context/FormData';
import TravelGuide from './TravelGuide';
import HomeStory from './HomeStory';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const storyData = useLoaderData();

    return (
        <div>
            {/* <Heading /> */}
            {/* <Overview /> */}
            <TravelGuide />
            <HomeStory storyData={ storyData} />
        </div>
    );
};

export default Home;