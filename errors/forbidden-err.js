// Обновление чужого профиля, чужого аватара, удаление чужой картины (403).
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
