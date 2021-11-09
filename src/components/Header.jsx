import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';


export default function Header() {
    return (
        <>
        <CssBaseline />
        <AppBar position="relative">
            <Toolbar>
            <CameraIcon sx={{ mr: 2 }} />
            <Typography variant="caption" color="inherit" noWrap>
                Album layout
            </Typography>
            </Toolbar>
        </AppBar>
        </>
    )
}
