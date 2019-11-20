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
const images = require('./images');
const rc2mrk = require('./sport_rc2mrk/rc2mrkdata_cfg.js');
const oauth2=require('../lib/oauth2');
function getModel () {
    return require(`./model-mysql-pool`);
}
function fmt_title(username, datestr, description) {
    description = description.split("\n")[0];
    //description = description.length > 10 ? description.substring(0, 10) : description;
    datestr = datestr.length > 10 ? datestr.substring(0, 10) : datestr;
    return username + ":" + datestr + ":" + description;
}
function fmt_now() {
    var d = new Date();
    var dstr = d.getFullYear() + "-";
    if (d.getMonth() < 9) dstr += "0";
    dstr += d.getMonth()+1 + "-";
    if (d.getDate() < 9) dstr += "0";
    dstr += d.getDate();
    return dstr;
}
function fmt_time() {
    var d = new Date();
    var dstr = d.getFullYear() + "-";
    if (d.getMonth() < 10) dstr += "0";
    dstr += d.getMonth() + 1 + "-";
    if (d.getDate() < 10) dstr += "0";
    dstr += d.getDate();
    dstr += " "+d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() +
        ":" + d.getMilliseconds()
    return dstr;
}
const router = express.Router();
// Use the oauth middleware to automatically get the user's profile
// information and expose login/logout URLs to templates.
// Set Content-Type for all responses for these routes

/**
 * GET /books/add
 *
 * Display a page of books (up to ten at a time).
 */
router.get('/', oauth2.required, (req, res, next) => {
    let date=new Date();
    let periodno =Math.ceil((Number(date.getFullYear()*100+date.getMonth())-200609)/100);
    //console.log(periodno);
    //console.log(Number(date.getFullYear()*100+date.getMonth()));
    getModel().list( req.user.id,periodno,
        (err, entities, cursor) => {
        if (err) {
            next(err);
            return;
        }
        res.render('execudept/sportgroup/rchistory.pug', {
            profile: req.user,
            books: entities,
            periodno:periodno,
            nextPageToken: cursor
        });
    });
});
router.get('/rchistory',  (req, res, next) => {
    //let staf_ref = netutils.id2staf(req.user);
    //let econdestr=netutils.getClientInfoMD5(req);
    getModel().listMore(1000, req.user.id,
        req.query.pageToken,
        (err, entities, cursor) => {
        if (err) {
            next(err);
            return;
        }
        res.render('execudept/sportgroup/rchistory.pug', {
            profile: req.user,
            books: entities,
            nextPageToken: cursor
        });
    });
});
router.get('/GR', (req, res, next) => {
    //let staf_ref = netutils.id2staf(req.user);
    //let econdestr=netutils.getClientInfoMD5(req);
    getModel().listGR( req.user.id,
        (err, entities, cursor) => {
        if (err) {
            next(err);
            return;
        }
        res.render('execudept/sportgroup/rcgr.pug', {
            profile: req.user,
            books: entities,
            nextPageToken: cursor
        });
    });
});
router.get('/rc2mrkChgTable', (req, res, next) => {
    //let staf_ref = netutils.id2staf(req.user);
    //let econdestr=netutils.getClientInfoMD5(req);
    res.render('execudept/sportgroup/rc2mrkChgTable.pug', {
        profile: req.user,
        books: rc2mrk.mrkgrd
    });
});

router.get('/updateOneDay',
 (req, res, next) => {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Vary': 'Accept-Encoding',
        'Connection': 'keep-alive'});
    if (req.user.id == '2002024' || req.user.id == '2016023' || req.user.id == '2000003') {
        const cp = require("child_process");
        let d = (new Date(Date.now() - 3600 * 12 * 1000  ));        
        let dstr = d.toISOString().substring(0, 10) + ' 00:00:00 GMT';
        res.write(dstr);
        //console.log(dstr);
        let cproc=cp.fork("childproc/appOneDay.js", [dstr]);
        cproc.on('message', function(m) {            
           res.write(".<br/>");           
           if(m=="upd") res.end("<a href=/a/zwg/>data updated !</a>");
        });
        //res.redirect('/internal/dashboard');
    }else {
        res.redirect('/a/zwg/');
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