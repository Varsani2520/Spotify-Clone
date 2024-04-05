import React from 'react';
import { Skeleton } from '@mui/material';

const SkeletonType3 = () => {
    // Define the number of rows and columns for the skeleton table
    const numRows = 5;
    const numCols = 5;

    // Generate skeleton elements for each row and column
    const generateSkeletonRows = () => {
        let skeletonRows = [];
        for (let i = 0; i < numRows; i++) {
            let skeletonCols = [];
            for (let j = 0; j < numCols; j++) {
                skeletonCols.push(
                    <Skeleton key={`${i}-${j}`} variant='text' sx={{ height: '50px', width: '300px', marginRight: '10px' ,overflow:'hidded'}} animation="wave"/>
                );
            }
            skeletonRows.push(
                <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {skeletonCols}
                </div>
            );
        }
        return skeletonRows;
    };

    return (
        <div>
            {generateSkeletonRows()}
        </div>
    );
};

export default SkeletonType3;
