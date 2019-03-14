const router = require('express').Router;

action = 'http://localhost:8000/upload';
method = 'post';

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/sim', function(req, res, next) {
  let dispatcher = new Dispatcher();
  console.log(req.files.foo);
  res.send('file uploaded');
});

module.exports = router;
