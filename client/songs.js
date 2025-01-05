document.addEventListener('DOMContentLoaded', () => {
    todasCanciones();
});

async function updateVotes(cancionID) {
    try {
        const response = await fetch(`http://localhost:3000/music/vote/${cancionID}`, {
            method: 'PUT'
        });
        const actualizarCancion = await response.json();

        const votesDisplay = document.getElementById(`votes-${cancionID}`);
        if (votesDisplay) {
            votesDisplay.textContent = `Votos: ${actualizarCancion.votes}`;
        }
    } catch (error) {
        console.error('Error al actualizar votos:', error);
    }
}

async function todasCanciones() {
    try {
        const response = await fetch('http://localhost:3000/music/all');
        const canciones = await response.json();
        const listaCanciones = document.getElementById('songList');
        
        if (canciones.length === 0) {
            listaCanciones.innerHTML = '<p>No hay canciones disponibles.</p>';
        } else {
            canciones.forEach(cancion => {
                const cancionElement = document.createElement('div');
                cancionElement.id = `song-${cancion._id}`; 
                cancionElement.id = 'randomSong';
                cancionElement.innerHTML = `
                    <h3>${cancion.name} - ${cancion.artist}</h3>
                    <p><a href="${cancion.url_video}" target="_blank">${cancion.url_video}</a></p>
                    <br><p id="votes-${cancion._id}">Votos: ${cancion.votes}</p>
                    <button onclick="updateVotes('${cancion._id}')" class="get">
                        Votar
                    </button>
                `;
                
                listaCanciones.appendChild(cancionElement);
            });
        }
    } catch (error) {
        console.error('Error al cargar las canciones:', error);
        const listaCanciones = document.getElementById('songList');
        listaCanciones.innerHTML = '<p>Hubo un error al cargar las canciones.</p>';
    }
}