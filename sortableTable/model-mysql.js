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

const mysql = require('mysql');
const config = require('../config');
const options = {
  host: config.get('MYSQL_HOST'),
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: config.get('MYSQL_DB'),
  multipleStatements: true,
  acquireTimeout: 50000
};

const pool = mysql.createPool(options);


function sp_list(cb) {
    pool.getConnection(function (err, connection) {
      if (err) { cb(err); return; }
      // Use the connection
      connection.query(
        'SELECT si_id,s_item,lock_item,lock_time,ds_n FROM sport_item ;SELECT fi_id,f_item,lock_item,rcx,lock_time,ds_n FROM field_item ; ', [],
        (err, results) => {
          if (err) {
            cb(err);
            return;
          }
          cb(null, results);
          connection.release();
        }
      );
    });
  }
  //SELECT rc_id,$f FROM sport_rc where si_id=$id order by length(group_id), group_id,road,BIT_LENGTH( s_number),s_number;
  function read_sport(si_id,cb) {
    let gr_si_id=si_id / 10 * 10;
    pool.getConnection(function (err, connection) {
      if (err) { cb(err); return; }
      // Use the connection
      connection.query(
        'SELECT * FROM sport_item where si_id= ?; SELECT * FROM sport_rc where si_id= ? order by length(group_id), group_id,road,BIT_LENGTH( s_number),s_number;SELECT * FROM tblgr where si_id =?; ', [si_id,si_id,gr_si_id],
        (err, results) => {
          if (err) {
            cb(err);
            return;
          }
          cb(null, results);
          connection.release();
        }
      );
    });
  } 
  function read_field(si_id,cb) {
    let gr_si_id=si_id / 10 * 10;
    pool.getConnection(function (err, connection) {
      if (err) { cb(err); return; }
      // Use the connection
      connection.query(
        'select * from field_item where fi_id=?;SELECT * FROM field_rc where fi_id=? order by length(group_id), group_id,road,BIT_LENGTH( s_number),s_number; SELECT * FROM tblgr where si_id =?; ', [si_id,si_id,gr_si_id],
        (err, results) => {
          if (err) {
            cb(err);
            return;
          }
          cb(null, results);
          connection.release();
        }
      );
    });
  }  
function update_race_cell(conn,sql,val,siid,rc_id){
  return new Promise(function(resolve,reject){
    conn.query(sql,[val,siid,rc_id],(err,result)=>{
       if(err){console.log(err);reject(err);}
       resolve(result.affectedRows);
    })
  })
}
function fmtrc(val){
  let res=val.match(/\d+/g);
  if(res==null)
  {
    return val;
  }else if(res.length==2){
    return (res[0].length==1? "0" : "" )+res[0]+"''"+(res[1].length==1?"0":"")+res[1]; 
  }else if(res.length==3){
    return (res[0].length==1?"0":"")+res[0]+"'"+(res[1].length==1?"0":"")+res[1]+"''"+(res[2].length==1?"0":"")+res[2]; 
  }else{
    return val;
  }
}
  
