import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonType2 = () => {
    return (
        <div style={{ display: 'flex', overflow: 'hidden' }}>
            {/* Skeleton for the image */}
            <Skeleton variant='rectangular' sx={{ height: '200px', width: '200px' }} />

            {/* Skeleton for the text */}
            <div className='block' style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Skeleton variant='text' sx={{ height: '20px', width: '200px', marginBottom: '10px' }} />
                <Skeleton variant='text' sx={{ height: '20px', width: '200px', marginBottom: '10px' }} />
                <Skeleton variant='text' sx={{ height: '20px', width: '200px', marginBottom: '10px' }} />
            </div>
        </div>
    );
};

export default SkeletonType2;
