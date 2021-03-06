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
const fs=require("fs");
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
const dir="C:/AppServ/www/report_to_public/namelist/"
router.get('/', (req, res, next) => {
  let files=fs.readdirSync(dir);
  let JSONdata=[];
  files.forEach(function(file){
    let fstate=fs.statSync(dir+file);
    if(fstate.isDirectory()){}
    else{
      JSONdata[JSONdata.length]={fn:file,encfn:encodeURI(file),fctime:fstate.ctime};
    }
  });
    res.render('namelist/filelist.pug', {
      books: JSONdata,
      profile:req.user
      //nextPageToken: cursor,
    });
});

router.get('/filelist.php', (req, res, next) => {
  //let dir=process.cwd()+"/files/namelist/";
  let files=fs.readdirSync(dir);
  let JSONdata=[];
  files.forEach(function(file){
    let fstate=fs.statSync(dir+file);
    if(fstate.isDirectory()){}
    else{
      JSONdata[JSONdata.length]={fn:file,encfn:encodeURI(file),fctime:fstate.ctime};
    }
  });
    res.render('namelist/filelist.pug', {
      books: JSONdata,
      profile:req.user
      //nextPageToken: cursor,
    });
});
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