import React, { useContext } from 'react';
import Heading from './Heading';
import Overview from './Overview';
import { FormContext } from './../../context/FormData';
import TravelGuide from './TravelGuide';
import HomeStory from './HomeStory';
import { useLoaderData } from 'react-router-dom';
import JoinUs from './JoinUs';
import Galary from './Galary';
import BestSells from './BestSells';
import WhyChoseUs from './WhyChoseUs';

const Home = () => {
    const storyData = useLoaderData();

    return (
        <div>
            <Heading />
            {/* <Overview /> */}
            <TravelGuide />
            <BestSells />
            <WhyChoseUs/>
            <HomeStory storyData={storyData} />
            <JoinUs />
            <Galary/>
        </div>
    );
};

export default Home;