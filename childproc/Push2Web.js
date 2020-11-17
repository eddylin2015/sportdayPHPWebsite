const fs = require("fs");
const config = require('../config');
const dir = config.get('SP_REPORT_TO_PUBLIC');
const token = config.get('API_SP_TOKEN');
let files = fs.readdirSync(dir);
let JSONdata = [];
let fix="pdf";
files.forEach(function (file) {
    let fstate = fs.statSync(dir + file);
    if (fstate.isDirectory()) { }
    else {
        if (file.toString().indexOf('.php') > 0 || file.toString().indexOf('_tmp.pdf') > 0) { }
        else if (fix && file.toString().indexOf('.' + fix) > 0) {
            JSONdata[JSONdata.length] = { fn: file, encfn: encodeURI("/files/" + file), fctime: fstate.mtime };
        } else if (fix == null) {
            JSONdata[JSONdata.length] = { fn: file, encfn: encodeURI("/files/" + file), fctime: fstate.mtime };
        }
    }
});
function formatDate(date) {
    let MM=date.getMonth() + 1;
    let dd=date.getDate();
    let hh=date.getHours();
    let mm=date.getMinutes();
    let ss=date.getSeconds();
    return date.getFullYear() + '-' + 
      (MM<10?"0":"")+MM+ '-' + 
      (dd<10?"0":"")+dd+ ' ' + 
      (hh<10?"0":"")+hh+ ':' + 
      (mm<10?"0":"")+mm+ ':' + 
      (ss<10?"0":"")+ss;
  }
let starttime="2020-11-13 12:00:00"
const si=require("./siid2item")
const push2=require("./PushRcName")
JSONdata.sort( function(a, b) {return a.fctime-b.fctime;} ); // a-b ascending order
async function foo(JSONdata){
for(let i=0;i<JSONdata.length;i++){
    let r=JSONdata[i];
    if(formatDate(r.fctime)>=starttime)
    {
        obj=si.item2siid(r.fn);
        console.log(i,r.fctime.toLocaleString(),r.fn,obj)
        let rtype="namelist";
        if(r.fn.indexOf("初")>0 && r.fn.indexOf("賽果")>0) {rtype="prom";}
        else if(r.fn.indexOf("賽果")>0){rtype="result";}
        push2.push_simple(Number(obj[0]),rtype,token)
        await new Promise(r => setTimeout(r, 1000));
    }
}
}
foo(JSONdata)
// '/internal/sportday/api/updaterc/:siid?for=namelist | prom | result ';
// /sortableTable/rc/namelist/11032?bar=1
// /sortableTable/rc/prom/11032?bar=1
// /sortableTable/rc/result/11032?bar=1
