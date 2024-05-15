import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

export const register = async(req,res)=>{
    try{
    
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);//алгоритм шифрования пароля
    const hash = await bcrypt.hash(password, salt);//переменная, которая хранит зашифрованный пароль
    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        role:'user',
        passwordHash:hash,
    });

    //создание пользователя в MongoDB
    const user = await doc.save()

    //формируем токен по id пользователя
    const token = jwt.sign({
        _id: user._id,
    },
    //ключ шифрования
    'secret123',
    //срок жизни токена 30 дней
    {
        expiresIn: '30d',
    });

  
    //если ошибок нет, то мы возвращаем сообщение 
    res.json({
        user: user._doc,
        token,
    });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
}
export const login = async(req,res) =>{
    try{
        const user = await UserModel.findOne({email: req.body.email});

        if(!user){
            return res.status(400).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
         
        if (!isValidPass){
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const userRole = user.role;
        //формируем токен по id пользователя
        const token = jwt.sign({
        _id: user._id,
         },
        //ключ шифрования
        'secret123',
        //срок жизни токена 30 дней
        {
            expiresIn: '30d',
        });
        res.json({
            user: user._doc,
            token,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
}
export const getMe =async (req,res)=>{
    try{
        const user = await UserModel.findById(req.userId);

        if (!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        res.json ({
            user:user._doc,
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'нет доступа',
        });
    }
}