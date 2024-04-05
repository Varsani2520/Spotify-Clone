'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../service/getTokenService';
import { getPlaylistDetails } from '../service/getPlaylistDetails';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import style from '../style.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const DetailPlalistAlbum = () => {
    const { playlist_id } = useParams();
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessToken();
                localStorage.setItem('access_token', accessToken);
                const detailData = await getPlaylistDetails(playlist_id, accessToken);
                setDetail(detailData.tracks.items); // Corrected: access the items array directly
                console.log("details", detailData.tracks.items);
            } catch (error) {
                console.error("Error fetching playlist details:", error);
            }
        };

        if (playlist_id) {
            fetchData();
        }
    }, [playlist_id]);

    return (
        <div className='playlist-album-table'>
            {detail && Array.isArray(detail) && ( // Check if detail is an array
                <TableContainer >
                    <Table >
                        <TableHead >
                            <TableRow >
                                <TableCell>#</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Album</TableCell>
                                <TableCell>Date Added</TableCell>
                                <TableCell><AccessTimeIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {detail.map(track => (
                                <TableRow key={track.track.id} >
                                    <TableCell>{track.track.disc_number}</TableCell>
                                    <TableCell> <div style={{ display: 'flex' ,marginTop:'10px'}}>
                                        <img src={track.track.album.images[0].url} alt={track.track.album.name} style={{ height: '50px', width: '50px',marginRight:'20px', borderRadius: '10px' }} />
                                        <div style={{ display: 'block' }}>
                                            <p style={{color:'white',fontWeight:'bold'}}>{track.track.name}</p>
                                            <p>{track.track.artists.map(artist => artist.name).join(', ')}</p>
                                        </div>
                                    </div></TableCell>
                                    <TableCell>{track.track.album.name}</TableCell>
                                    <TableCell>{track.added_at}</TableCell>
                                    <TableCell>{track.track.duration_ms}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};



export default DetailPlalistAlbum;
