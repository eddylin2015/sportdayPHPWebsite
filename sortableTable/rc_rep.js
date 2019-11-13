//namespace sp_lib
function title(RCX, item)
 {
    let colspan =RCX=="RC1"? 9 : 7;
    switch(RCX){
        case "RC1":
        case "RC7": colspan=9;break;
        case "RCFIE":colspan=15;break;
        case "RCFJH":colspan=31;break;
        default:colspan=7;    
    }
    return `<tr><th colspan=${colspan}>成績公告`;
 }
 function item_th(RCX,item,ro=null)   {
    let colspan =RCX=="RC1"? 9 : 7;
    switch(RCX){
        case "RC1":
        case "RC7": colspan=9;break;
        case "RCFIE":colspan=15;break;
        case "RCFJH":colspan=31;break;
        default:colspan=7;    
    }
    let res=`<tr><th colspan=${colspan}>${item}`;
    switch (RCX)
    {
        case "RC1":   res+="<tr><td>名次<td>組次<td>道次<td>號碼<td>姓名<td>班級<td width=100>成績	<td>GRK<td>備註"; break;//9
        case "RC2":   res+="<tr><td>名次<td>道次<td>號碼<td>姓名<td>班級<td width=100>成績<td>備註"; break;//7
        case "RC5":   res+="<tr><td>名次<td>小號 <td>號碼<td>姓名<td>班級<td width=100>成績<td>備註"; break;     //7
        case "RC7":   res+="<tr><td>名次<td>組次<td>小號 <td>號碼<td>姓名<td>班級<td width=100>成績<td>GRK<td>備註"; break;     //9
        case "RC3":   res+="<tr><td>名次<td >道次 <td  colspan=2>隊名<td colspan=2>成績	<td>備註"; break;//7  4x
        case "RC4":   res+="<tr><td>名次<td>組次<td >道次 <td>隊名<td>成績<td>GRK<td>備註"; break;//7  4x
        case "RCFIE": res+=`<tr><td rowspan=2>名次<td rowspan=2>次序<td rowspan=2>比賽號<td rowspan=2>姓名
        <td rowspan=2>班級<td colspan=3>前三次成績 <td rowspan=2>B3<td colspan=2>後二次成績<td rowspan=2>B5
        <td  rowspan=2>六 <td rowspan=2>成績<td rowspan=2>備註<tr><td>一<td>二<td>三<td>一<td>二`; 
        break;//7  4x
        case "RCFJH":
                res+="<tr><td rowspan=2>名次<td rowspan=2>次序<td rowspan=2>比賽號<td rowspan=2>姓名<td rowspan=2>班級";
                res+=`<td colspan=3>${ro.h1}<td colspan=3>${ro.h2}<td colspan=3>${ro.h3}<td colspan=3>${ro.h4}<td colspan=3>${ro.h5}<td colspan=3>${ro.h6}<td colspan=3>${ro.h7}<td colspan=3>${ro.h8}`
                res+="<td rowspan=2>成績<td rowspan=2>備註";
                res+=`<tr><td colspan=3>${ro.h9}<td colspan=3>${ro.h10}<td colspan=3>${ro.h11}<td colspan=3>${ro.h12}<td colspan=3>${ro.h13}<td colspan=3>${ro.h14}<td colspan=3>${ro.h15}<td colspan=3>${ro.h16}`;
            break;
        default:      res+="<tr><td>名次<td>道次<td>號碼<td>姓名<td>班級<td>成績<td>備註"; break;//7
    }
    return res;
}

