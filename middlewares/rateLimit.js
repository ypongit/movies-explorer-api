const ratelimit = require('express-rate-limit');

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

module.exports = limiter;
