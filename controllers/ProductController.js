import ProductsModel from '../models/Products.js';

//функция для добавления продукта в таблицу
export const createProd = async (req,res)=>{
    try{
   
        const doc = new ProductsModel({
        name: req.body.name,
        calories: req.body.calories,
        protein: req.body.protein,
        fat:req.body.fat,
        carbohydrates:req.body.carbohydrates,
        user: req.userId, //при авторизации мы получаем id пользователя, который хранится в req, поэтому мы его вытаскиваем
    });

    //сохранение информации в MongoDB
    const prod = await doc.save();

    res.json(prod); //возвращаем ответ
}
catch (err){
    console.log(err);
    res.status(500).json({
        message: 'Не удалось добавить продукт',
    });
}
}


// функция для извлечения всех записей из таблицы
export const getAllproducts =async (req,res)=>{
    try{

        const userId = req.userId
       
        // извлечение всех записей через find с фильтрацией по пользователю
        const products = await ProductsModel.find({ user: userId }).populate('user').exec();
        //вывод всех статей
        res.json (products);
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить записи',
        });
    }
}

// функция для извлечения одной записи из таблицы
export const getOneProd =async (req,res)=>{
    try{
        //вытаскиваем id таблицы product
        const prodId=req.params.id;

        //Получаем продукт
        const updatedDoc = await ProductsModel.findOne({_id:prodId });
        // если продукта нет, то выводим сообщение
        if (!updatedDoc) {
            return res.status(404).json({
            message: 'Продукт не найден',
          });
        }
        res.json(updatedDoc);
    }
    catch (err){
        console.log(err);
        res.status(500).json({
        message: 'Не удалось получить продукт',
        });
    }
}

// функция для удаления одного продукта из таблицы
export const deleteProd = async (req,res)=>{
    try{
        //вытаскиваем id таблицы Products
        const prodId=req.params.id;

        //Получаем продукт и удаляем его
        const deletedDoc = await ProductsModel.findOneAndDelete({_id:prodId },);
       
        // если продукт не удалился
        if (!deletedDoc) {
            return res.status(404).json({
            message: 'Не удалось продукт',
          });
        }

        //если продукт был удален
        res.json({
            success:true,
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json({
        message: 'Не удалось получить продукт',
        });
    }
}

// функция для изменения продукта в таблице
export const updateProd = async (req,res)=>{
    try{
        //вытаскиваем id таблицы product
        const prodId=req.params.id;

        //Получаем продукт и удаляем его
        const updatedDoc = await ProductsModel.findOneAndUpdate(
            {_id:prodId },
            {
                name: req.body.name,
                calories: req.body.calories,
                protein: req.body.protein,
                fat:req.body.fat,
                carbohydrates:req.body.carbohydrates,
                user: req.userId,
            },
            {new: true}
        );
       
        // если продукт не изменился
        if (!updatedDoc) {
            return res.status(404).json({
            message: 'Не удалось изменить продукт',
          });
        }

        //если продукт изменился
        res.json({
            success:true,
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json({
        message: 'Не удалось получить продукт',
        });
    }
}