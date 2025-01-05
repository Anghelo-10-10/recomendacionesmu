let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let Routes = require('./routes/serverRoutes');
let app = express();
let port = 3000;

async function connectDB(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/music',{useNewUrlParser:true,useUnifiedTopology: true});
    }
    catch(err){
        console.error("Error en la conexión a Base de Datos", err);
        process.exit(1);
    }
    
}

connectDB();

app.use(cors());
app.use(express.json());
app.use('/music', Routes);

app.listen(port, ()=>{
    console.log("The server is running at http://localhost:3000/music");
})