import storeSchema from '../../db/models/storeModel.js'

export async function getStores(req, res){
    await storeSchema.find().then(
        (datos)=>{
            return res.status(200).json(datos);
        }
    ).catch(
        (err)=>{
            return res.status(500).json(err);
        }
    );
}

export async function insertStore(req, res){

    const dateAlt = new Date();
    const {storeId, description, coordinates, active} = req.body;

    const newStore = {
        store: storeId,
        description: description,
        coordinates: coordinates,
        active: active,
        dateAlt: dateAlt,
        dateChan: dateAlt
    }

    const store =  new storeSchema(newStore)

    //console.log(store)

    await store.save().then((result)=>{
        return res.status(200).json(result)
    }).catch((err)=>{
        console.log(err)
        return res.status(201).json(err)
    })
    
}

export async function updateStore(req, res){
    const storeIdToCahange = req.params.id
    const dateChan = new Date();

    const storeContent = await storeSchema.find({store:storeIdToCahange})

    if(storeContent.length == 0) return res.status(200).json("Tienda incorrecta")

    const {storeId, description, coordinates, active} = req.body;

    const storeChange = {
        store: storeId,
        description: description,
        coordinates: coordinates,
        active: active,
        dateChan: dateChan
    }

    storeSchema.findByIdAndUpdate(storeContent[0]._id, {$set: storeChange})
    .then((data)=>{
        return res.status(200).json(data)
    }).catch((err)=>{
        console.log(err)
        return res.status(201).json(err)
    })
}

export async function deleteStore(req, res){
    const storeIdToCahange = req.params.id

    const storeContent = await storeSchema.find({store:storeIdToCahange})

    if(storeContent.length == 0) return res.status(200).json("La tienda no existe")

    storeSchema.findByIdAndRemove(storeContent[0]._id)
    .then(()=>{
        return res.status(200).json("Se elimino la tienda correctamente")
    }).catch((err)=>{
        return res.status(201).json(err)
    })
}