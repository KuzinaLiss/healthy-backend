import mongoose from "mongoose";

//создание таблицы
const ProductsSchema = new mongoose.Schema({
    //название столбца
    name: { //название продукта
        type: String, //тип - строка
        required: true, //обязательное поле
    },
    calories:{ //количество калорий
        type: Number, //тип - число
        required: true, //обязательное поле
        
    },
    protein: {//количество белков
        type: Number, //тип - число
        required: true, //обязательное поле
    },
    fat:{ ////количество жиров
        type: Number, //тип - число
        required: true, //обязательное поле
    },
    carbohydrates:{ ////количество углеводов
        type: Number, //тип - число
        required: true, //обязательное поле
    },
    // ссылаемся на таблицу User через id пользователя
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true, 
    },

},
{
    timestamps: true,//дата создания
},
);

export default mongoose.model('Products', ProductsSchema);//(необходимо назвать модель Products, название схемы)
