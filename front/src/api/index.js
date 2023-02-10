import axios from 'axios';

const BASE_URL = "/api";

async function handleToMakePetitionPost(data,url, headers = {}){
    console.log(`${BASE_URL}/${url}`)
    try{
        console.log(BASE_URL)
        return await axios.post(`${BASE_URL}/${url}`,data, {headers})
        .then(result=>{
            return result
        }).catch(err=>{
            return err
        })
    } catch {
        return false
    }
    
}

async function handleToMakePetitionGet(url, headers = {}){
    try{
        return await axios.get(`${BASE_URL}/${url}`, {headers})
        .then(result=>{
            return result
        }).catch(err=>{
            return err
        })
    } catch {
        return false
    }
    
}

async function handleToMakePetitionDelete(url, headers = {}){
    console.log(`${BASE_URL}/${url}`)
    try{
        console.log(BASE_URL)
        return await axios.delete(`${BASE_URL}/${url}`, {headers})
        .then(result=>{
            return result
        }).catch(err=>{
            return err
        })
    } catch {
        return false
    }
    
}

async function handleToMakePetitionPut(data,url, headers = {}){
    console.log(`${BASE_URL}/${url}`)
    try{
        console.log(BASE_URL)
        return await axios.put(`${BASE_URL}/${url}`,data, {headers})
        .then(result=>{
            return result
        }).catch(err=>{
            return err
        })
    } catch {
        return false
    }
    
}

export {
    handleToMakePetitionPost,
    handleToMakePetitionGet,
    handleToMakePetitionDelete,
    handleToMakePetitionPut
}