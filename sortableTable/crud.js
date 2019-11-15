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
const rc_rep=require('./rc_rep')
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
router.get('/', oauth2.required,  (req, res, next) => {
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
    const siid=data.siid;
    model.update_race_lock(siid, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.end(`${siid} locked. affect ${JSON.stringify(savedData)}`)
    });
  }
);

router.post(
  '/field_post.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    const siid=data.siid;
    const datajson=data.datajson;
    //res.end(siid+JSON.stringify(datajson))
    model.update_field(siid, datajson, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      //res.redirect(`${req.baseUrl}/${savedData.id}`);
      res.end(`update ${savedData} rec. succ!`);
    });
  }
);
router.post(
  '/field_lock.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    const siid=data.siid;
    model.update_field_lock(siid, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.end(`${siid} locked. affect ${JSON.stringify(savedData)}`)
    });
  }
);
router.get('/rc/namelist/:book', (req, res, next) => {
  //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
  if(req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);
  
  let si_id=req.params.book;
  model.read_sport( si_id,(err, entities, cursor) => {
  if (err) {
    next(err);
    return;
  }//base req.Url

  res.write(`<script>var fn='${entities[0][0].s_item}名單';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
  if(entities[0][0].rcx=="RC5")
  {
    res.end(rc_rep.out2html__long(entities));
  }else{
  res.end(rc_rep.out2html__(entities));
  }
});
});
function rc_sort(a,b){
//DQ 犯規DNF 中退DNS 棄權DR 請假 
if(b.note=="DR"||b.note=="DNS"||b.note=="DQ")  return -1;
if(a.note=="DR"||a.note=="DNS"||a.note=="DQ")  return 1;
if(a.rank==null && b.rank==null)return 0;
if(b.rank==null )return -1;
if(a.rank==null )return 1;
let n1=a.rank.match(/[0-9]+/g)
let n2=b.rank.match(/[0-9]+/g)
if(!n2) return -1;
if(!n1) return 1;
return Number(n1)-Number(n2);
}
router.get('/rc/result/:book', (req, res, next) => {
  //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
  if(req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);
  let si_id=req.params.book;
  model.read_sport( si_id,(err, entities, cursor) => {
  if (err) {
    next(err);
    return;
  }
  entities[1].sort(rc_sort);
  res.write(`<script>var fn='${entities[0][0].s_item}賽果';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
  if(entities[0][0].rcx=="RC5")
  {
    res.end(rc_rep.out2html__long(entities));
  }else{
  res.end(rc_rep.out2html__(entities));
  }
});
});
function prom_rc_sort(a,b){
  //DQ 犯規DNF 中退DNS 棄權DR 請假 
  if(b.note=="DR"||b.note=="DNS"||b.note=="DQ")  return -1;
  if(a.note=="DR"||a.note=="DNS"||a.note=="DQ")  return 1;
  if(a.rc==null && b.rc==null)return 0;
  if(b.rc==null )return -1;
  if(a.rc==null )return 1;
  let n1=a.rc.match(/[0-9]+/g)
  let n2=b.rc.match(/[0-9]+/g)
  if(!n2) return -1;
  if(!n1) return 1;
  if(n1.length != n2.length)  return n1.length - n2.length;
  let res= 0;
  for(let i=0;i<n1.length;i++){
    res=Number(n1[i])-Number(n2[i]);
    if(res != 0) return res;
  }
  return 0;
  }
router.get('/rc/prom/:book', (req, res, next) => {
  //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
  if(req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);
  let si_id=req.params.book;
  model.read_sport( si_id,(err, entities, cursor) => {
  if (err) {
    next(err);
    return;
  }
  let p_cnt=entities[0][0].p_cnt;
  p_cnt=p_cnt==null?8:p_cnt;
  entities[1].sort(prom_rc_sort);
  let plist=[]
  for(let i=0;i<entities[1].length;i++){
    let ro=entities[1][i];
    ro.grk=ro.rank;
    if(ro.rank==null || ro.rank==""){}
    else{  
      ro.grk=ro.rank;
      ro.rank=i+1;
      if(i<p_cnt) {
        ro.note=ro.note ? ("Q "+ro.note): "Q";
        plist.push([ro.number,ro.classno,ro.name]);
      } 
    }
  }
  model.update_plist(Number(si_id)+1,JSON.stringify(plist));
  res.write(`<script>var fn='${entities[0][0].s_item}賽果';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
  res.end(rc_rep.out2html__(entities));
  /*
  res.render('sortableTable/sport.pug', {
    books: entities,
    profile:req.user,
    siid:si_id
    //nextPageToken: cursor,
  });*/
});
});
router.get('/RCFIE/namelist/:book', (req, res, next) => {
  //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
  
  let si_id=req.params.book;
  model.read_field(si_id, (err, entities, cursor) => {
  if (err) {
    next(err);
    return;
  }
  res.write(`<script>var fn='${entities[0][0].f_item}名單';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
    res.end(rc_rep.out2html__field(entities));
  });
});
router.get('/RCFJH/namelist/:book', (req, res, next) => {
  let si_id=req.params.book;
  model.read_field(si_id, (err, entities, cursor) => {
  if (err) {
    next(err);
    return;
  }
  res.write(`<script>var fn='${entities[0][0].f_item}名單';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
  res.end(rc_rep.out2html__jumphigh(entities));
});
});
router.get('/RCFIE/result/:book', (req, res, next) => {
  //model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
  if(req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);  
  let si_id=req.params.book;
  model.read_field(si_id, (err, entities, cursor) => {
  if (err) {
    next(err);
    return;
  }
  entities[1].sort(rc_sort);
  res.write(`<script>var fn='${entities[0][0].f_item}賽果';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
    res.end(rc_rep.out2html__field(entities));
  });
});
router.get('/RCFJH/result/:book', (req, res, next) => {
  if(req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);  
  let si_id=req.params.book;
  model.read_field(si_id, (err, entities, cursor) => {
  if (err) {
    next(err);
    return;
  }
  entities[1].sort(rc_sort);
  res.write(`<script>var fn='${entities[0][0].f_item}賽果';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
  res.end(rc_rep.out2html__jumphigh(entities));
});
});
router.post(
  '/race_promnamelist_post.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    const siid=data.siid;
    const datajson=JSON.parse(data.data);
    //res.end(siid+datajson);//+JSON.stringify(datajson))
    
    model.inc_promnamelist(siid, datajson, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
        //      res.redirect(`${req.baseUrl}/${savedData.id}`);
        res.end(`update ${savedData} rec. succ!`);
    });  }
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