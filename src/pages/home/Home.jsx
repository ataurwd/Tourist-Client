import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BestSells from './BestSells';
import Blogs from './Blogs';
import Galary from './Galary';
import Gallery from './Gallery';
import Heading from './Heading';
import HomeStory from './HomeStory';
import JoinUs from './JoinUs';
import Testimonial from './Testimonial';
import TravelGuide from './TravelGuide';
import WhyChoseUs from './WhyChoseUs';

const Home = () => {
    const storyData = useLoaderData();

    return (
        <div>
            <Heading />
            {/* <Overview /> */}
            <TravelGuide />
            <BestSells />
            <Gallery/>
            <WhyChoseUs/>
            <HomeStory storyData={storyData} />
            <JoinUs />
            <Testimonial />
            <Blogs/>
            <Galary/>
        </div>
    );
};

export default Home;