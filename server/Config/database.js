import mongoose from "mongoose"

async function connectBD(){

    mongoose.connect(process.env.DB_CONNECTION);
    return mongoose.connection;
    
}

export default connectBD;