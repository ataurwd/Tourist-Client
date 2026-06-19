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
import SEO from '../../components/SEO';

const Home = () => {
    const [storyData = [], , isLoading] = useAllStories();

    // Home schema markup: WebSite & Organization
    const homeSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://treva-travel.web.app/#website",
                "url": "https://treva-travel.web.app/",
                "name": "Treva",
                "description": "Premium Travel Experience & Tour Guide Booking",
                "potentialAction": [
                    {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "https://treva-travel.web.app/community?search={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                    }
                ]
            },
            {
                "@type": "Organization",
                "@id": "https://treva-travel.web.app/#organization",
                "name": "Treva Travel",
                "url": "https://treva-travel.web.app/",
                "logo": "https://i.ibb.co.com/FqKW885X/Screenshot-at-Jun-05-10-29-11-removebg-preview.png",
                "sameAs": [
                    "https://facebook.com/treva.travel",
                    "https://twitter.com/TrevaTravel"
                ],
                "contactPoint": [
                    {
                        "@type": "ContactPoint",
                        "telephone": "+880 1234 567 890",
                        "contactType": "customer service",
                        "email": "hello@treva.travel",
                        "areaServed": "Global"
                    }
                ]
            }
        ]
    };

    return (
        <div>
            <SEO 
                title="Premium Tour Packages & Personal Travel Guides"
                description="Explore the world with Treva. Book verified local tour guides and premium, customized travel packages for an immersive experience."
                urlPath="/"
                schema={homeSchema}
            />
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