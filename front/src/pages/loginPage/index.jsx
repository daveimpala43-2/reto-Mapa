import React from 'react'

export default function LoginPage({userName, setUserName, userPassword, setUserPassword, handleToLogin}){
    return(
        <div className="center-content">
            <div className="container-fluid display-contents">
                <div className="row main-content text-center">
                    <div className="col-md-12 col-xs-12 col-sm-12 login_form ">
                        <div className="container-fluid py-4">
                            <div className="row">
                                <h2>Login</h2>
                            </div>
                            <div className="row">
                                <form control="POST" className="form-group" onSubmit={handleToLogin}>
                                    <div className="row">
                                        <input type="text" name="username" id="username" className={"form_input " + (userName.isErr ? "input_err" : "")} placeholder="Nombre de usuario" onChange={(e)=>{setUserName({value:e.target.value,isErr:false,msgErr:""})}} value={userName.value}/>
                                        {
                                            userName.isErr ? (
                                                <span className="span_err">{userName.msgErr}</span>
                                            ) : null
                                        }
                                    </div>
                                    <div className="row">
                                        <input type="password" name="password" id="password" className={"form_input " + (userPassword.isErr ? "input_err" : "")} placeholder="Contraseña" onChange={(e)=>{setUserPassword({value:e.target.value,isErr:false,msgErr:""})}} value={userPassword.value}/>
                                        {
                                            userPassword.isErr ? (
                                                <span className="span_err">{userPassword.msgErr}</span>
                                            ) : null
                                        }
                                    </div>
                                    <div className="row">
                                        <input type="submit" value="Ingresar" className="btn_login"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}