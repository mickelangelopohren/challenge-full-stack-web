class BusinessLogicError extends Error {
  constructor(message) {
    super(message);
    this.name = "BUSINESS_LOGIC_ERROR";
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "CONFLICT_ERROR";
  }
}

module.exports = {
  BusinessLogicError,
  ConflictError,
}

