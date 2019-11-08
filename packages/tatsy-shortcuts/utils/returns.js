const _return = (status, data) => {
  return {
    status,
    data
  };
};

const success = (data) => {
  return _return('success', data);
};

const fail = (name) => {
  return _return('fail', {
    message: `${name} not found`
  });
};

const error = (message) => {
  return _return('error', {
    message
  });
};

module.exports = {
  success,
  fail,
  error
};