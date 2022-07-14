// ошибка базы данных при попытке создать дубликат уникального поля (409).
class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = DuplicateError;
