import UserModel from "../Model/UserModel.js"
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
const saltRounds = 8;

class UserController {
    static async createUser (req, res){
        try{
            const { senha, username, email } = req.body

            const user = await UserModel.find({email})

            if(!user[0]){
                const hashPass = await hash(senha, saltRounds)
        
                const newUser = await UserModel.create({username, email, senha: hashPass})
        
                res.status(201).json({ message: 'Usuário cadastrado com sucesso!', data: newUser })

            }else{
                res.status(400).json({ message: 'Já existe um usuário cadastrado com esse email!', user })
            }
    

        } catch (err) {
            res.status(500).json({ message: 'Ocorreu um erro ao cadastrar, tente novamente mais tarde!' })
            console.error(err);
        }
    }
    
    static async login(req, res){
        try{
            const { email, senha } = req.body
            const user = await UserModel.find({email})

            if(user[0]){

                const validatePassword = await compare(senha, user[0].senha)
    
                if(user[0].email === email && validatePassword){
                    res.status(200).json({ message: "Usuário logado com sucesso", data: { 
                        email, 
                        username: user[0].username, 
                        id: user[0]._id
                    }})
                }else{
                    res.status(404).json({ message: 'Email ou senha estão incorretos!' })
                }
                
            }else{
                res.status(201).json({ message: 'Usuário não encontrado!' })
            }
    
    
        } catch (err) {
            res.status(500).json({ message: 'Ocorreu um erro ao fazer login, tente novamente mais tarde!' })
            console.error(err);
        }
    }

}

export default UserController;