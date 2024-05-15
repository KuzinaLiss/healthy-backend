import { validationResult } from 'express-validator';
export default (req, res, next)=>{
    const errors = validationResult(req); //вытаскиваем всё из запроса
    //если в запросе есть ошибки, то присваем статус ошибки 400 (неверный запрос)
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    //если ошибок нет, то иди далее (выполни другую функцию и тд.)
    next();
};