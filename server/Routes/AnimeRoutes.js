import AnimeController from "../Controller/AnimeController.js";
import express from 'express'

const AnimeRoutes = express.Router()

AnimeRoutes.get('/anime/', AnimeController.getAnimes)
AnimeRoutes.get('/anime/user/:username', AnimeController.getAnimesByUser)
AnimeRoutes.get('/anime/:id', AnimeController.getAnimesById)
AnimeRoutes.get('/anime/titulo/:titulo', AnimeController.getAnimesByTitle)
AnimeRoutes.post('/anime/', AnimeController.createAnime)
AnimeRoutes.put('/anime/:id', AnimeController.updateAnime)
AnimeRoutes.delete('/anime/:id', AnimeController.deleteAnime)

export default AnimeRoutes;