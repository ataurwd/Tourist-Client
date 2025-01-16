import React, { useContext } from 'react';
import Heading from './Heading';
import Overview from './Overview';
import { FormContext } from './../../context/FormData';
import TravelGuide from './TravelGuide';

const Home = () => {
    const { user } = useContext(FormContext)
    // console.log(user.photoURL)
    console.log(user?.photoURL)
    return (
        <div>
            <Heading />
            <Overview />
            <TravelGuide/>
        </div>
    );
};

export default Home;