import React, {useState, useEffect, useContext} from 'react'

import Table from 'react-bootstrap/Table';
import ModalComponet from '../component/modal'

import {handleToMakePetitionGet, 
        handleToMakePetitionPost, 
        handleToMakePetitionDelete,
        handleToMakePetitionPut} from '@api'

import AuthContext from '@context/authContext'

export default function SettingPage(){
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [storeList, setStoreList] = useState([])
  const [storeSelect, setStoreSelect] = useState({});

  const [storeId, setStoreId] = useState({value:"",isErr:"", msgErr:""})
  const [storeDesc, setStoreDesc] = useState({value:"",isErr:"", msgErr:""})
  const [coordLat, setCoordLat] = useState({value:"",isErr:"", msgErr:""})
  const [coordLng, setCoordLng] = useState({value:"",isErr:"", msgErr:""})
  const [storeAct, setStoreAct] = useState({value:false,isErr:"", msgErr:""})

  const [titleModal, setTitleModal] = useState("")

  const {userLoad, handleLogOut} = useContext(AuthContext)

  const headers = {
    'authorization' : `Bearer ${userLoad}`
  }

  const handleClose = () => {
    setShow(false)
    setShowDelete(false)
    setStoreId({value:"",isErr:"", msgErr:""})
    setStoreDesc({value:"",isErr:"", msgErr:""})
    setCoordLng({value:"",isErr:"", msgErr:""})
    setCoordLat({value:"",isErr:"", msgErr:""})
    setStoreAct({value:false,isErr:"", msgErr:""})
    setStoreSelect({})
  };

  const handleShow = (typeExc, storeId) => {
    switch (typeExc){
      case "add":
        setShow(true)
        setTitleModal("Alta Tienda")
        break;
      case "upd":
        setShow(true)
        handleToSelectStore(storeId)
        console.log(storeSelect)
        setTitleModal("Modificación Tienda ")
        break;
      case "del":
        setShowDelete(true)
        handleToSelectStore(storeId)
        setTitleModal("Borrar Tienda " + storeId)
        break;
    }
  };

  const handleToAddStore = () =>{

    if(handleToValideForm()) {
      return false
    } 
    else {
      const newStore = {
        "storeId":storeId.value,
        "description": storeDesc.value,
        "coordinates": {"lat": coordLat.value, "lng": coordLng.value},
        "active": storeAct.value
      }

      handleToMakePetitionPost(newStore,"store",headers).then((result)=>{
        if(result.status == 201 && result.data.code == 11000){
          var keyName = Object.keys(result.data.keyPattern);
          console.log(keyName)
          if(keyName[0] == "store"){
            setStoreId({value:storeId.value, isErr:true, msgErr:"Esta tienda ya esta dada de alta"})
          }
          if(keyName[0] == "coordinates"){
            setCoordLat({value:coordLat.value, isErr:true, msgErr:"Esta coordenada ya esta dada de alta"})
          }
        }
        if(result.data && result.status == 200){
          handleToloadStores()
        }
      })
    }
  }

  const handleToloadStores = () =>{
    handleToMakePetitionGet("store",{}).then((result)=>{
        if(result.data){
            handleClose()
            setStoreList(result.data)
            console.log(result.data)
        }
    })
  }

  const handleToDeleteStore = () =>{

    const storeId = storeSelect.store
    console.log(storeId)

    handleToMakePetitionDelete(`store/change/${storeId}`,headers).then((result)=>{
        if(result.data){
            handleToloadStores()
        }
    })
  }

  const handleToUpdateStore = () =>{
    const storeIdOld = storeSelect.store

    if(handleToValideForm()) {
      return false
    } 

    const newStore = {
      "storeId":storeId.value,
      "description": storeDesc.value,
      "coordinates": {"lat": coordLat.value, "lng": coordLng.value},
      "active": storeAct.value
    }

    console.log(newStore)

    handleToMakePetitionPut(newStore, `store/change/${storeIdOld}`,headers).then((result)=>{
      if(result.status == 201 && result.data.code == 11000){
        var keyName = Object.keys(result.data.keyPattern);
        console.log(keyName)
        if(keyName[0] == "store"){
          setStoreId({value:storeId.value, isErr:true, msgErr:"Esta tienda ya esta dada de alta"})
        }
        if(keyName[0] == "coordinates"){
          setCoordLat({value:coordLat.value, isErr:true, msgErr:"Esta coordenada ya esta dada de alta"})
        }
      }
      if(result.data && result.status == 200){
        handleToloadStores()
      }
    })
  }

  const handleToSelectStore = (storeId) =>{
    const storeSelectTemp = storeList.filter((store)=> store.store == storeId )[0]
    setStoreSelect(storeSelectTemp)
    console.log(storeSelectTemp.coordinates?.lat)
    setStoreId({value:storeSelectTemp.store,isErr:"", msgErr:""})
    setStoreDesc({value:storeSelectTemp.description,isErr:"", msgErr:""})
    setCoordLat({value:storeSelectTemp.coordinates?.lat,isErr:"", msgErr:""})
    setCoordLng({value:storeSelectTemp.coordinates?.lng,isErr:"", msgErr:""})
                    
    setStoreAct({value:storeSelectTemp.active,isErr:"", msgErr:""})
  }

  const handleToValideForm = () =>{
    let errors = false
    
    const longitudeRegex = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,6})?|180(?:\.0{1,6})?)$/;
    const latitudeRegex = /^(-?[1-8]?\d(?:\.\d{1,6})?|90(?:\.0{1,6})?)$/;

    if(!storeId.value || !storeDesc.value || !coordLat.value || !coordLng.value){
      if(!storeId.value){
        setStoreId({value:storeId.value, isErr:true, msgErr:"El campo no puede estar vacio"})
        errors = true
      }
      if(!storeDesc.value){
        setStoreDesc({value:storeDesc.value, isErr:true, msgErr:"El campo no puede estar vacio"})
        errors = true
      }
      if(!coordLat.value){
        setCoordLat({value:coordLat.value, isErr:true, msgErr:"El campo no puede estar vacio"})
        errors = true
      }
      if(!coordLng.value){
        setCoordLng({value:coordLng.value, isErr:true, msgErr:"El campo no puede estar vacio"})
        errors = true
      }
      
    }

    if(!latitudeRegex.test(coordLat.value) && coordLat.value){
      setCoordLat({value:coordLat.value, isErr:true, msgErr:"La latitud debe de encontrase en un rango de -89 a 90 y con 6 Decimales"})
      errors = true
    }
    if(!longitudeRegex.test(coordLng.value) && coordLng.value){
      setCoordLng({value:coordLng.value, isErr:true, msgErr:"La latidud debe de encontrarse en un rango de -179 a 180 y con 6 Decimales"})
      errors = true
    }
    return errors
  }

  useEffect(()=>{
    handleToloadStores()
  },[])

	return(
		<>
      <div className="container-fluid card-container">
        <div className="card-settings"> 
          <div className="card-header">
            <h3>Configuracion de Tiendas</h3>
            <img className='icon_logout' src="/logout.svg" onClick={()=>handleLogOut()}/>
          </div>

          <div className="card-header">
            <h4>Lista de Tiendas</h4>
            <button className="btn_card" onClick={()=>handleShow("add")}>Agregar tienda</button>
          </div>
          <div className="card-body tableFix">
            {
              storeList.length > 0 ? (
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Numero de Tienda</th>
                        <th>Nombre de la tienda</th>
                        <th>Coordenadas</th>
                        <th>Activo</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storeList.map((store,key)=>{
                        return(
                          <tr key={key} className={"row_store"} >
                            <td>{store.store}</td>
                            <td>{store.description}</td>
                            <td>{store.coordinates.lat} - {store.coordinates.lng}</td>
                            <td><div className={"circle_card " + (store.active ? "on" : "off")} /></td>
                            <td><button className={"btn_card btn_upd"} onClick={()=>handleShow("upd", store.store)}>Editar</button></td>
                            <td><button className={"btn_card btn_del"} onClick={()=>handleShow("del", store.store)}>Borrar</button> </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div className=""> Aun no Existen Tiendas. </div>
                )
            }
          </div>
        </div>
      </div>

      <ModalComponet show={show} handleClose={handleClose} tittle={titleModal} tittleSave={"Guardar Cambios"} handleToSendForm={storeSelect.store ? handleToUpdateStore : handleToAddStore}>
          <div className="form-group">
            <div className="row">
                <label htmlFor="storeId" className="label my-1 fw-bold"> Numero de Tienda </label>
                <input type="text" name="storeId" id="storeId" className={"form_input input_modal " + (storeId.isErr ? "input_err" : "")} placeholder="Numero de Tienda" value={storeId.value} onChange={(e)=>{ setStoreId({value:e.target.value,isErr:"", msgErr:""})}}/>
                {storeId.isErr ? (
                  <span className='span_err'>{storeId.msgErr}</span>
                ) : null}

            </div>
            <div className="row">
            <label htmlFor="storeName" className="label my-1 fw-bold"> Nombre de Tienda </label>
                <input type="text" name="storeName" id="storeName" className={"form_input input_modal " + (storeDesc.isErr ? "input_err" : "")} placeholder="Nombre de Tienda" value={storeDesc.value} onChange={(e)=>{setStoreDesc({value:e.target.value,isErr:"", msgErr:""})}}/>
                {storeDesc.isErr ? (
                  <span className='span_err'>{storeDesc.msgErr}</span>
                ) : null}

            </div>
            <div className="row">
            <label className="label my-1 fw-bold" data-toggle="tooltip" title="DD - Grados Decimales "> Coordenadas (DD) </label>
                <div className='coordenada'>
                  <div className='input_coordenada'>
                    <input type="text" name="lat" id="lat" className={"form_input input_modal input_coor " + (coordLat.isErr ? "input_err" : "")} placeholder="Latitud" value={coordLat.value} onChange={(e)=>{setCoordLat({value:e.target.value,isErr:"", msgErr:""})}}/>
                    {coordLat.isErr ? (
                      <span className='span_err'>{coordLat.msgErr}</span>
                    ) : null}
                  </div>

                  <div className='input_coordenada'>
                    <input type="text" name="lng" id="lng" className={"form_input input_modal input_coor " + (coordLng.isErre ? "input_err" : "")} placeholder="Longitud" value={coordLng.value} onChange={(e)=>{setCoordLng({value:e.target.value,isErr:"", msgErr:""})}}/>
                    {coordLng.isErr ? (
                      <span className='span_err'>{coordLng.msgErr}</span>
                    ) : null}
                  </div>
                </div>
            </div>
            <div className="row">
            <label className="label my-1 fw-bold"> Activa </label>
                <div className="toggleWrapper">
                  <input className="dn" id="dn" type="checkbox" defaultChecked={storeSelect.active} onChange={()=>{setStoreAct({value:!storeAct.value,isErr:"", msgErr:""})}}/>
                  <label className="toggle" htmlFor="dn"><span className="toggle__handler"></span></label>
                </div>
            </div>
          </div>
      </ModalComponet>


      <ModalComponet show={showDelete} handleClose={handleClose} tittle={titleModal} tittleSave={"Eliminar tienda"} handleToSendForm={handleToDeleteStore}>
          <div className="form-group">
            <div className="row">
                <label className="fw-bold"> Numero de Tienda </label>
                <label>{storeSelect.store}</label>
            </div>
            <div className="row">
            <label className="fw-bold"> Nombre de Tienda </label>
                <label>{storeSelect.description}</label>
            </div>
            <div className="row">
            <label className="fw-bold"> Coordenadas (DD) </label>
              <label>{storeSelect.coordinates?.value} - {storeSelect.coordinates?.lng}</label>
            </div>
            <div className="row">
            <label className="fw-bold"> Activa </label>
                <div className="toggleWrapper">
                  <input className="dn" id="dnDel" type="checkbox" defaultChecked={storeSelect.active}/>
                  <label className="toggle" htmlFor="dn"><span className="toggle__handler"></span></label>
                </div>
            </div>
          </div>
      </ModalComponet>
		</>
	)
}