const { Router } = require('express');
const uploadRouter = Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads' });

uploadRouter.post('/', upload.single('uploaded_file'), (req, res) => {
  // req.file is the name of your file in form above, here 'uploaded_file'
  //req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
  res.end('Uploaded');
});

module.exports = uploadRouter;

/**
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body)
});
 */
