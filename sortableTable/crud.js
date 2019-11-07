// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const images = require('../lib/images');
const model = require('./model-mysql');
const oauth2=require('../lib/oauth2');
const router = express.Router();

// Automatically parse request body as form data
router.use(bodyParser.urlencoded({extended: false}));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});
/**
 * GET /books
 *
 * Display a page of books (up to ten at a time).
 */
router.get('/', (req, res, next) => {
    //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
    model.sp_list( (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/list.pug', {
      books: entities,
      profile:req.user
      //nextPageToken: cursor,
    });
  });
});
router.get('/sport.php', (req, res, next) => {
    //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
    let si_id=req.query.id;
    let lock=req.query.lock;
    model.read_sport( si_id,(err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/sport.pug', {
      books: entities,
      profile:req.user,
      lock:lock,
      siid:si_id
      //nextPageToken: cursor,
    });
  });
});
router.get('/field.php', (req, res, next) => {
    //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
      let si_id=req.query.id;
      let lock=req.query.lock;
    model.read_field(si_id, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/field.pug', {
      books: entities,
      profile:req.user,
      lock:lock,
      siid:si_id
      //nextPageToken: cursor,
    });
  });
});
router.get('/fieldhj.php', (req, res, next) => {
    //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
      let si_id=req.query.id;
      let lock=req.query.lock;
    model.read_field(si_id, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/fieldhj.pug', {
      books: entities,
      profile:req.user,
      lock:lock,
      siid:si_id
      //nextPageToken: cursor,
    });
  });
});


router.post(
  '/race_post.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    const siid=data.siid;
    const datajson=data.datajson;
    //res.end(siid+JSON.stringify(datajson))
    model.update_race(siid, datajson, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
        //      res.redirect(`${req.baseUrl}/${savedData.id}`);
        res.end(`update ${savedData} rec. succ!`);
    });
  }
);
router.post(
  '/race_lock.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    if(req.file && req.file.filename) data.imageUrl=req.file.filename;
    model.update(req.params.book, data, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  }
);

router.post(
  '/field_post.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    if(req.file && req.file.filename) data.imageUrl=req.file.filename;
    model.update(req.params.book, data, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  }
);
router.post(
  '/field_lock.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    if(req.file && req.file.filename) data.imageUrl=req.file.filename;
    model.update(req.params.book, data, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  }
);



/**
 * Errors on "/books/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;