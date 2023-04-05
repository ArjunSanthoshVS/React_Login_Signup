import React, { useEffect, useState } from 'react';
import './Home.css'
import HomeNav from '../HomeNav/HomeNav';
import SmallFooter from '../Footer/SmallFooter';
import HomePage from '../../../Pages/User/Home/HomePage';

export default function Home() {

    return (
        <>
            <HomeNav />
            <div className='mb-5' style={{ marginTop: "66px", boxShadow: "0px -5px 20px 8px black" }}>
                <img className='w-100' src="/images/[FREE - HDconvert.com] HomeBanner.png" alt="" />
            </div>
            <HomePage />
            <SmallFooter />
        </>
    )
}
