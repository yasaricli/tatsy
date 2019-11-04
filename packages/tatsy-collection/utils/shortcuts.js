const apiUrl = (name, _id) => {
  if (_id) {
    return `/api/${name}/:${_id}`; 
  }

  return `/api/${name}`; 
};

module.exports = {
  apiUrl
}