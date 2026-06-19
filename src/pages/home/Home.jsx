import React from 'react';
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
import useAllStories from '../../hooks/useAllStories';

const Home = () => {
    const [storyData = [], , isLoading] = useAllStories();

    return (
        <div>
            <Heading />
            {/* <Overview /> */}
            <TravelGuide />
            <BestSells />
            <Gallery/>
            <WhyChoseUs/>
            <HomeStory storyData={storyData} isLoading={isLoading} />
            <JoinUs />
            <Testimonial />
            <Blogs/>
            <Galary/>
        </div>
    );
};

export default Home;