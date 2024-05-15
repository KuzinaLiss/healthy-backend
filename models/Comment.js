import mongoose from "mongoose";

// Создание схемы для комментариев
const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', // Ссылка на таблицу статей
        required: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Ссылка на таблицу пользователей
        required: true, 
    },
    content: {
        type: String, // Текст комментария
        required: true, 
    },
    createdAt: {
        type: Date, // Дата создания комментария
        default: Date.now,
        required: true, 
    }
});

// Создание модели для комментариев
export default mongoose.model('Comment', CommentSchema);