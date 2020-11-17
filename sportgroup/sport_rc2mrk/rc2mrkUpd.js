
var mysql = require("mysql");
const mrkd = require("./rc2mrkdata_cfg");
var cfg = require("./config");
var period_no=cfg.period_no;
var con = cfg.mrkmysql;//infomysql;
function fmtRC(rc) {
    if (rc == null) return "";
    let patt1 = /\d+/g;
    let res = rc.match(patt1);
    if (res == null) return rc;
    if (res.length == 1) return res[0] + ".00";
    if (res.length == 2) {
        if (res[1].length == 1) return res[0] + "." + res[1] + "0";
        if (res[1].length == 2) return res[0] + "." + res[1];
    }
    return rc;
}
/*
[ ,2],3,4,5,6,  8,9,10,[11,       ]      18,19,20,21,22
 1,2 ,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,21,22,
*/
function grp_mrkd() {
    let arr = [];
    for (let i = 0; i < mrkd.mrkgrd.length; i++) {
        let ro = mrkd.mrkgrd[i]
        if (arr.indexOf(ro[1]) > -1) { } else { arr.push(ro[1]) }
        console.log(ro)
    }
    console.log(arr)
}
let r4xg='...'
let itemsql = `SELECT id,si_id,spno,period_no,sp_item,item,rc,sp_rank,note FROM sport_history where period_no in(${period_no}) and r4xg='${r4xg}'   ;`;
con.connect(function (err) {
    if (err) throw err;
    con.query(itemsql, function (err, res, fields) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let ri = res[i];
            let si_id = ri.si_id;//mrkd.get_si_id(ri.item);
            if (si_id == 0) continue;
            let sid = Math.floor(si_id % 1000 / 10);
            if (sid == 1) sid = 2;
            if (sid >= 11 && sid <= 14) sid = 11;
            let gid = Math.floor(si_id / 1000);
            let gidindex = gid > 20 ? gid - 12 : gid - 7;
            let rc = fmtRC(ri.rc);
            //console.log("# ", rc);
            let mrk = 0;
            if (sid >= 18 && sid <= 22) {
                mrk = mrkd.fc2m(sid, gidindex, rc);
                //console.log("update sport_history set si_id=", si_id, ", sp_mrk=", mrk, " where period_no=14 and r4xg='.' and id=", ri.id, " ;");
                console.log("update sport_history set  sp_mrk=", mrk, ` where period_no=${period_no} and r4xg='${r4xg}' and id=`, ri.id, " ;");
            } else {
                rc.replace(/[.]/g, "");
                mrk = mrkd.rc2m(sid, gidindex, rc);
                //console.log("update sport_history set si_id=", si_id, ",sp_mrk=", mrk, " where period_no=14 and  r4xg='.' and id=", ri.id, " ;");
                console.log("update sport_history set sp_mrk=", mrk, ` where period_no=${period_no} and  r4xg='${r4xg}' and id=`, ri.id, " ;");
            }
        }
        con.end();//pool release();
    });
});
