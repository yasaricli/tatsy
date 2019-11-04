const returnJSON = (status, data) => {
  return {
    status,
    data
  }
};

const returnSuccess = (data) => {
  return {
    status: 'success',
    data
  }
};

const returnFail = (name, data) => {
  return {
    status: 'fail',
    data: {
      message: `${name} not found`
    }
  }
};

module.exports = {
  returnJSON,
  returnSuccess,
  returnFail
}