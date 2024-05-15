import JournalModel from '../models/Journal.js';

// Функция для получения данных журнала пользователя
export const getJournalEntries = async (req, res) => {
    try {
        const userId = req.userId; // Получаем идентификатор пользователя из запроса
        // Находим все записи в журнале для данного пользователя
        const journalEntries = await JournalModel.find({ user: userId }).populate('user').exec();
        res.json(journalEntries); // Отправляем записи журнала в ответе
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить записи',
        });
    }
};
//функция для добавления записи в таблицу
export const createJournal = async (req,res)=>{
    try{
        const currentDate = new Date().toISOString().split('T')[0];
        const doc = new JournalModel({
        date: currentDate,
        calories: req.body.calories,
        protein: req.body.protein,
        fat:req.body.fat,
        carbohydrates:req.body.carbohydrates,
        user: req.userId, //при авторизации мы получаем id пользователя, который хранится в req, поэтому мы его вытаскиваем
    });

    //сохранение информации в MongoDB
    const jour = await doc.save();

    res.json(jour); //возвращаем ответ
}
catch (err){
    console.log(err);
    res.status(500).json({
        message: 'Не удалось добавить продукт',
    });
}
}