function gr_(RCX,  ro)
{
   let colspan = RCX=="RC1"? 9 : 7;
   let gr9 = "<tr><td>GR<td colspan=2>{0}<td colspan=2>{1}<td>{2}<td colspan=2>{3}<td>{4}";
   let gr7 = "<tr><td>GR<td colspan=1>{0}<td colspan=2>{1}<td>{2}<td colspan=1>{3}<td>{4}";
   let gr15="";
   if(RCX=="RCFIE")
   {
    gr15= `<tr><td  colspan=2>GR
    <td colspan=2>${ro.gr_rc}
    <td colspan=2>${ro.name}
    <td colspan=3> ${ro.classno}
    <td colspan=3>${ro.gr_period}
    <td colspan=3>${ro.gr_date}`;
   }else if(RCX=="RCFJH"){
    gr31= `<tr><td  colspan=2>GR
    <td colspan=2>${ro.gr_rc}
    <td colspan=2>${ro.name}
    <td colspan=7> ${ro.classno}
    <td colspan=7>${ro.gr_period}
    <td colspan=11>${ro.gr_date}`;
   }else if(RCX=="RC1"){
      gr9= `<tr><td>GR
      <td colspan=2>${ro.gr_rc}
      <td colspan=2>${ro.name}
      <td>          ${ro.classno}
      <td colspan=2>${ro.gr_period}
      <td>          ${ro.gr_date}`;
   }else{
      gr7= `<tr><td>GR
      <td colspan=1>${ro.gr_rc}
      <td colspan=2>${ro.name}
      <td>          ${ro.classno}
      <td colspan=1>${ro.gr_period}
      <td>          ${ro.gr_date}`;
   }
   res=[];
   res.push(blankline(RCX));
   if(RCX=="RCFIE"){
    res.push("<tr><td colspan=2>紀錄<td colspan=2>成績<td colspan=2>姓名<td colspan=3>班別<td colspan=3>屆<td colspan=3>日期");
    res.push(gr15);
    res.push("<tr><td colspan=15 class=blk>&nbsp;");
    res.push("<tr><td class=blk>註釋<td  class=blk colspan=14>");
        res.push(
`<tr><td colspan=4>B3  前三次最好<td colspan=4>B5  前五次最好<td colspan=7>
<tr><td colspan=4>GR  大會紀錄<td colspan=4>TGR  平大會紀錄<td colspan=7>NGR  破大會紀錄
<tr><td colspan=2>DNS  棄權<td colspan=4>NM  無有效成績<td colspan=7>DR  請假<td colspan=2></tr>
<tr><td  class=blk colspan=5>徑賽裁判長:<td  class=blk colspan=5>編排記錄主裁判:<td   class=blk colspan=5>記錄員:`);

   }else if(RCX=="RCFJH"){
    res.push("<tr><td colspan=2>紀錄<td colspan=2>成績<td colspan=2>姓名<td colspan=7>班別<td colspan=7>屆<td colspan=11>日期");
    res.push(gr31);
    res.push("<tr><td colspan=31 class=blk>&nbsp;");
    res.push("<tr><td class=blk>註釋<td  class=blk colspan=30>");
    res.push("<tr><td colspan=4>GR  大會紀錄<td colspan=9>TGR  平大會紀錄<td colspan=18>NGR  破大會紀錄");
    res.push("<tr><td colspan=4>DNS  棄權<td colspan=9>DR  請假<td colspan=18>");
    res.push("<tr><td class=blk colspan=5>徑賽裁判長:<td class=blk><td class=blk colspan=12>編排記錄主裁判:<td class=blk colspan=2><td class=blk colspan=11>記錄員:<td class=blk>	"); ;
   }
    else if (colspan == 9)
    {
        res.push("<tr><td>紀錄<td colspan=2>成績<td colspan=2>姓名<td>班別<td colspan=2>屆<td>日期");
        res.push(gr9);
        res.push("<tr><td colspan=9 class=blk>&nbsp;							");
        res.push("<tr><td class=blk>註釋<td  class=blk colspan=8>								");
        res.push("<tr><td colspan=2>GR  大會紀錄<td colspan=2>TGR  平大會紀錄<td colspan=2>NGR  破大會紀錄<td colspan=2>GRK 組內排名<td>Q  晉級");
        res.push("<tr><td colspan=2>DQ  犯規<td colspan=2>		DNF  中退<td colspan=2>		DNS  棄權<td colspan=2>		DR  請假	<td>	");
        res.push("<tr><td class=blk colspan=2>徑賽裁判長:<td class=blk><td class=blk colspan=2>編排記錄主裁判:<td class=blk colspan=2><td class=blk>記錄員:<td class=blk>	"); ;
    }
    else if (colspan == 7)
    {
        res.push("<tr><td>紀錄<td colspan=1>成績<td colspan=2>姓名<td>班別<td colspan=1>屆<td>日期");
        res.push(gr7);
        res.push("<tr><td colspan=7 class=blk>&nbsp;							");
        res.push("<tr><td class=blk>註釋<td  class=blk colspan=6>								");
        res.push("<tr><td colspan=2>GR  大會紀錄<td colspan=2>TGR  平大會紀錄<td colspan=2>NGR  破大會紀錄<td>Q  晉級");
        res.push("<tr><td colspan=2>DQ  犯規<td colspan=2>		DNF  中退<td colspan=2>		DNS  棄權<td colspan=1>		DR  請假		");
        res.push("<tr><td class=blk colspan=2>徑賽裁判長:<td class=blk colspan=2>編排記錄主裁判:<td class=blk colspan=1><td class=blk>記錄員:<td class=blk>	"); ;
    }
    return res.join("");
}

