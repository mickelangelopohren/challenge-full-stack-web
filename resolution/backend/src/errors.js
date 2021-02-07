class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "CONFLICT_ERROR";
  }
}

module.exports = {
  ConflictError,
}

