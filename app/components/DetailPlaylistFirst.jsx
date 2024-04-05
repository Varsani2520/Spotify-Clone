'use client'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../service/getTokenService';
import { getPlaylistDetails } from '../service/getPlaylistDetails';
import { useParams } from 'next/navigation';

const DetailPlaylistFirst = () => {
    const { playlist_id } = useParams();
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessToken();
                localStorage.setItem('access_token', accessToken);
                const detailData = await getPlaylistDetails(playlist_id, accessToken);
                setDetail(detailData);

            } catch (error) {
                console.error("Error fetching playlist details:", error);
            }
        };

        if (playlist_id) {
            fetchData();
        }
    }, [playlist_id]);
    return (
        <div className='playlist-detail'>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    {detail && detail.images.length > 0 && (
                        <img src={detail.images[0].url} alt='Playlist Image' style={{ height: '250px', width: '250px', borderRadius: '10px' }} />
                    )}
                </Grid>
                <Grid item xs={12} md={9} sx={{ marginLeft: '-100px' }}>
                    <p style={{ color: 'inherit' }}>{detail?.type}</p>
                    <h1>{detail?.name}</h1>
                    <p style={{ color: 'gray' }}>{detail?.description}</p>
                    {/* spotify logo and name : likes .. */}
                    {detail && detail.owner && (
                        <p style={{ fontWeight: 'bold' }}>
                            <img
                                src="https://e1.pngegg.com/pngimages/532/220/png-clipart-spotify-for-macos-spotify-logo.png"
                                alt="spotify_icon"
                                className="spotify-logo"
                                style={{ height: '20px', width: '20px' }} />
                            {detail.owner.display_name}
                            {detail.followers.total} likes
                        </p>
                    )}
                    {/* total songs ,about 2 hr 45 min */}
                    <p>{detail?.tracks.total} songs, about 2 hr 45 min</p>
                </Grid>

            </Grid >
        </div>
    )
}

export default DetailPlaylistFirst
