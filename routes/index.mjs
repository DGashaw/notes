//var express = require('express');
//var router = express.Router();

import  {default as express} from 'express';
export const router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  res.render('index', { title: 'Notes-App' });
});

//module.exports = router;
