let form = document.getElementById("Form")
let button = document.getElementById("save");
let buttonGetRandomSong = document.getElementById("getRandomSong");

button.addEventListener("click", saveData);

buttonGetRandomSong.addEventListener("click", getData);

async function saveData() {
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const songInput = document.getElementById("song");
    const artistInput = document.getElementById("artist");
    const urlInput = document.getElementById("url");
    
    if (!songInput.value.trim() || !artistInput.value.trim() || !urlInput.value.trim()) {
        alert("Todos los campos son obligatorios.");
    } else {
        if (!youtubePattern.test(urlInput.value)) {
            alert("El enlace de youtube no es válido.");
        } else{
            let name = document.getElementById("song").value;
            let artist = document.getElementById("artist").value;
            let url = document.getElementById("url").value;
            let votes = 0;
            let body = JSON.stringify({name,artist,url_video:url,votes})
            try{
                let response = await fetch('http://localhost:3000/music',{
                    method: 'POST',
                    headers:{'Content-Type':'application/json'},
                    body: body
                })
                if(response.status==201){
                    let cancion = await response.body.JSON;
                    console.log(cancion)
                }
            }
            catch(error){
                console.error(error);
            }
            alert("La canción se ha guardado correctamente");
            }}

}

async function getData() {
    try{
        let newElement = document.createElement("p");
        newElement.setAttribute("id", "randomSong");
        let existingElement = form.querySelector("p");
        let response = await fetch('http://localhost:3000/music/random',{
            method: 'GET',
            headers:{
                'Content-type':'application/json',
            },
        })
        let data = await response.json();

        if (!existingElement) {
            newElement.innerHTML = "La canción es: " + data.name + " - " + data.artist + "<br>Enlace: <a href='" + data.url_video + "' target='_blank'>" + data.url_video + "</a> \n <br><br>Votos: " + data.votes;
            form.appendChild(newElement);

            
        }
        else{
            existingElement.remove();
            newElement.innerHTML = "La canción es: " + data.name + " - " + data.artist + "<br>Enlace: <a href='" + data.url_video + "' target='_blank'>" + data.url_video + "</a>\n <br><br>Votos: " + data.votes;
            form.appendChild(newElement);
        }

    }
    catch(error) {
        console.error(error);
    }
}

async function obtenerLasCanciones() {
    try {
        const response = await fetch('http://localhost:3000/songs/all'); // Ajusta la URL si es necesario
        const canciones = await response.json();

        const listaCanciones = document.getElementById('songs-list');
        listaCanciones.innerHTML = ''; // Limpiar el contenedor antes de agregar las canciones

        if (canciones.length === 0) {
            listaCanciones.innerHTML = '<p>No hay canciones disponibles.</p>';
        } else {
            canciones.forEach(cancion => {
                const cancionElement = document.createElement('div');
                cancionElement.classList.add('song-item');
                cancionElement.innerHTML = `
                    <h3>${cancion.name} by ${cancion.artist}</h3>
                    <p><a href="${cancion.url_video}" target="_blank">${cancion.url_video}</a></p>
                `;
                listaCanciones.appendChild(cancionElement);
            });
        }
    } catch (error) {
        console.error('Error al cargar las canciones:', error);
        const listaCanciones = document.getElementById('songs-list');
        listaCanciones.innerHTML = '<p>Hubo un error al cargar las canciones.</p>';
    }
}