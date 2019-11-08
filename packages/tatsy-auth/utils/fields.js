const STRING_REQUIRED = {
  type: String,
  required: true,
  trim: true
};

const TOKENS_FIELD = [{
  token: { type: String, required: true },
  when: { type: Date, required: true },
}];

module.exports = {
  STRING_REQUIRED,
  TOKENS_FIELD
};