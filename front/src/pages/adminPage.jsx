import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {handleToMakePetitionPost} from '@api'

import AuthContext from '@context/authContext'

import LoginPage from './loginPage';

export default function LocaionPage(){

    const navigate = useNavigate()

    const {handleAuth, userLoad} = useContext(AuthContext)

    const [userName, setUserName] = useState({value:"",isErr:false,msgErr:""});
    const [userPassword, setUserPassword] = useState({value:"",isErr:false,msgErr:""});

    const [isUserLogin, setIsUserLogin] = useState(userLoad ? true : false )

    const handleToLogin = (e) =>{
        e.preventDefault();
        console.log(userName.value == false)
        if(!userName.value || !userPassword.value){
            if(!userName.value){
                setUserName({value:userName.value,isErr:true,msgErr:"El campo no puede estar vacio"})
            }
            if(!userPassword.value){
                setUserPassword({value:userPassword.value,isErr:true,msgErr:"El campo no puede estar vacio"})
            }
            return false
        }

        if(userName.value){
            setUserName({value:userName.value,isErr:false,msgErr:""})
        }

        if(userPassword.value){
            setUserPassword({value:userPassword.value,isErr:false,msgErr:""})
        }
        
        const dataLogin = {
            userName: userName.value,
            userPassword: userPassword.value
        }

        handleToMakePetitionPost(dataLogin,"user").then((result)=>{
            if(result.data.token){
                handleAuth(result.data.token)
                setIsUserLogin(true)
                navigate("/admin/settings")
            }
        })
    }
    
    return(
        <>
            {
                isUserLogin ? 
                (null) : 
                (
                    <LoginPage userName={userName} setUserName={setUserName} userPassword={userPassword} setUserPassword={setUserPassword} handleToLogin={handleToLogin}/>
                )
            }
        </>
    )
}