import express from 'express'
import cors from 'cors'
import AnimeRoutes from './AnimeRoutes.js'
import UserRoutes from './UserRoutes.js'


const routes = app => {
    app.use(express.json(), cors(), AnimeRoutes, UserRoutes)
}

export default routes;