function blankline(RCX) {
   switch(RCX)
   {
       case "RCFIE":
       case "RCFJH":return "<tr><td><td><td><td><td><td><td><td><td><td><td><td><td><td><td>&nbsp;".replace(/<td>/g, "<td class=blk>");// 15 td;
       case "RC1":
           return "<tr><td><td><td><td><td><td><td><td><td>&nbsp;".replace(/<td>/g, "<td class=blk>");// 9 td
       default:
           return "<tr><td><td><td><td><td><td><td>&nbsp;".replace(/<td>/g, "<td class=blk>");// 9 td
   }
}
//

function rcline(RCX,ro)
 {
     switch (RCX)
     {
         case "RCFIE":return  `<tr><td>${ro.rank}
         <td>${ro.s_number}
         <td>${ro.number}
         <td>${ro.name}
         <td>${ro.classno}
         <td>${ro.h1}
         <td>${ro.h2}
         <td>${ro.h3}
         <td>${ro.B3}
         <td>${ro.h4}
         <td>${ro.h5}
         <td>${ro.B5}
         <td>${ro.h6}
         <td align="right"${ro.rc}</td>
         <td>${ro.note}`;break;
         case "RCFJH":let res=`<tr>
         <td rowspan=2>${ro.rank}
         <td rowspan=2>${ro.s_number}
         <td rowspan=2>${ro.number}
         <td rowspan=2>${ro.name}
         <td rowspan=2>${ro.classno}`;
         for(let i=1;i<17;i++){
             let txt=ro[`h${i}`];
             if(txt){
                let txtx=txt.split("");
                res+=`<td>${txtx[0]}<td>${txtx[1]}<td>${txtx[2]}`.replace(/undefined/g,"&nbsp;&nbsp;&nbsp;")
             }
             else{res+="<td>&nbsp;&nbsp;&nbsp;<td>&nbsp;&nbsp;&nbsp;<td>&nbsp;&nbsp;&nbsp;"}
             if(i==8) res+=`<td rowspan=2>${ro.rc} <td rowspan=2>${ro.note}<tr>`

         }

        return res;break;         
         case "RC1": return `<tr><td>${ro.rank}
                                 <td>${ro.group_id}
                                 <td>${ro.road}
                                 <td>${ro.number}
                                 <td>${ro.name}
                                 <td>${ro.classno}
                                 <td class="rc">${ro.rc}</td>
                                 <td>${ro.grk}
                                 <td>${ro.note}`;
         case "RC2": return `<tr>
         <td>${ro.rank}
         <td>${ro.road}
         <td>${ro.number}
         <td>${ro.name}
         <td>${ro.classno}
         <td class="rc">${ro.rc}</td>
         <td>${ro.note}`;
         case "RC5": return `<tr>
         <td>${ro.rank}
         <td>${ro.s_number}
         <td>${ro.number}
         <td>${ro.name}
         <td>${ro.classno}
         <td class="rc">${ro.rc}</td>
         <td>${ro.note}`;
             //rank, s_number, number, name, classno2classname(classno), rc, note); 
         case "RC7": return `<tr>
         <td>${ro.rank}
         <td>${ro.group_id}
         <td>${ro.s_number}
         <td>${ro.number}
         <td>${ro.name}
         <td>${ro.classno}
         <td class="rc">${ro.rc}</td>
         <td>${ro.grk}
         <td>${ro.note}`;
             //rank,group_id, s_number, number, name, classno2classname(classno), rc, grk,note); 
         case "RC3": return `<tr>
         <td>          ${ro.rank}
         <td>          ${ro.road}
         <td colspan=2>${ro.name}
         <td colspan=2>${ro.rc}
         <td>          ${note}`;
             //rank, road,  name,  rc, note);
         case "RC4": return `<tr>
         <td>${ro.rank}
         <td>${ro.group_id}
         <td>${ro.road}
         <td>${ro.name}
         <td class="rc">${ro.rc}</td>
         <td>${ro.grk}
         <td>${ro.note}`;
             //rank, group_id,road, name, rc,grk, note);
         default: return `<tr>
         <td>${ro.rank}
         <td>${ro.group_id}
         <td>${ro.road}
         <td>${ro.number}
         <td>${ro.name}
         <td>${ro.classno}
         <td class="rc">${ro.rc}</td>
         <td>${ro.grk}
         <td>${ro.note}`;
             //rank, group_id, road, number, name, classno2classname(classno), rc, grk, note);
     }
 }
 
