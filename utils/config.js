// адрес Mongo-сервера, секретный ключ для JWT в режиме разработки
require('dotenv').config();

const {
  PORT = 3000, JWT_SECRET, MONGOOSE_DB_URL, NODE_ENV,
} = process.env;
// const { PORT = 3000, NODE_ENV, MONGOOSE_DB_URL } = process.env;
const MONGO_URL = MONGOOSE_DB_URL || 'mongodb://localhost:27017/moviesdb';
const JWT_SECRET_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'dev-secret';

module.exports = {
  MONGO_URL,
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
};
