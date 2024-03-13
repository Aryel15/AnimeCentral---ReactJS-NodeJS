import mongoose from "mongoose";

const AnimeSchema = mongoose.Schema({
    titulo: { type: String, required: true},
    status_: { type: String, required: true},
    nota: { type: Number, required: true},
    user: { type: String, required: true}
})

const AnimeModel = mongoose.model('animes', AnimeSchema)

export default AnimeModel;