function out2html__(data)
{
    let htmlrcarr=[]
    htmlrcarr.push("<link rel='stylesheet' href='/stylesheets/b.css'>");                                        //2,3,4,i_tab,
    let LineNo = 0;
    let item =null;
    let RCX=data[0][0].rcx;
    let group_id = null;
    let group_cnt = 0;
    htmlrcarr.push("<table>");
    for(let idx=0;idx<data[1].length;idx++)
     {
         let rdr=data[1][idx];
            if (item == null)
            {
                item = data[0][0].s_item;
                group_id = rdr.group_id;
                group_cnt = 0;
                LineNo = 0;
                htmlrcarr.push(title(RCX,item)); LineNo++;
                htmlrcarr.push(item_th(RCX,item)); LineNo += 2;
            }
            else if (!group_id==rdr.group_id)
            {
                let tempa = LineNo < 12 ? 12 : 25;
                for (let i = LineNo; i < tempa; i++)
                {
                    htmlrcarr.push(blankline);
                    LineNo++;
                }
                if ((group_cnt > 9 && group_cnt < 17) || group_cnt > 24)
                {
                    htmlrcarr.push(gr_(RCX,data[2][0]));
                    htmlrcarr.push(title(RCX,item));
                    LineNo = 1;
                }
                htmlrcarr.push(item_th(RCX,item)); LineNo += 2;
                group_id = rdr.group_id;
            }
            htmlrcarr.push(rcline(RCX, rdr).replace(/null/g,"&nbsp;"));
            LineNo++;
            group_cnt++;
        }
        if (item != null)
        {
            for (let i = LineNo; i < 25; i++)
            {
                htmlrcarr.push(blankline(RCX));
                LineNo++;
            }
            htmlrcarr.push(gr_(RCX,data[2][0]));
        }
        htmlrcarr.push("</table>");
        return htmlrcarr.join("");
    }

//    out2html__(data)
function out2html__long(data) {
  let maxline = 36;
  let htmlrcarr=[];
  htmlrcarr.push("<link rel='stylesheet' href='/stylesheets/b.css'>");                                        //2,3,4,i_tab,
     let item = null;
     let group_id = null;
     let group_cnt = 0;
     let LineNo = 0;
     let RCX=data[0][0].rcx;
     htmlrcarr.push("<table>");
     for(let idx=0;idx<data[1].length;idx++)
     {
         let rdr=data[1][idx];
         if (item == null)
         {
             item =  data[0][0].s_item;
             group_id = rdr.group_id;
             group_cnt = 0;
             LineNo = 0;
             htmlrcarr.push(title(RCX,item)); LineNo++;
             htmlrcarr.push(item_th(RCX,item)); LineNo += 2;
         }
         else if (!group_id==rdr.group_id)
         {
             for (let i = LineNo; i < maxline; i++)
             {
                 htmlrcarr.push(blankline);
                 LineNo++;
             }
             if ((group_cnt > 9 && group_cnt < 17) || group_cnt > 24)
             {
                 htmlrcarr.push(gr_(RCX,data[2][0]));
                 htmlrcarr.push(title(RCX,item));
                 LineNo = 1;
             }
             htmlrcarr.push(item_th(RCX,item)); LineNo += 2;
             group_id = rdr.group_id;
         }
         htmlrcarr.push(rcline(RCX, rdr).replace(/null/g,"&nbsp;"));
         LineNo++;
         group_cnt++;
     }
     if (item != null)
      {
          for (let i = LineNo; i < maxline; i++)
          {
              htmlrcarr.push(blankline(RCX));
              LineNo++;
          }
          htmlrcarr.push(gr_(RCX,data[2][0]));
      }
      htmlrcarr.push("</table>");
      return htmlrcarr.join("")
}

