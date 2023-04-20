import React, { useEffect, useState } from 'react';
import HomeNav from '../HomeNav/HomeNav';
import SmallFooter from '../Footer/SmallFooter';
import HomePage from '../../../Pages/User/Home/HomePage';

export default function Home() {

    return (
        <>
            <HomeNav />
            <div className='mb-5' style={{ marginTop: "55px", boxShadow: "0px -5px 20px 8px black" }}>
                <img className='w-100' src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681500594/FREE_-_HDconvert.com_HomeBanner_pg7rj7.png" alt="" />
            </div>
            <HomePage />
            <SmallFooter />
        </>
    )
}
