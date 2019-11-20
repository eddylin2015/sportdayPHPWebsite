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
const config = require('../config');

const router = express.Router();
const dir=config.get('SP_REPORT_TO_PUBLIC');
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
  //let dir=process.cwd()+"/files/report_to_public/";
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
  //let dir=process.cwd()+"/files/report_to_public/";
  let fix=null;
  if(req.query.fix) fix=req.query.fix
  let files=fs.readdirSync(dir);
  let JSONdata=[];
  files.forEach(function(file){
    let fstate=fs.statSync(dir+file);
    if(fstate.isDirectory()){}
    else{
      if(file.toString().indexOf('.php')>0||file.toString().indexOf('_tmp.pdf')>0) {}
      else if(fix && file.toString().indexOf('.'+fix)>0){
        JSONdata[JSONdata.length]={fn:file,encfn:encodeURI("/files/"+file),fctime:fstate.ctime};
      }else if(fix==null){
        JSONdata[JSONdata.length]={fn:file,encfn:encodeURI("/files/"+file),fctime:fstate.ctime};
      }
    }
  });
    res.render('namelist/filelist.pug', {
      books: JSONdata,
      profile:req.user
      //nextPageToken: cursor,
    });
});
router.get('/printfilelist.php',oauth2.required,  (req, res, next) => {
  //let dir=process.cwd()+"/files/report_to_public/";
  if(req.user.id>10) {res.end("no right!");return;}
  let fix=null;
  if(req.query.fix) fix=req.query.fix
  let files=fs.readdirSync(dir);
  let JSONdata=[];
  files.forEach(function(file){
    let fstate=fs.statSync(dir+file);
    if(fstate.isDirectory()){}
    else{
      if(file.toString().indexOf('.php')>0) {}
      else if(fix && file.toString().indexOf('.'+fix)>0){
        JSONdata[JSONdata.length]={fn:file,encfn:encodeURI("/files/"+file),fctime:fstate.ctime};
      }else if(fix==null){
        JSONdata[JSONdata.length]={fn:file,encfn:encodeURI("/files/"+file),fctime:fstate.ctime};
      }
    }
  });
    res.render('namelist/filelist.1.pug', {
      books: JSONdata,
      profile:req.user
      //nextPageToken: cursor,
    });
});
const cp=require('child_process');
function spawn_run(cmdarg,callback){
	var ls = cp.spawn(config.get("FOXITREADER")/*command*/, cmdarg/*args*/, {}/*options, [optional]*/);
	var result='';
	ls.stdout.on('data', (data) => {result+=data.toString('utf8');});
	ls.on('close',function(code){return callback(result)});
}
function spawn_php(cmdarg,res){
try{
		spawn_run(cmdarg,function(result){res.end(result)});
	}catch(err)
		{
			console.log("exception:"+err);
		}
}

router.get('/printPDFfile/files/:book',oauth2.required,  (req, res, next) => {
  //let dir=process.cwd()+"/files/report_to_public/";
  res.write(req.params.book);
  if(req.user.id>10) {res.end("no right!");return;}
  if (fs.existsSync(dir+req.params.book)) {
    try{
     spawn_php(["/p",dir+req.params.book],res);
    }catch(err){
      res.end(err.toString());
    }
  }
});
router.get('/printPDFfile2/files/:book',oauth2.required,  (req, res, next) => {
  //let dir=process.cwd()+"/files/report_to_public/";
  res.write(req.params.book);
  if(req.user.id>10) {res.end("no right!");return;}
  for(let i=0;i<2;i++)
  try{
		spawn_run(["/p",dir+req.params.book],function(result){console.log(result)});
	}catch(err)
		{
			console.log("exception:"+err);
		}
   res.end("wait minute");
});
router.get('/printPDFfile3/files/:book',oauth2.required,  (req, res, next) => {
  //let dir=process.cwd()+"/files/report_to_public/";
  res.write(req.params.book);
  if(req.user.id>10) {res.end("no right!");return;}
  for(let i=0;i<3;i++)
  try{
    if (fs.existsSync(dir+req.params.book)) {
       spawn_run(["/p",dir+req.params.book],function(result){console.log(result)});
    }
	}catch(err)
		{
			console.log("exception:"+err);
		}
    res.end("wait minute");
});
const wkhtmltopdf=config.get("WKHTML");
function genpdf_run(cmdarg,callback){
	var ls = cp.spawn( wkhtmltopdf /*command*/, cmdarg/*args*/, {}/*options, [optional]*/);
	var result='';
	ls.stdout.on('data', (data) => {result+=data.toString('utf8');});
	ls.on('close',function(code){return callback(result)});
}
router.get('/genPDF',oauth2.required,  (req, res, next) => {
  //let dir=process.cwd()+"/files/report_to_public/";
  let filename=req.query.fn+"_tmp.pdf";
  res.write(req.query.url);
  if(req.user.id>10) {res.end("no right!");return;}
  try{
    let fileurl="http://localhost/sortableTable"+req.query.url;
    genpdf_run([fileurl,dir+filename],function(result){res.end(`!${filename}!OK!${result}`)});
	}catch(err)
		{
			console.log("exception:"+err);
		}
});


router.get('/tmpToPub/files/:book',oauth2.required,  (req, res, next) => {
  //let dir=process.cwd()+"/files/report_to_public/";
  if(req.user.id>10) {res.end("no right!");return;}
  let sfile=dir+req.params.book;
  if(sfile.indexOf('_tmp.pdf')>0){
    let dfile=sfile.replace("_tmp.pdf","_pub.pdf");
    if (fs.existsSync(sfile)) {
      fs.renameSync(sfile,dfile);
    res.end("ok! to pub")
    }else{
      res.end("file not exists!")
    }
  }else{
    res.end("ERRor tmp file to pub");
  }
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