function out2html__field(data)
{
    let htmlrcarr=[]
    htmlrcarr.push("<link rel='stylesheet' href='/stylesheets/b.css'>");                                        //2,3,4,i_tab,
    let LineNo = 0;
    let item =null;
    let RCX=data[0][0].rcx;
    let group_id = null;
    let group_cnt = 0;
    htmlrcarr.push("<table>");
    for(let idx=0;idx<data[1].length;idx++)
     {
         let rdr=data[1][idx];
            if (item == null)
            {
                item = data[0][0].f_item;
                group_id = rdr.group_id;
                group_cnt = 0;
                LineNo = 0;
                htmlrcarr.push(title(RCX,item)); LineNo++;
                htmlrcarr.push(item_th(RCX,item)); LineNo += 2;
            }
            else if (!group_id==rdr.group_id)
            {
                let tempa = LineNo < 12 ? 12 : 25;
                for (let i = LineNo; i < tempa; i++)
                {
                    htmlrcarr.push(blankline);
                    LineNo++;
                }
                if ((group_cnt > 9 && group_cnt < 17) || group_cnt > 24)
                {
                    htmlrcarr.push(gr_(RCX,data[2][0]));
                    htmlrcarr.push(title(RCX,item));
                    LineNo = 1;
                }
                htmlrcarr.push(item_th(RCX,item)); LineNo += 2;
                group_id = rdr.group_id;
            }
            htmlrcarr.push(rcline(RCX, rdr).replace(/null/g,"&nbsp;"));
            LineNo++;
            group_cnt++;
        }
        if (item != null)
        {
            for (let i = LineNo; i < 25; i++)
            {
                htmlrcarr.push(blankline(RCX));
                LineNo++;
            }
            htmlrcarr.push(gr_(RCX,data[2][0]));
        }
        htmlrcarr.push("</table>");
        return htmlrcarr.join("");
    }
    function out2html__jumphigh(data)
    {
        let htmlrcarr=[]
        htmlrcarr.push("<link rel='stylesheet' href='/stylesheets/b.css'>");                                        //2,3,4,i_tab,
        let LineNo = 0;
        let item =null;
        let RCX=data[0][0].rcx;
        let group_id = null;
        let group_cnt = 0;
        htmlrcarr.push("<table>");
        for(let idx=0;idx<data[1].length;idx++)
         {
             let rdr=data[1][idx];
                if (item == null)
                {
                    item = data[0][0].f_item;
                    group_id = rdr.group_id;
                    group_cnt = 0;
                    LineNo = 0;
                    htmlrcarr.push(title(RCX,item)); LineNo++;
                    htmlrcarr.push(item_th(RCX,item,data[0][0]).replace(/null/g,"&nbsp;")); LineNo += 2;
                }
                else if (!group_id==rdr.group_id)
                {
                    let tempa = LineNo < 12 ? 12 : 25;
                    for (let i = LineNo; i < tempa; i++)
                    {
                        htmlrcarr.push(blankline);
                        LineNo++;
                    }
                    if ((group_cnt > 9 && group_cnt < 17) || group_cnt > 24)
                    {
                        htmlrcarr.push(gr_(RCX,data[2][0]));
                        htmlrcarr.push(title(RCX,item));
                        LineNo = 1;
                    }
                    htmlrcarr.push(item_th(RCX,item,data[0][0])); LineNo += 2;
                    group_id = rdr.group_id;
                }
                htmlrcarr.push(rcline(RCX, rdr).replace(/null/g,"&nbsp;"));
                LineNo++;
                group_cnt++;
            }
            if (item != null)
            {
                for (let i = LineNo; i < 25; i++)
                {
                    htmlrcarr.push(blankline(RCX));
                    LineNo++;
                }
                htmlrcarr.push(gr_(RCX,data[2][0]));
            }
            htmlrcarr.push("</table>");
            return htmlrcarr.join("");
        }    
