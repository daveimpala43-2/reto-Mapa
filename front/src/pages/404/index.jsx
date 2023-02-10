import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../../assets/css/notfound.css";

export default function PageNotFound(){
	
	const navigate = useNavigate()

	return(
		<>
			<div id="background"></div>
				<div className="top">
				  <h1>404</h1>
				  <h3>Pagina no encontrada</h3>
				</div>
				<div className="container">
				  <div className="ghost-copy">
				    <div className="one"></div>
				    <div className="two"></div>
				    <div className="three"></div>
				    <div className="four"></div>
				  </div>
				  <div className="ghost">
				    <div className="face">
				      <div className="eye"></div>
				      <div className="eye-right"></div>
				      <div className="mouth"></div>
				    </div>
				  </div>
				  <div className="shadow"></div>
				</div>
				<div className="bottom">
				  <p>Creo que te perdiste, pero no te preocupes, ¡Aun Puedes Regresar!</p>
				  <div className="buttons">
				    <button className="btn" onClick={()=>{navigate("/location")}}>Regresar</button>
				  </div>
				</div>
		</>
	)
}