/**
 * JWT config.
 */
const config = {
  algorithms: ['HS256'],
  secret: 'shhhh', // TODO Put in process.env
};

module.exports = { config };
