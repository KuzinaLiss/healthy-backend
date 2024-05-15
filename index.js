import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'
import {loginValidation, postCreateValidation, registerValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import * as ProductController from './controllers/ProductController.js';
import * as JournalController from './controllers/JournalController.js';
import * as CommentController from './controllers/CommentController.js';
import * as WorkoutController from './controllers/WorkoutController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';


//соединение с бд
mongoose
.connect('mongodb+srv://admin:wwwwww@cluster0.mrgbhis.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('ok'))
.catch((err) => console.log('error', err));

const app = express();

//хранилище для сохранегия картинок
const storage = multer.diskStorage({
    //когда будет любой файл загружаться, то будет выполняться функция, которая вернёт путь этого файла
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    //перед тем как файл сохранит, она обяснит как он будет называться
    filename: (_, file, cb) =>{
        cb(null, file.originalname);
    }, 
});

//функция, которая позволяет использовать хранилище
const upload = multer({storage});

//даём возможность принимать запросы на получение статичного файла(картинки)
app.use('/uploads', express.static('uploads'));

//даём возможность приложениию читать json запросы, которые приходят 
app.use(express.json());

//даём возможность 
app.use(cors());

// Роут для создания комментария
app.post('/posts/:id/comment',checkAuth , CommentController.createComment);

// Роут для получения комментариев для определенной статьи
app.get('/posts/:id/comments', CommentController.getCommentsByPostId);

//post запрос для авторизации
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);

// post запрос для регистрации
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

// get запрос для поиска данных о пользователе через токен
app.get('/auth/me', checkAuth, UserController.getMe);

// post запрос для добавления информации пользователем
app.post('/posts', checkAuth ,postCreateValidation, handleValidationErrors, PostController.create);

// post запрос для добавления продуктов пользователем
app.post('/products', checkAuth , ProductController.createProd);



//post запрос для добавлении картинки
app.post('/uploads', checkAuth, upload.single('image'), (req,res)=>{ 
   //возвращаем пользователю путь, по которому мы сохранили картинку
    res.json({
        url:`/uploads/${req.file.originalname}`,
    });
});

// get запрос на получение всех тэгов
app.get('/tags',  PostController.getLastTags);

// get запрос на получение всех статей
app.get('/posts',  PostController.getAll);

// get запрос на получение всех тэгов
app.get('/posts/tags', checkAuth,  PostController.getLastTags);

// get запрос на получение всех продуктов
app.get('/products', checkAuth,  ProductController.getAllproducts);



// get запрос на получение одной статьи
app.get('/posts/:id',  PostController.getOne);

// get запрос на получение одного продукта
app.get('/products/:id',  ProductController.getOneProd);

// get запрос на получение запис рассчёта калорий из Журнала
app.get('/journals', checkAuth, JournalController.getJournalEntries);

// post запрос на сохранение записей в Журанл
app.post('/journals', checkAuth, JournalController.createJournal);

// запрос на удаление одной статьи
app.delete('/posts/:id', checkAuth, PostController.remove);

// запрос на удаление одного продукта
app.delete('/products/:id', checkAuth, ProductController.deleteProd);


// запрос на изменение данных в одном документе
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

// запрос на изменение данных в одном документе
app.patch('/products/:id', checkAuth, ProductController.updateProd);

// Роут для получения всех тренировок
app.get('/workouts', WorkoutController.getAll);

// Роут для получения тренировки по идентификатору
app.get('/workouts/:id', WorkoutController.getWorkoutById);

// Роут для создания тренировки
app.post('/workouts', WorkoutController.createWorkout);

// Роут для удаления тренировки
app.delete('/workouts/:id', WorkoutController.deleteWorkout);

// Роут для обновления тренировки
app.patch('/workouts/:id', WorkoutController.updateWorkout);

//запуск приложения на сервере пишем (порт на который хотим прикрепить приложение (любой порт), функцию(если произошла и если всё ок))
app.listen(4444, (err) =>{
    if(err){
        return console.log(err);
    }
    console.log('Server OK');
});
// Обработчик GET-запроса для получения imageUrl
app.get('/post/:id/imageUrl', async (req, res) => {
    try {
      // Находим пост по ID
      const post = await Post.findById(req.params.id);
      
      // Проверяем, существует ли пост с таким ID
      if (!post) {
        return res.status(404).json({ error: 'Пост не найден' });
      }
  
      // Возвращаем imageUrl из поста
      res.json({ imageUrl: post.imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });