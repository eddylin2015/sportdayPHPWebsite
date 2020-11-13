const timetable=[
["時 間",	"男A",	"男B",	"男C",	"女A",	"女B",	"女C"],
["10:00",	"5000M(決賽)",	"跳高(決賽)",	"",	"",	"",	"跳遠(決賽)"],
["10:10",	"",	"",	"鉛球(決賽)",	"",	"",	""],
["10:35",	"",	"3000M(決賽)",	"",	"",	"",	""],
["11:05",	"鉛球(決賽)",	"",	"",	"跳高(決賽)",	"跳遠(決賽)",	"200M(初賽)"],
["11:10",	"",	"",	"200M(初賽)",	"",	"",	""],
["11:20",	"",	"",	"",	"",	"200M(初賽)",	""],
["11:25",	"",	"200M(初賽)",	"",	"",	"",	""],
["11:35",	"",	"",	"",	"200M(初賽)",	"",	""],
["11:40",	"200M(初賽)",	"",	"",	"",	"",	""],
["14:00",	"跳高(決賽)",	"跳遠(決賽)",	"",	"",	"",	"100M(初賽)"],
["14:15",	"",	"",	"100M(初賽)",	"",	"鉛球(決賽)",	""],
["14:30",	"",	"",	"",	"",	"100M(初賽)",	""],
["14:45",	"",	"100M(初賽)",	"",	"",	"",	""],
["15:00",	"",	"",	"",	"100M(初賽)",	"",	""],
["15:15",	"100M(初賽)",	"",	"跳遠(決賽)",	"",	"",	"跳高(決賽)"],
["15:30",	"",	"",	"",	"鉛球(決賽)",	"800M(決賽)",	""],
["15:35",	"",	"800M(決賽)",	"",	"",	"",	""],
["15:45",	"",	"",	"",	"800M(決賽)",	"",	""],
["15:50",	"800M(決賽)",	"",	"",	"",	"",	""],
["16:00",	"",	"",	"",	"",	"",	"200M(決賽)"],
["16:05",	"",	"",	"200M(決賽)",	"",	"",	""],
["16:15",	"",	"",	"",	"",	"200M(決賽)",	""],
["16:20",	"",	"200M(決賽)",	"",	"",	"",	""],
["16:30",	"",	"",	"",	"200M(決賽)",	"",	""],
["16:35",	"200M(決賽)",	"",	"",	"",	"",	""],
["10:00",	"跳遠(決賽)",	"",	"",	"",	"跳高(決賽)",	"1500M(決賽)"],
["10:15",	"",	"鉛球(決賽)",	"1500M(決賽)",	"",	"",	""],
["10:30",	"",	"",	"",	"",	"1500M(決賽)",	""],
["10:45",	"",	"1500M(決賽)",	"",	"跳遠(決賽)",	"",	""],
["11:00",	"",	"",	"",	"1500M(決賽)",	"",	""],
["11:15",	"1500M(決賽)",	"",	"",	"",	"",	""],
["11:35",	"",	"",	"",	"",	"",	"100M(決賽)"],
["11:40",	"",	"",	"100M(決賽)",	"",	"",	""],
["11:45",	"",	"",	"",	"100M(決賽)",	"",	""],
["11:50",	"",	"100M(決賽)",	"",	"",	"",	""],
["11:55",	"",	"",	"",	"",	"100M(決賽)",	""],
["12:00",	"100M(決賽)",	"",	"",	"",	"",	""],
["14:30",	"三級跳遠(決賽)",	"",	"跳高(決賽)",	"",	"400M(決賽)",	""],
["14:35",	"",	"400M(決賽)",	"",	"",	"",	""],
["14:40",	"",	"",	"",	"400M(決賽)",	"",	"鉛球(決賽)"],
["14:45",	"400M(決賽)",	"",	"",	"",	"",	""]];
const fs = require("fs");
const config = require('../config');
const dir = config.get('SP_REPORT_TO_PUBLIC');
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
let starttime="2020-11-10 00:00:00"
const si=require("./siid2item")
const push2=require("./PushRcName")
function showtimetable(){
    let files = fs.readdirSync(dir);
    let JSONdata = [];
    let fix="pdf";
    files.forEach(function (file) {
        let fstate = fs.statSync(dir + file);
        if (fstate.isDirectory()) { }
        else {
            if (file.toString().indexOf('.php') > 0){}//|| file.toString().indexOf('_tmp.pdf') > 0) { }
            else if (fix && file.toString().indexOf('.' + fix) > 0) {
                JSONdata[JSONdata.length] = { fn: file, encfn: encodeURI("/files/" + file), fctime: fstate.mtime };
            } else if (fix == null) {
                JSONdata[JSONdata.length] = { fn: file, encfn: encodeURI("/files/" + file), fctime: fstate.mtime };
            }
        }
    });
    JSONdata.sort( function(a, b) {return a.fctime-b.fctime;} ); // a-b ascending order    
    let timetable_rep=[]
    for(let i=0;i<44;i++)
    {
        timetable_rep.push(["","","","","","",""]) ;
    }
    

for(let i=0;i<JSONdata.length;i++){
    let r=JSONdata[i];
    if(formatDate(r.fctime)>=starttime)
    {
        obj=si.item2siid(r.fn);
        //console.log(i,r.fctime.toLocaleString(),r.fn,obj)
        let rtype="namelist";
        if(r.fn.indexOf("初")>0 && r.fn.indexOf("賽果")>0) {rtype="prom";}
        else if(r.fn.indexOf("賽果")>0){rtype="result";}
        //push2.push_simple(Number(obj[0]),)
        for(let k=0;k<42;k++)
            for(let l=0;l<7;l++)
            {
                if(obj[1].substring(2)==timetable[k][l]&&obj[1].substring(0,2)==timetable[0][l])
                {
					if(r.fn.indexOf("tmp")>0){
						timetable_rep[k][l]+=``+r.fn+"<br>"
					}
					else{
						timetable_rep[k][l]+=`<a href="/files/${r.fn}">`+r.fn+"</a><br>"
					}
                }
            }
    }
}
for(let k=0;k<42;k++)
{	
    timetable_rep[k][0]=timetable[k][0];
    for(let l=1;l<7;l++)
	{ 
      	if(timetable_rep[k][l]=="") timetable_rep[k][l]=timetable[k][l];
	}
}

return (timetable_rep);
}
//console.log(showtimetable());
module.exports={
    showtimetable:showtimetable,
}
