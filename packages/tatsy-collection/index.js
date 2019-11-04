module.exports = {
  collection(col) {
    return (http, url) => {
      
      http.get(`/api/${url}`, (req, res) => {
        return res.json({
          col
        });
      });

      http.get(`/api/${url}/:_id`, (req, res) => {
        return res.json({
          col
        });
      });

      http.delete(`/api/${url}/:_id`, (req, res) => {
        return res.json({
          col
        });
      });

      http.put(`/api/${url}/:_id`, (req, res) => {
        return res.json({
          col
        });
      });

      http.post(`/api/${url}`, (req, res) => {
        return res.json({
          col
        });
      });
    }
  }
}