function update_race(siid,datajson,cb){
  let cnt=0;
  let affcnt=0;
  let aff_cnt=0;
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    for(let key in datajson){
      cnt++; 
      let f=key.split('_');
      let sql="update sport_rc set `"+f[0]+"`=? where si_id=? and rc_id=?";
      let val=datajson[key];
      if(f[0]=="rc"){val=fmtrc(val);}
      update_race_cell(connection,sql,val,siid,f[1]).then(function(res){
        affcnt++;
        aff_cnt+=res;
        if(cnt==affcnt) cb(null,aff_cnt+"/"+affcnt);
      });
    }
  });
}  
function update_field(siid,datajson,cb){
  let cnt=0;
  let affcnt=0;
  let aff_cnt=0;
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    for(let key in datajson){
      cnt++; 
      let f=key.split('_');
      if(f[0]=="HJ"){
        let sql="update field_item set `"+f[1]+"`=? where fi_id=? and fi_id=?";
        let val=datajson[key];
        update_race_cell(connection,sql,val,siid,siid).then(function(res){
          affcnt++;
          aff_cnt+=res;
          if(cnt==affcnt) cb(null,aff_cnt+"/"+affcnt);
        });
      }else{
        let sql="update field_rc set `"+f[0]+"`=? where fi_id=? and frc_id=?";
        update_race_cell(connection,sql,datajson[key],siid,f[1]).then(function(res){
          affcnt++;
          aff_cnt+=res;
          if(cnt==affcnt) cb(null,aff_cnt+"/"+affcnt);
        });
      }
    }
  });
}
function update_race_lock(siid,cb){
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query(
      'update sport_item set lock_item=1  where si_id= ? ', [siid], (err,results) => {   //and `createdById` = ?
        if (err) {
          cb(err);
          return;
        }
        cb(null,results);
        connection.release();
      });
  });
}
function update_field_lock(siid,cb){
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query(
      'update field_item set lock_item=1  where fi_id=?  ', [siid], (err,results) => {   //and `createdById` = ?
        if (err) {
          cb(err);
          return;
        }
        cb(null,results);
        connection.release();
      });
  });
}
function list(cb) {
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    // Use the connection
    connection.query(
      'SELECT * FROM `blogs` order by id DESC ', [],
      (err, results) => {
        if (err) {
          cb(err);
          return;
        }
        cb(null, results);
        connection.release();
      }
    );
  });
}
function listMore(limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query(
      'SELECT *  FROM `blogs` order by id DESC LIMIT ? OFFSET ?', //, DAYOFWEEK(logDate)-1 dw
      [limit, token],
      (err, results) => {
        if (err) {
          cb(err);
          return;
        }
        const hasMore = results.length === limit ? token + results.length : false;
        cb(null, results, hasMore);
        connection.release();
      });
  });
}
function listBy(id, limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query(
      'SELECT * FROM `blogs` where createdById = ? order by id desc  LIMIT ? OFFSET ?',
      [id, limit, token],
      (err, results) => {
        if (err) {
          cb(err);
          return;
        }
        const hasMore = results.length === limit ? token + results.length : false;
        cb(null, results, hasMore);
        connection.release();

      });
  });
}


function create(data, cb) {
  //console.log(data);

  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query('INSERT INTO `blogs` SET ? ', [data], (err, res) => {
      if (err) {
        cb(err);
        return;
      }
      read(res.insertId, cb);
      //read(res.insertId, cb);
      //cb(null);
      connection.release();
    });
  });
}

function read(id, cb) {
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query(
      'SELECT * FROM `blogs` WHERE `id` = ? ', id, (err, results) => {
        if (!err && !results.length) {
          err = {
            code: 404,
            message: 'Not found'
          };
        }
        if (err) {
          cb(err);
          return;
        }
        cb(null, results[0]);
        connection.release();
      });
  });
}
function update(id, data, cb) {
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query(
      'UPDATE `blogs` SET ? WHERE `id` = ?  ', [data, id], (err) => {   //and `createdById` = ?
        if (err) {
          cb(err);
          return;
        }
        read(id, cb);
        connection.release();
      });
  });
}

function _delete(userid, id, cb) {
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query('DELETE FROM `blogs` WHERE createdById=?  and `id` = ? ', [userid, id], cb);
    connection.release();
  });
}

module.exports = {
  sp_list:sp_list,
  read_field:read_field,
  read_sport:read_sport,
  update_race:update_race,
  update_field:update_field,
  update_race_lock:update_race_lock,
  update_field_lock:update_field_lock,
  list: list,
  listBy: listBy,
  listMore: listMore,
  create: create,
  read: read,
  update: update,
  delete: _delete
};
/*
CREATE TABLE IF NOT EXISTS `sportday2019`.`blogs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `author` VARCHAR(255) NULL,
    `publishedDate` VARCHAR(255) NULL,
    `imageUrl` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `createdBy` VARCHAR(255) NULL,
    `createdById` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
  */