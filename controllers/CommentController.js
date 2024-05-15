import Comment from '../models/Comment.js';

// Контроллер для создания комментария
export const createComment = async (req, res) => {
    try{
   console.log(req.userId);
        const doc = new Comment({
        content: req.body.content,
        userId: req.userId, //при авторизации мы получаем id пользователя, который хранится в req, поэтому мы его вытаскиваем
        postId: req.params.id
    });
 
    //сохранение информации в MongoDB
    const com = await doc.save();

    res.json(com); //возвращаем ответ
}
catch (err){
    console.log(err);
    res.status(500).json({
        message: 'Не удалось сохранить комментарий',
    });
}
};

// Контроллер для получения комментариев для определенной статьи
export const getCommentsByPostId = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comment.find({ postId:id}).populate('userId');
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось получить комментарии' });
    }
};