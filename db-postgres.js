import { randomUUID } from "node:crypto"
import { sql } from './sql.js'

export class dbPostgres {
    
    async list(search){

        let videos
        if(search){
            videos = await sql`select * videos where description ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos`

            return videos
        }
    }

    async create(video){
        const videoId = randomUUID();
        const {title, year, description, genre, director} = video;
        await sql`insert into videos (id, title, year, description, genre, director) values (${videoId}, ${title}, ${year}, ${description}, ${genre}, ${director})`

    }

    async update(id, video){
        const {title, year, description, genre, director} = video;

        await sql`update videos set title = ${title}, year = ${year}, description=${description}, genre = ${genre}, director = ${director}  WHERE id = ${id}`
    }

    async delete(id){
        await sql`delete from videos WHERE id = ${id}`
    }
}