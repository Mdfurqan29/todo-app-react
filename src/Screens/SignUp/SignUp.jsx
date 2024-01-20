import { Box, Typography, Stack } from '@mui/material';
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import styles from './style.module.css'
import FileUpload from '../../Componants/FileUploadImg/FileUploadImg';
import Button from '@mui/material/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth,DATABASE,STORAGE } from '../../Config/Firebase';
import { ref, set, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, } from "firebase/storage";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const SignUp = () => {

  let [localImg, setlocalImg] = useState()
  let [imgData, setImgData] = useState("");
  let [StorageDataSend, setStorageDataSend] = useState([])
  let [inp, setInp] = useState([])
let navigation = useNavigate()
  const InpValue = (e) => {
    setInp((pre) => ({
      ...pre,
      [e.target.id]: e.target.value

    }))
  }

  const fileHandler = (e) => {
    setImgData(e.target.files[0]);
    if (e.target.files[0]) {
      setlocalImg(URL.createObjectURL(e.target.files[0]));
    }
    const file = e.target.files[0];
    setStorageDataSend((prev) => ({
      ...prev,
      userImg: file,
    }));
  };


  const SIGNUP = async () => {
    if(!inp.FullName){
      alert('Enter Your Name')
    }else if(!inp.Email){
      alert('Enter Your Email')
    }else if(!inp.Password){
      alert('Enter Password')
    }else if(!localImg){
      alert('Select Your Profile Picture')
    }else{
    try {
      let a = await createUserWithEmailAndPassword(Auth, inp.Email, inp.Password)
      const obj = {
        Email: inp.Email,
        Password: inp.Password,
        Name: inp.FullName
      }
      const keyRef = ref(DATABASE)
      const key = push(keyRef).key
      obj.id = key
      obj.uid = a.user.uid
      const ImageStorageRef = storageRef(STORAGE, `UserImg/${obj.id}.jpg`)
      uploadBytes(ImageStorageRef, StorageDataSend.userImg).then(function (success) {
        getDownloadURL(success.ref).then((downloadURL) => {
          obj.imgURL = downloadURL
          const reference = ref(DATABASE, `UsersDetails/${a.user.uid}`)
          set(reference, obj)
          console.log("done");
        });
      }).catch(function (err) {
       
      })
      navigation('/')

    } catch (error) {
      alert(error)
    }
  }
  }


  return (
    <Box sx={{ width: '100%', Height: "100%", backgroundColor: '#e65100', overflow: 'hidden' }}>
      <Box sx={{ gap: 2, width: '100%', minHeight: "100vh", flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h3' sx={{ color: 'white' }}>
          Sign Up
        </Typography>
        <TextField sx={{ width: '70vw' }} InputLabelProps={{ className: styles.hh }} id="FullName" label="Full Name" variant="standard" onChange={InpValue} />
        <TextField sx={{ width: '70vw' }} InputLabelProps={{ className: styles.hh }} id="Email" label="Email" variant="standard" onChange={InpValue} />
        <TextField sx={{ width: '70vw' }} InputLabelProps={{ className: styles.hh }} id="Password" label="Password" variant="standard" onChange={InpValue} />
        <FileUpload  onChange={fileHandler}>
          {localImg ? "Change Your Profile Picture" : "Add Profile Picture"}
        </FileUpload>
        {localImg && (
          <Box>
            <img src={localImg} width={"100%"} alt="productImg" />
          </Box>
        )}
        <Button sx={{ backgroundColor: 'white',color:'black', width: "70vw" }} variant="contained" onClick={SIGNUP}>Sign-Up</Button>
        <Stack flexDirection="row" alignItems="center" sx={{ color: "white", justifyContent:'space-between' }} width={"70vw"}>
                  <Box></Box>
                  <Box >
                    <Link className={styles.link} to='/'>I Have a Account?</Link>
                  </Box>
                </Stack>
      </Box>
    </Box>
  )
}

export default SignUp;
