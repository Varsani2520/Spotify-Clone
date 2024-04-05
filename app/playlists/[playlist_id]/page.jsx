'use client'

import React from 'react';
import style from '../../style.css'
import DetailPlaylistFirst from '@/app/components/DetailPlaylistFirst';
import DetailPlalistAlbum from '@/app/components/DetailPlalistAlbum';
const Page = () => {


    return (
        <>
            <DetailPlaylistFirst />
            <DetailPlalistAlbum />
        </>
    );
};

export default Page;
