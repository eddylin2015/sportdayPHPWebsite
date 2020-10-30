'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const images = require('../lib/images');
const model = require('./model-mysql');
const oauth2 = require('../lib/oauth2');
const rc_rep = require('./rc_rep')
const router = express.Router();
// Automatically parse request body as form data
router.use(bodyParser.urlencoded({ extended: false }));
// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});
/**
 * GET /SportItems
 *
 * Display a page of SportItems . 
 */
router.get('/', oauth2.required, (req, res, next) => {
  // model.listMore(10, req.query.pageToken, (err, entities, cursor) => {
  model.sp_list((err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/list.pug', {
      books: entities,
      profile: req.user
      // nextPageToken: cursor,
    });
  });
});
/**
 * GET /SportItems
 *
 * Display a page of SportItems . 
 */
router.get('/li', oauth2.required, (req, res, next) => {
  model.sp_list((err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/list01.pug', {
      books: entities,
      profile: req.user
    });
  });
});

router.get('/sport.php', (req, res, next) => {
  let si_id = req.query.id;
  let lock = req.query.lock;
  model.read_sport(si_id, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/sport.pug', {
      books: entities,
      profile: req.user,
      lock: lock,
      siid: si_id
    });
  });
});

router.get('/field.php', (req, res, next) => {
  let si_id = req.query.id;
  let lock = req.query.lock;
  model.read_field(si_id, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/field.pug', {
      books: entities,
      profile: req.user,
      lock: lock,
      siid: si_id
    });
  });
});

router.get('/fieldhj.php', (req, res, next) => {
  let si_id = req.query.id;
  let lock = req.query.lock;
  model.read_field(si_id, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('sortableTable/fieldhj.pug', {
      books: entities,
      profile: req.user,
      lock: lock,
      siid: si_id
    });
  });
});

router.post(
  '/race_post.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    const siid = data.siid;
    const datajson = data.datajson;
    model.update_race(siid, datajson, (err, savedData) => {
      if (err) {next(err);return;}
      res.end(`update ${savedData} rec. succ!`);
    });
  }
);

router.post(
  '/race_lock.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    const siid = data.siid;
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
    const siid = data.siid;
    const datajson = data.datajson;
    model.update_field(siid, datajson, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.end(`update ${savedData} rec. succ!`);
    });
  }
);

router.post(
  '/field_lock.php',
  images.multer.single('image'),
  (req, res, next) => {
    const data = req.body;
    const siid = data.siid;
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
  if (req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);
  let si_id = req.params.book;
  model.read_sport(si_id, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }//base req.Url
    res.write(`<script>var fn='${entities[0][0].s_item}名單';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
    if (entities[0][0].rcx == "RC5") {
      res.end(rc_rep.out2html__long(entities));
    } else {
      res.end(rc_rep.out2html__(entities));
    }
  });
});

function rc_sort(a, b) {
  //DQ 犯規DNF 中退DNS 棄權DR 請假 
  if (b.note == "DR" || b.note == "DNS" || b.note == "DQ") return -1;
  if (a.note == "DR" || a.note == "DNS" || a.note == "DQ") return 1;
  if (a.rank == null && b.rank == null) return 0;
  if (b.rank == null) return -1;
  if (a.rank == null) return 1;
  let n1 = a.rank.match(/[0-9]+/g)
  let n2 = b.rank.match(/[0-9]+/g)
  if (!n2) return -1;
  if (!n1) return 1;
  return Number(n1) - Number(n2);
}

router.get('/rc/result/:book', (req, res, next) => {
  if (req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);
  let si_id = req.params.book;
  model.read_sport(si_id, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    entities[1].sort(rc_sort);
    res.write(`<script>var fn='${entities[0][0].s_item}賽果';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
    if (entities[0][0].rcx == "RC5") {
      res.end(rc_rep.out2html__long(entities));
    } else {
      res.end(rc_rep.out2html__(entities));
    }
  });
});

function prom_rc_sort(a, b) {
  //DQ 犯規DNF 中退DNS 棄權DR 請假 
  if (b.note == "DR" || b.note == "DNS" || b.note == "DQ") return -1;
  if (a.note == "DR" || a.note == "DNS" || a.note == "DQ") return 1;
  if (a.rc == null && b.rc == null) return 0;
  if (b.rc == null) return -1;
  if (a.rc == null) return 1;
  let n1 = a.rc.match(/[0-9]+/g)
  let n2 = b.rc.match(/[0-9]+/g)
  if (!n2) return -1;
  if (!n1) return 1;
  if (n1.length != n2.length) return n1.length - n2.length;
  let res = 0;
  for (let i = 0; i < n1.length; i++) {
    res = Number(n1[i]) - Number(n2[i]);
    if (res != 0) return res;
  }
  return 0;
}

router.get('/rc/prom/:book', (req, res, next) => {
  if (req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);
  let si_id = req.params.book;
  model.read_sport(si_id, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    let p_cnt = entities[0][0].p_cnt;
    p_cnt = p_cnt == null ? 8 : p_cnt;
    entities[1].sort(prom_rc_sort);
    let plist = []
    for (let i = 0; i < entities[1].length; i++) {
      let ro = entities[1][i];
      ro.grk = ro.rank;
      if (ro.rank == null || ro.rank == "") { }
      else {
        ro.grk = ro.rank;
        ro.rank = i + 1;
        if (i < p_cnt) {
          ro.note = ro.note ? ("Q " + ro.note) : "Q";
          plist.push([ro.number, ro.classno, ro.name]);
        }
      }
    }
    model.update_plist(Number(si_id) + 1, JSON.stringify(plist));
    res.write(`<script>var fn='${entities[0][0].s_item}賽果';var url='${req.url}';</script><script src='/sortableTable/js/sport_rc_hotkey.js'></script>`)
    res.end(rc_rep.out2html__(entities));
  });
});

router.get('/RCFIE/namelist/:book', (req, res, next) => {
  let si_id = req.params.book;
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
  let si_id = req.params.book;
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
  if (req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);
  let si_id = req.params.book;
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
  if (req.query.bar) res.write(`<div class="fbar""><button onclick='fa()'>PDF</button><button onclick='fb()'>PR2</button>  <button onclick='fc()'>PR3</button></div>`);
  let si_id = req.params.book;
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
    const siid = data.siid;
    const datajson = JSON.parse(data.data);
    model.inc_promnamelist(siid, datajson, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.end(`update ${savedData} rec. succ!`);
    });
  }
);
const push2=require('../childproc/PushRcName');
router.get('/push2/:siid', (req, res, next) => {
  let si_id = req.params.siid;
  let for_t=req.query.for;
  push2.push_asyncCall(si_id,for_t);
  res.end("OK.")
});

/**
 * Errors on "/SportDay/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;