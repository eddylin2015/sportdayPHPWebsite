const fs=require('fs')
let spdata=fs.readFileSync("spdata.csv").toString();
let lines=spdata.split("\n")

let dt=[];
for(let i=0;i<lines.length;i++)
{
    let person=[[],[]]
    let colum=lines[i].split(",")
    for(let j=0;j<colum.length;j++)
    {
       let idx=0;
       if(j>6) idx=1;
       person[idx].push(colum[j].trim());
    }   
    if(person[0].length>3 && person[0][0].match(/^[0-9]+/)   )  dt.push(person[0])
    if(person[1].length>3 && person[1][0].match(/^[0-9]+/)  )dt.push(person[1])
}
console.log(dt.length)
const sp_item=[{id:1, name:"50M "},{id:2, name:"60M "},{id:3, name:"100M"},{id:4, name:"200M"},{id:5, name:"400M"},{id:6, name:"800M"},{id:7, name:"1000M"},{id:8, name:"1500M"},{id:9, name:"3000M"},{id:10,name:"5000M"},{id:11,name:"60米欄"},{id:12,	name:"80米欄"},{id:13,	name:"100米欄"},{id:14,	name:"110米欄"},{id:15,	name:"4x50M"},{id:16,	name:"4x100M"},{id:17,name:"4x400M"},{id:18,name:"跳高"},{id:19,name:"跳遠"},{id:20,name:"三級跳遠"},{id:21,ame:"壘球"},{id:22,name:"鉛球"}];
const g_ID=[
{id:11000,name:"男A"},
{id:12000,name:"男B"},
{id:13000,name:"男C"},
{id:14000,name:"男D"},
{id:15000,name:"男E"},
{id:21000,name:"女A"},
{id:22000,name:"女B"},
{id:23000,name:"女C"},
{id:24000,name:"女D"},
{id:25000,name:"女E"}
];
const rcx_id=[
    {name:"50M",ref:"RC1"},
    {name:"60M",ref:"RC1"},
    {name:"100M",ref:"RC1"},
    {name:"200M",ref:"RC1"},
    {name:"400M",ref:"RC1"},
    {name:"60米欄",ref:"RC2"},
    {name:"400M",ref:"RC2"},
    {name:"80米欄",ref:"RC2"},
    {name:"110米欄",ref:"RC2"},
    {name:"100米欄",ref:"RC2"},
    {name:"4x100M",ref:"RC3"},
    {name:"4x50M",ref:"RC3"},
    {name:"1500M",ref:"RC5"},
    {name:"1000M",ref:"RC5"},
    {name:"800M",ref:"RC5"},
    {name:"3000M",ref:"RC5"},
    {name:"5000M",ref:"RC5"},
    {name:"跳遠",ref:"RCFIE"},
    {name:"鉛球",ref:"RCFIE"},
    {name:"壘球",ref:"RCFIE"},
    {name:"三級跳遠",ref:"RCFIE"},
    {name:"跳高",ref:"RCFJH"}
]
const mysql = require('mysql');
const options = {
    host: '127.0.0.1',
    user: 'root',
    password: 'qwertyui',
    database: 'sportday2020',
    multipleStatements: true
};
var connection = mysql.createConnection(options);
connection.connect();
//for(let i=0;i<dt.length;i++)
    //let r_=dt[i] 
    //let row={s_number:r_[0],classno:r_[1],spno:r_[2],name:r_[3],rc:r_[4],grk:r_[5],item:r_[6],spgroup:"",I_name:""}
    //connection.query('insert into tbl2 set ? ',row  , (err, res) => {
    //    if (err) {
    //      console.log(err);
    //      return;
    //    }  
    //    console.log(res.insertId);
    //});
for(let i=0;i<rcx_id.length;i++)
{
connection.query('update  tbl2 set rcx=? where  i_name=?; ',[rcx_id[i].ref,rcx_id[i].name]  , (err, res) => {
    if (err) {
      console.log(err);
      return;
    }  
    console.log(res);
});
}   
connection.end();
