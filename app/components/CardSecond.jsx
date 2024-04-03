import React from 'react';
import style from '../style.css';
import MyButton from './Common/MyButton';
import MyText from './Common/MyText';
import { Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AddIcon from '@mui/icons-material/Add';
const CardSecond = () => {
    const list = ["Legal", "Safety & Privacy Center", "Privacy Policy", "Cookies", "About Ads"];
    return (
        <div className='card'>
            <div className='card-content'>
                <QueueMusicIcon className='library-img' />
                <span className='library-text'>Your Library</span>
                <AddIcon className='plus-icon' />
            </div>
            {/* another card */}
            <div className='card-second'>
                <MyText text1={"Create your first playlist"} />
                <MyText text2={"It's easy, we'll help you"} />
                <MyButton title={'Create playlist'} />
            </div>
            <div className='card-second'>
                <MyText text1={"Let's find some podcasts to follow"} />
                <MyText text2={"We'll keep you updated on new episodes"} />
                <MyButton title={'Browse podcasts'} />
            </div>

            <div className='footer'>
                <ul>
                    {list.map((e, index) => (
                        <li key={index}>{e}</li>
                    ))}
                </ul>
                <ul>
                    <li>Accessibility</li>
                </ul>
                <ul>

                    <li>Cookies</li>
                </ul>
                <Button
                    sx={{
                        color: 'white',
                        borderRadius: '40px',
                        borderColor: 'gray',
                        '&:hover': {
                            borderColor: 'white'
                        }
                    }}
                    variant="outlined"
                    startIcon={<LanguageIcon />}
                >
                    English
                </Button>
            </div>

        </div>
    );
};

export default CardSecond;
