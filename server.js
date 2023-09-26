import { fastify } from 'fastify'
import { dbPostgres } from './db-postgres.js'
const server = fastify()
const port = '3333'

//const database = new db()

const database = new dbPostgres()

// POST the new video to video page
server.post('/videos', async (request, reply) => {
    // Request Body
    const {title, year, description, director, genre} = request.body
    await database.create({
        title,
        year,
        description,
        director,
        genre
    })

    return reply.status(201).send()
})

// GET all uploaded videos from server
server.get('/videos', async (req, reply) => {
    const videos = await database.list()
    console.log(videos)
    return videos
})

// Use PUT and route parameter to identify the single entity to update
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, year, description, director, genre} = request.body
    const video = await database.update(videoId, {
        title,
        year,
        description,
        director,
        genre
    })

    return reply.status(204).send()

})

// DELETE the specified video from route parameter
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

// GET the homepage of the application
server.get('/', () => {
    return 'Videos'
})

// Running the server on specified port
server.listen({    
    port: port
})