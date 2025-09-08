const { httpGet } = require('./mock-http-interface');

const HTTP_OK = 200;

const getArnieQuotes = async (urls) => {
  // fetch all URLs in parallel for speed
  const promises = urls.map(async (url) => {
    
    const response = await httpGet(url);
    const body = JSON.parse(response.body);
    const message = body.message;

    let result;
    if (response.status === HTTP_OK) {
      result = { 'Arnie Quote': message };
    } else {
      result = { 'FAILURE': message };
    }

    return result;
  });

  return Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
