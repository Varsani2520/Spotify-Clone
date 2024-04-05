'use client'

import React from 'react';
import style from '../../style.css'
import DetailPlaylistFirst from '@/app/components/DetailPlaylistFirst';
import DetailPlalistAlbum from '@/app/components/DetailPlalistAlbum';
import CardPlaylistCenter from '@/app/components/CardPlaylistCenter';
const Page = () => {


    return (
        <>
            <DetailPlaylistFirst />
            <CardPlaylistCenter />
            <DetailPlalistAlbum />
        </>
    );
};

export default Page;
