module.exports = {
  uploadOne: async (req, res) => {
    console.log('hello');
    try {
      console.log(req.file);
    } catch (err) {
      console.log(err);
    }
  },
  uploadArray: async (req, res) => {
    try {
      console.log(req.files);
    } catch (err) {
      console.log(err);
    }
  },
};
