import mongoose from "mongoose";

//создание таблицы
const PostSchema = new mongoose.Schema({
    //название столбца
    title: {
        type: String, //тип - строка
        required: true, //обязательное поле
    },
    text:{
        type: String, //тип - строка
        required: true, //обязательное поле
        
    },
    tags: {
        type: Array, //тип - массив
        default: [], //если поле пустое, то сохраняется пустой массив
    },
    viewsCount:{ //количество просмотров
        type:Number, 
        default: 0, // по умолчанию количество просмотров 0
    },
    // ссылаемся на таблицу User через id пользователя
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true, 
    },
    imageUrl:{ 
        type:String,

    },
},
{
    timestamps: true,//дата создания
},
);

export default mongoose.model('Post', PostSchema);//(необходимо назвать модель User, название схемы)
