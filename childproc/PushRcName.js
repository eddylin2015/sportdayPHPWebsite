'use strict'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const querystring = require('querystring');
const WG = require('./ES_NetUtils_Async');
const mysql = require('mysql');
const fs = require('fs');
const config = require('../config');

const options = {
  host: config.get('MYSQL_HOST'),
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: config.get('MYSQL_DB'),
  multipleStatements: true,
  acquireTimeout: 50000
};
const conn = mysql.createConnection(options);

const mail_cfg =
{
    WG_Username: config.get('MAIL_USER'),
    WG_Password: config.get('MAIL_PASS'),
    Auth_Login_Host: config.get('MAIL_HOST'),
    Auth_Login_Path_: config.get('MAIL_LOGIN'),
    Auth_Login_port: 80,
    user_pwd: `username=${config.get('MAIL_USER')}&password=${config.get('MAIL_PASS')}`
}

async function get_ctx_asyncCall(slink,dlink,sid,report_type) {
    let datajson={};
    var temp_ = await WG.HttpGet("127.0.0.1", slink, sid, 80);
    if(report_type=="namelist"){
        datajson.name_ctx=temp_;
    } else if (report_type=="prom"){
        datajson.rc_ctx=temp_;
        datajson.lock_item=1;
    } else if (report_type=="result"){
        datajson.rc_ctx=temp_;
        datajson.lock_item=1;
    }
    //datajson.lock_time= new Date();
    temp_ =await WG.HttpPost(mail_cfg.Auth_Login_Host, dlink,querystring.stringify(datajson), sid, mail_cfg.Auth_Login_port);
    console.log(temp_)
}
async function push_asyncCall(si_id,report_type) {
    let sid = await WG.Auth_Login(mail_cfg.Auth_Login_Host, mail_cfg.Auth_Login_Path_, mail_cfg.user_pwd, mail_cfg.Auth_Login_port);
    let dlink=`/internal/sportday/api/updaterc/${si_id}?for=${report_type}`;
    let slink=`/sortableTable/rc/${report_type}/${si_id}?bar=1`;
    get_ctx_asyncCall(slink,dlink,sid,report_type)
}
// '/internal/sportday/api/updaterc/:siid?for=namelist | prom | result ';
// /sortableTable/rc/namelist/11032?bar=1
// /sortableTable/rc/prom/11032?bar=1
// /sortableTable/rc/result/11032?bar=1

module.exports={
    push_asyncCall:push_asyncCall,
}
