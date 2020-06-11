const endpointUrl = (name, type) => {
  if (type == 'getAll' || type == 'post') {
    return `/api/${name}`; 
  }

  return `/api/${name}/:_id`; 
};

const clearSemi = (content) => {
  return content.replace(/;\s*$/, '');
};

module.exports = {
  endpointUrl,
  clearSemi
};