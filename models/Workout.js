import mongoose from "mongoose";

//создание таблицы
const WorkoutSchema = new mongoose.Schema({
    //название столбца
    title: {
        type: String, //тип - строка
        required: true, //обязательное поле
    },
    text:{
        type: String, //тип - строка
        required: true, //обязательное поле
        
    },
    // ссылаемся на таблицу User через id пользователя
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        
    },
    imageUrl:{ 
        type:String,

    },
    //продолжительность
    duration: {
        type: String,
    },
    difficulty: {
        type: String,
        enum: ['Block_1', 'Block_2', 'Block_3',],
        required: true
  },
    category: {
        type: String,
        enum: ['Все тело', 'Ноги', 'Пресс', 'Руки'],
        required: true
  },
},
{
    timestamps: true,//дата создания
},
);

export default mongoose.model('Workout', WorkoutSchema);//(необходимо назвать модель User, название схемы)
