import WorkoutModel from '../models/Workout.js';

// функция для извлечения всех записей из таблицы
export const getAll =async (req,res)=>{
    try{
        const workouts = await WorkoutModel.find();
        res.json(workouts);
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить статьи',
        });
    }
}

// Контроллер для получения одной тренировки по идентификатору
export const getWorkoutById = async (req, res) => {
    try {
      const { id } = req.params;
      const workout = await WorkoutModel.findById(id);
      if (!workout) {
        throw new Error('Тренировка не найдена');
      }
      res.json(workout);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось найти тренировку',
        });
    }
  };

  // Контроллер для создания тренировки
  export const createWorkout = async(req, res) =>{
    try{
   
            const doc = new WorkoutModel({
            title: req.body.title,
            text: req.body.text,
            user: req.userId, //при авторизации мы получаем id пользователя, который хранится в req, поэтому мы его вытаскиваем
            imageUrl:req.body.imageUrl,
            duration: req.body.duration,
            difficulty: req.body.difficulty,
            category: req.body.category,
            
        });

        //сохранение информации в MongoDB
        const work = await doc.save();

        res.json(work); //возвращаем ответ
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить тренировку',
        });
    }
};

  // Контроллер для удаления тренировки
export const deleteWorkout = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedWorkout = await WorkoutModel.findByIdAndDelete(id);
      if (!deletedWorkout) {
        throw new Error('Тренировка не найдена');
      }
      res.json({ message: 'Тренировка успешно удалена', workout: deletedWorkout });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось удалить тренирровку',
        });
    }
  };

  // Контроллер для обновления тренировки
export const updateWorkout = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedWorkout = await WorkoutModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedWorkout) {
        throw new Error('Тренировка не найдена');
      }
      res.json({ message: 'Тренировка успешно обновлена', workout: updatedWorkout });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось удалить тренирровку',
        });
    }
  };