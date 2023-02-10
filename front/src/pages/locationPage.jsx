import {useState, memo, useEffect} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindowF  } from '@react-google-maps/api';
import {handleToMakePetitionGet} from '@api'

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const centers = {
    lat: 19.4310674,
    lng: -99.1344951
  };
  
function LocationPage() {

  const [markActive, setMarkActive] = useState(null)
  const [storeList ,setStoreList] = useState([])

  const handleShowInfoView = (id) =>{
    if(id == markActive){
      return false
    }
    setMarkActive(id)
  }

  useEffect(()=>{
    handleToMakePetitionGet("store",{}).then((result)=>{
      if(result.data && result.status == 200){
          setStoreList(result.data)
      }
  })
  },[])

  return (
    <div style={{width:"100vw", height:"100vh"}}>
        <LoadScript
        googleMapsApiKey="AIzaSyCI-eGv_rhIuLcpg9CvdkxkpOEyN8-wmYA"
        >
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={centers}
              zoom={11}
          >
          {storeList.map(({store,description,coordinates,active})=>(
              active ? (
                <MarkerF
                  key={store}
                  position={{lat:parseFloat(coordinates.lat),lng:parseFloat(coordinates.lng)}}
                  onClick={()=>{handleShowInfoView(store)}}
                  icon={"/shopFlag.png"}>
                  { markActive == store ? (
                    <InfoWindowF onCloseClick={() => setMarkActive(null)}>
                      <div>{description}</div>
                    </InfoWindowF>
                    ) :
                    (null)
                  }
                </MarkerF>
                ) : null 
            ))}
          </GoogleMap>
        </LoadScript>
    </div>
  )
}

export default memo(LocationPage)