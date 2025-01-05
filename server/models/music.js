let mongoose = require('mongoose');

let cancionSchema = new mongoose.Schema({
    name: {type: String, required:true},
    artist: {type: String, required:true},
    url_video: {type: String, required: true},
    votes: {type: Number, requires:true}
});

let cancion = mongoose.model('song', cancionSchema);

module.exports = cancion;