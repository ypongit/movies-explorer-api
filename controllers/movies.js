// файл контроллеров кино
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ValidationError = require('../errors/validation-err');

// удаляет сохранённый фильм по id
const removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Картина не найдена');
        /* return res.status(404)
          .send({ message: 'Картина не найдена' }); */
      }

      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError('Картина может быть удалена только создателем!');
        /* return res.status(403)
          .send({ message: 'Картина может быть удалена только создателем!' }); */
      }
      return Movie.deleteOne({ _id: movie._id })
        .then(() => res.status(200).send({ message: 'Фильм удален' }));
    })
    .catch(next);
};

// возвращает все сохранённые текущим  пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    // .populate('owner')
    .then((movies) => res.status(200).send({ movies }))
    .catch(next);
};

// создаёт фильм с переданными в теле данными
const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методы создания фильма');
      }
    })
    .catch(next);
};

module.exports = { createMovie, getMovies, removeMovie };
