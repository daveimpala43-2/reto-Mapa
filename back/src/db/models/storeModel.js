import { Schema, model } from 'mongoose';

const storeSchema = new Schema({
    store:{type:String, required:true, unique:true},
    description:{type:String, required: true},
    coordinates: { 
        lat: {type:String, required:true},
        lng: {type:String, required:true}
    },
    active: {type:Boolean, required:true},
    dateAlt: {type:String, required:true},
    dateChan: {type:String, required:true}
})

export default model('store', storeSchema);