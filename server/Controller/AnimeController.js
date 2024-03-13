import AnimeModel from '../Model/AnimeModel.js'

class AnimeController{

    static async getAnimes(req, res){
        try{
            const animes = await AnimeModel.find()
            
            if(!animes || animes.lenght === 0){
                res.status(404).json({ message:'Não foi possivel encontrar os animes'})
            }else{
                res.status(200).json(animes)
            }

        } catch(err){
            res.status(500).json({ message: 'Ocorreu um erro ao buscar os animes, tente novamente mais tarde!' })
        }

    }

    static async getAnimesByUser(req, res){
        try{
            const { username } = req.params
            const animes = await AnimeModel.find({user: username})
            
            if(!animes || animes.lenght === 0){
                res.status(404).json({ message:'Não foi possivel encontrar os animes'})
            }else{
                res.status(200).json(animes)
            }

        } catch(err){
            res.status(500).json({ message: 'Ocorreu um erro ao buscar os animes, tente novamente mais tarde!' })
            console.error(err);
        }
    }

    static async getAnimesById(req, res){
        try{
            const { id } = req.params
            const animes = await AnimeModel.findById(id)
            
            if(!animes || animes.lenght === 0){
                res.status(404).json({ message:'Não foi possivel encontrar os animes'})
            }else{
                res.status(200).json(animes)
            }

        } catch(err){
            res.status(500).json({ message: 'Ocorreu um erro ao buscar os animes, tente novamente mais tarde!' })
            console.error(err);
        }
    }

    static async getAnimesByTitle(req, res){
        try{
            const { titulo } = req.params
            const animes = await AnimeModel.find({titulo})
            
            if(!animes || animes.lenght === 0){
                res.status(404).json({ message:'Não foi possivel encontrar os animes'})
            }else{
                res.status(200).json(animes)
            }

        } catch(err){
            res.status(500).json({ message: 'Ocorreu um erro ao buscar os animes, tente novamente mais tarde!' })
            console.error(err);
        }
    }

    static async createAnime(req, res){
        try{
            const anime = req.body

            const newAnime = await AnimeModel.create(anime)
            res.status(201).json({ message: 'Anime cadastrado com sucesso!', data: newAnime })

        } catch(err) {
            res.status(500).json({ message: 'Ocorreu um erro ao cadastrar, tente novamente mais tarde!' })
            console.error(err);
        }
    }

    static async updateAnime(req, res){
        try{

            const { id } = req.params
            const anime = req.body

            const oldAnime = await AnimeModel.findById(id)
            if(oldAnime){
                await AnimeModel.updateOne(anime)
                res.status(201).json({ message: 'Anime atualizado com sucesso!', data: anime })
            }else{
                res.status(404).json({ message: 'Anime não encontrado!' })
            }

        } catch(err) {
            res.status(500).json({ message: 'Ocorreu um erro ao atualizar, tente novamente mais tarde!' })
            console.error(err);
        }
    }

    static async deleteAnime(req, res){
        try{

            const { id } = req.params

            const anime = await AnimeModel.findById(id)
            if(anime){
                await AnimeModel.findByIdAndDelete(id)
                res.status(201).json({ message: 'Anime deletado com sucesso!' })
            }else{
                res.status(404).json({ message: 'Anime não encontrado!' })
            }

        } catch(err) {
            res.status(500).json({ message: 'Ocorreu um erro ao deletar, tente novamente mais tarde!' })
            console.error(err);
        }
    }

}

export default AnimeController
