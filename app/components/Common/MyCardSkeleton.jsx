import { Skeleton } from '@mui/material'
import React from 'react'

const MyCardSkeleton = () => {
    return (
        <div style={{ display: "flex", overflow: "hidden" }}>
            {/* Loop to display 8 skeleton elements */}
            {[...Array(7)].map((_, index) => (
                <div
                    key={index}
                    style={{ display: "block", marginRight: "10px" }}
                >
                    <Skeleton
                        variant="rectangular"
                        width={210}
                        height={118}
                        sx={{ backgroundColor: "black" }}
                    />
                    <Skeleton
                        variant="text"
                        width={210}
                        height={18}
                        sx={{ backgroundColor: "black" }}
                    />
                </div>
            ))}
        </div>
    )
}

export default MyCardSkeleton
