import { Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import Buttons from '../../Componants/Button/Buttons';
import {ref, set, push, onChildAdded, remove,update} from 'firebase/database';
import { onAuthStateChanged } from "firebase/auth";
import { Auth, DATABASE } from '../../Config/Firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const AppPage = () => {
let [todos,setTodos] = useState([])
let [inputValue , setInputValue] = useState('')
let [userUID , setUserUID] = useState('')
let [Data , setData] = useState([])
let navigation = useNavigate()

const Chack = ()=>{
  onAuthStateChanged(Auth, (user) => {
if (user) {
setUserUID(user.uid)
getData(user.uid) 
getDataFromDatabase(user.uid)      
}else{
  console.log('fail');
}
});
}
useEffect(()=>{

  Chack()
  },[])


  function getData(uid){
    var reference = ref(DATABASE,`UsersDetails/${uid}`)
    onChildAdded(reference,function(data){
      rander1(data.val())
    })
  }
const rander1 = (data)=>{
  if(data){
    setData(pre=>[...pre,data])
  }
    }

    function getDataFromDatabase(uid){
      console.log(uid);
      var reference = ref(DATABASE,`Todos/${uid}`)
      onChildAdded(reference,function(data){
        rander2(data.val())
      })
    }
  const rander2 = (data)=>{
    if(data){
      setTodos(pre=>[...pre,data])
    }
      }

      console.log(todos);
  
      // useEffect(()=>{
      //       },[Data])


const InputValue = (e)=>{
 setInputValue(e.target.value)
}
const AddData = ()=>{
  if(!inputValue){
alert('Enter Todos')
  }else{
    const obj = {
      todo:inputValue
    }
    const keyRef = ref(DATABASE)
    const key = push(keyRef).key
    obj.id = key
    const reference = ref(DATABASE, `Todos/${userUID}/${obj.id}`)
    set(reference, obj)
setInputValue('')
  }
}

const dele = (index)=>{
let delTodo = todos.filter((e,i)=>i!==index)
let id = todos[index].id
const refrance = ref(DATABASE,`Todos/${userUID}/${id}`)
remove(refrance)
setTodos(delTodo)
}

const Update = (index)=>{
let newTodo = prompt('Enter new Todo',todos[index].todo)
todos[index].todo = newTodo
let id = todos[index].id
const refrance = ref(DATABASE,`Todos/${userUID}/${id}`)
update(refrance,{
  todo:newTodo,
})
console.log(newTodo);
setTodos((pre)=>[...pre])
}

const SignOut = ()=>{
signOut(Auth).then(() => {
navigation('/')  
localStorage.clear('uid')
}).catch((error) => {
    console.log(error);
  })
}
  return (
    <>
      <Box sx={{ width: '100%', minHeight: "100vh", backgroundColor: '#e65100' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
            <Box sx={{ ml: 1, width: '60px', height: '60px', backgroundColor: 'white', borderRadius: '50%' }}>
              <img className={styles.imgUser} src={Data[4]} alt="" />
            </Box>
            <Typography variant='h6' sx={{ color: 'white' }}>
              {Data[1]}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, color: 'white',fontSize:17 }}>
            <EmailIcon /> <span>{Data[0]}</span>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
          <Button sx={{ backgroundColor: 'white', color: 'black' }} variant="contained" onClick={SignOut}>SignOut</Button>
        </Box>
        <Box sx={{ gap: 2, mt: 1, width: '100%', Height: "100%", flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField sx={{ width: '60vw' }} InputLabelProps={{ className: styles.hh }} id="standard-basic" label="Enter Your Todos..." variant="standard" onChange={InputValue} value={inputValue}/>
            <Button sx={{ backgroundColor: 'white', color: 'black' }} variant="contained" onClick={AddData}>Add...</Button>
          </Box>

          <Box sx={{ gap: 2, mt: 1, width: '100%', Height: "100%", flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
{
  todos?.map((e,i)=>{
   return <Box key={i} sx={{display: 'flex', alignItems: 'center', gap: 1, p: 1, width:'65vw', backgroundColor:'white', justifyContent:'space-between', flexWrap:'wrap',borderRadius:'10px'}}>
          <span>{e.todo}</span>
          <span><Buttons label='Delete' onClick={()=>dele(i)}/> <Buttons label='Update' onClick={()=>Update(i)}/></span>
          </Box>
  })
}
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default AppPage