// проблемы с аутентификацией или авторизацией на сайте 401.
class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthError;
