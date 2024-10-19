import React from 'react';
import { IconButton, Tooltip } from '@mui/material';

const MyIconButton = ({ icon, tooltip, onClick }) => {
  return (
    <Tooltip title={tooltip} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          color: 'gray', // default color
          '&:hover': {
            color: 'white', // hover color
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // slight background hover effect (optional)
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default MyIconButton;
