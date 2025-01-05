let express = require('express');
const router = express.Router();
let ControladorMusica = require("../controller/musicController")

router.get('/random', async (req, res) => {
    try {
        const canciones = await ControladorMusica.find();
        if (canciones.length === 0) {
            throw new Error('No hay canciones disponibles');
        }
        const randomIndex = Math.floor(Math.random() * canciones.length);
        res.status(200).json(canciones[randomIndex]); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las canciones', error });
    }
});

router.get('/all', async (req, res) => {
    try {
        const canciones = await ControladorMusica.find();
        if (canciones.length === 0) {
            throw new Error('No hay canciones disponibles');
        }
        res.status(200).json(canciones); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las canciones', error });
    }
});

router.put('/vote/:id', async (req, res) => {
    try {
        const cancionID = req.params.id;
        console.log('Actualizando votos para la canción:', cancionID);

        const actualizarCancion = await ControladorMusica.updateVotes(cancionID);

        if (!actualizarCancion) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        
        res.json(actualizarCancion);
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ 
            message: 'Error al actualizar votos',
            error: error.message 
        });
    }
});


router.post('/', ControladorMusica.addSong)

module.exports = router;