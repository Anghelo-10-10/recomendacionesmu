let Cancion = require('../models/music');

exports.find = async () => {
    return await Cancion.find();
};

exports.addSong = async(req,res)=>{
    console.log("REQUEST RECIBIDO " +req.body)
    const {name,artist,url_video,votes} = req.body;
    const cancion = new Cancion({ name,artist,url_video,votes });
    try{
        await cancion.save();
        console.log("CANCION GUARDADA " + cancion)
        res.status(201).json(cancion);
    }
    catch(error){
        console.error(error);
        res.status(400).json({message: "Error al guardar canción"})
    }
}

exports.updateVotes = async (cancionID) => {
    const updatedSong = await Cancion.findByIdAndUpdate(
        cancionID,
        { $inc: { votes: 1 } },
        { new: true, runValidators: true }
    );
    return updatedSong;
};