//let data_json_str=`[[{"si_id":25010,"s_item":"女E50M(初賽)","filename":null,"rcx":"RC1","title":"名次,組次,道次,號碼,姓名,班別,成績,GRK,備註","gi":null,"lock_item":null,"lock_time":"2019-11-06T08:38:09.000Z","ds_n":null}],[{"rc_id":1,"si_id":25010,"rank":null,"group_id":"一","road":"1","s_number":"","number":"9102","classno":"小四信","name":"何敏琪","rc":"0","grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":2,"si_id":25010,"rank":null,"group_id":"一","road":"2","s_number":"","number":"9109","classno":"小四信","name":"張佳欣","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":8,"si_id":25010,"rank":null,"group_id":"一","road":"3","s_number":"","number":"9204","classno":"小四望","name":"佘析慧","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":5,"si_id":25010,"rank":null,"group_id":"一","road":"4","s_number":"","number":"9131","classno":"小四信","name":"鄭筠佩","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":3,"si_id":25010,"rank":null,"group_id":"一","road":"5","s_number":"","number":"9123","classno":"小四信","name":"楊佳欣","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":4,"si_id":25010,"rank":null,"group_id":"一","road":"6","s_number":"","number":"9129","classno":"小四信","name":"蔡汶熹","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":14,"si_id":25010,"rank":null,"group_id":"一","road":"7","s_number":"","number":"9323","classno":"小四愛","name":"曾子琳","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":10,"si_id":25010,"rank":null,"group_id":"一","road":"8","s_number":"","number":"9220","classno":"小四望","name":"黃靖雯","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":12,"si_id":25010,"rank":null,"group_id":"二","road":"1","s_number":"","number":"9230","classno":"小四望","name":"謝寶","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":11,"si_id":25010,"rank":null,"group_id":"二","road":"2","s_number":"","number":"9226","classno":"小四望","name":"蔡嘉嘉","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":7,"si_id":25010,"rank":null,"group_id":"二","road":"3","s_number":"","number":"9201","classno":"小四望","name":"伍凱晴","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":6,"si_id":25010,"rank":null,"group_id":"二","road":"4","s_number":"","number":"9132","classno":"小四信","name":"錢良彤","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":9,"si_id":25010,"rank":null,"group_id":"二","road":"5","s_number":"","number":"9205","classno":"小四望","name":"余曉悠","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":15,"si_id":25010,"rank":null,"group_id":"二","road":"6","s_number":"","number":"9325","classno":"小四愛","name":"黃煒琳","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":13,"si_id":25010,"rank":null,"group_id":"二","road":"7","s_number":"","number":"9234","classno":"小四望","name":"關振怡","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null},{"rc_id":16,"si_id":25010,"rank":null,"group_id":"二","road":"8","s_number":"","number":"9333","classno":"小四愛","name":"鍾卓瀅","rc":null,"grk":null,"note":null,"RCX":null,"stud_ref":null,"gi":null}],[{"id":83,"si_id":"25010","gr_rc":"8''57","name":"郭銘恩","classno":"小四望","gr_period":"第十二屆","gr_date":"2017.11","item":"女E50米"}]]`;
//let data=JSON.parse(data_json_str);
//console.log(out2html__long(data)    );

module.exports = {
    out2html__:out2html__,
    out2html__long:out2html__long,
    out2html__field:out2html__field,
    out2html__jumphigh:out2html__jumphigh,
  };
    /*
        
*/