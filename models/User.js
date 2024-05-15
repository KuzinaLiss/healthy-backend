import mongoose from "mongoose";

//создание таблицы
const UserSchema = new mongoose.Schema({
    //название столбца
    fullName: {
        type: String, //тип - строка
        required: true, //обязательное поле
    },
    email:{
        type: String, //тип - строка
        required: true, //обязательное поле
        unique: true, //уникальное поле
    },
    passwordHash: {
        type: String, //тип - строка
        required: true, //обязательное поле
    },
    role:{
        type: String,
        enum: ['admin', 'user'],//может принимать только 2 значения: администратор или пользователь
        default: 'user',//по умолчанию будет принимать аргумент: пользователь
    },
    avatarUrl: String,
},
{
    timestamps: true,//дата создания
},
);

export default mongoose.model('User', UserSchema);//(необходимо назвать модель User, название схемы)
