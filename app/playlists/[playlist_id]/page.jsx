'use client'

import React from 'react';
import style from '../../style.css'
import DetailPlaylistFirst from '@/app/components/DetailPlaylistFirst';
import DetailPlalistAlbum from '@/app/components/DetailPlalistAlbum';
import CardPlaylistCenter from '@/app/components/CardPlaylistCenter';
import Footer from '@/app/components/Footer';
const Page = () => {


    return (
        <div className='page-container'>
            <DetailPlaylistFirst />
            <CardPlaylistCenter />
            <DetailPlalistAlbum />
            <Footer />
        </div>
    );
};

export default Page;
