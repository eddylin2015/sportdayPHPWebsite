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
  console.log(userid,id);
  pool.getConnection(function (err, connection) {
    if (err) { cb(err); return; }
    connection.query('DELETE FROM `blogs` WHERE createdById=?  and `id` = ? ', [userid, id], cb);
    connection.release();
  });
}

module.exports = {

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