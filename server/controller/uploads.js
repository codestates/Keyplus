module.exports = {
  uploadOne: async (req, res) => {
    try {
      console.log(req.file);
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
  uploadArray: async (req, res) => {
    try {
      console.log(req.files);
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
};
