import { Box, TextField, Typography,Stack } from '@mui/material'
import React, { useState } from 'react'
import styles from './style.module.css'
import Button from '@mui/material/Button';
import { Auth } from '../../Config/Firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const SignIn = () => {
  let [inp, setInp] = useState([])
let navigation = useNavigate()

  const InpValue = (e) => {
    setInp((pre) => ({
      ...pre,
      [e.target.id]: e.target.value

    }))
  }
  const SIGNIN = async () => {
    if(!inp.Email){
      alert('Enter Email')
    }else if(!inp.Password){
      alert('Enter Password')
    }else{
    try{
      let a = await signInWithEmailAndPassword(Auth, inp.Email, inp.Password)
      localStorage.setItem("uid", a.user.uid);
navigation('/Home')
    }catch(Error){
alert(Error)
    }
}
  }
  
  return (
    <Box sx={{ width: '100%', Height: "100%", backgroundColor: '#e65100', overflow: 'hidden' }}>
      <Box sx={{ gap:2 ,width: '100%',minHeight: "100vh",flexDirection:'column',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant='h3' sx={{ color: 'white' }}>
          Sign In
        </Typography>
        <TextField sx={{ width: '70vw' }} InputLabelProps={{ className: styles.hh }} id="Email" label="Email" variant="standard" onChange={InpValue} />
        <TextField sx={{ width: '70vw' }} InputLabelProps={{ className: styles.hh }} id="Password" label="Password" variant="standard" onChange={InpValue} />
        <Button sx={{backgroundColor:'White' , width:"70vw",color:'black'}} variant="contained" onClick={SIGNIN}>Sign-In</Button>
        <Stack flexDirection="row" alignItems="center" sx={{ color: "white", justifyContent:'space-between' }} width={"70vw"}>
                  <Box></Box>
                  <Box >
                    <Link className={styles.link} to='/SignUp'>Creat a Account?</Link>
                  </Box>
                </Stack>
      </Box>
    </Box>
  )
}

export default SignIn
