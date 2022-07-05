// это файл контроллеров кино
const Movie = require('../models/movie');

// удаляет сохранённый фильм по id
const removeMovie = (req, res) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404)
          .send({ message: 'Картина не найдена' })
      }
      if (String(owner) !== req.user._id) {
        return res.status(403)
          .send({ message: 'Картина может быть удалена только создателем!'} )
      }
      return Movie.deleteOne({ _id: movie._id })
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
    })
    .catch(err => console.log(err));
}

// возвращает все сохранённые текущим  пользователем фильмы
const getMovies = (req, res) => {

    Movie.find({ owner: req.user._id })
      // .populate('owner')
      .then(movies => res.status(200).send({ movies }))
      .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
}

// создаёт фильм с переданными в теле данными
const createMovie = (req, res) => {
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
    nameEN
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
    nameEN
  })
    .then(movie => res.status(201).send({ movie }))
    .catch((err) => res.status(500).send({ message: err.message }))
};



module.exports = { createMovie, getMovies, removeMovie };