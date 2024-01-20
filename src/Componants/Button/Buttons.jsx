import React from 'react'
import Button from '@mui/material/Button';

const Buttons = ({label,onClick}) => {
  return (
    <>
     <Button sx={{ backgroundColor: '#e65100', color: 'white' }} variant="contained" onClick={onClick}>{label}</Button>
    </>
  )
}

export default Buttons
