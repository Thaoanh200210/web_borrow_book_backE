const app = require("./app");
const config = require("./app/config");
// const MongoDB = require("./app/utils/mongodb.util");
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connect(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/book", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect success");
    }catch(e){
        console.log("Connect failure");
    }
}

async function startServer(){
    try{
        // await MongoDB.connect(config.db.uri);
        // console.log("Connected to the database!");
        await connect();

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }catch (error){
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();