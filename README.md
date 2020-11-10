# School_Sport_Game_Arrangement
# 校運會編排系統

# 運動項目表

輸入田及競賽成績, 輸出名單、成績、進階成績及進階名單。完整平板操作, 包括輸入、輸出、打印名單及成績表。(wkhtmltoPDF 制作PDF; 利用foxitreader /p path; 后台打印)

- ITEM: 男A100M   
- SI_ID:1101X  (X: 0 初 1 複 2 決)

|    |    |11男A|12男B| 13男C|14男D|15男E|21女A|22女B|23女C| 24女D|25女E|
|:--:|:--:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|01|50M|||||50M|||||50M
|02|60M||||60M|||||60M|
|03|100M|100M|100M|100M|||100M|100M|100M||
|04|200M|200M|200M|200M|||200M|200M|200M||
|05|400M|400M|400M||||400M|400M|||
|06|800M|800M|800M||||800M|800M|||
|07|1000M||||1000M|||||1000M|
|08|1500M|1500M|1500M|1500M|||1500M|1500M|1500M||
|09|3000M||3000M||||3000M|3000M|||
|10|5000M|5000M|||||||||
|11|60M欄||||||||60M欄||
|12|80M欄|||80M欄|||80M欄|80M欄|||
|13|100M欄||100M欄||||100M欄||||
|14|110M欄|110M欄|110M欄||||||||
|15|4x50M||||4x50M|4x50M||||4x50M|4x50M
|16|4x100M|4x100M|4x100M|4x100M|||4x100M|4x100M|4x100M||
|17|4x400M|4x400M|4x400M||||4x400M|4x400M|||
|18|跳高|跳高|跳高|跳高|跳高|跳高|跳高|跳高|跳高|跳高|跳高
|19|跳遠|跳遠|跳遠|跳遠|跳遠|跳遠|跳遠|跳遠|跳遠|跳遠|跳遠
|20|三級跳遠|三級跳遠|三級跳遠||||||||
|21|壘球||||壘球|壘球||||壘球|壘球
|22|鉛球|鉛球|鉛球|鉛球|||鉛球|鉛球|鉛球|

# RCX - SI_ID 表

|RCX|  cfj |si_id|Title|
|:-:|:---: |:---:|:---:|
|RC5|      |           |si_id,rcx,rank,s_number,number,name,classno,rc,note
|RC5|800以上 決|6,7,8,9,10 |名次,小號,號碼,姓名,班別,成績,備註  
|RC7|      |           |si_id,rcx,rank,group_id,s_number,number,name,classno,rc,grk,note
|RC7|800以上 分組決|           |名次,組次,小號,號碼,姓名,班別,成績,GRK,備註 
|RC1|      |           |si_id,rcx,rank,group_id,road,number,classno,name,rc,grk,note
|RC1|短跑 初,複 |1,2,3,4,5,11,12,13,14 |名次,組次,道次,號碼,姓名,班別,成績,GRK,備註 
|RC2|      |           |si_id,rcx,rank,road,number,classno,name,rc,note
|RC2|短跑 決|           |名次,道次,號碼,姓名,班級,成績,備註
|RC3|      |           |si_id,rcx,rank,group_id,road,name,number,rc,classno,grk,note
|RC3|4x初, 複 |15, 16, 17|名次,組次,道次,隊名,,成績,,GRK,備註 
|RC4|      |           |si_id,rcx,rank,road,name,number,rc,classno,note
|RC4|4x決賽|          |名次,道次,隊名,,成績,,備註 
|RCFIE
|RCFJH

# 標題
|rcx|title |
|:-:|:---: |
| RC1|	名次,組次,道次,號碼,姓名,班別,成績,GRK,備註
| RC2|	名次,道次,號碼,姓名,班級,成績,備註
| RC3|	名次,組次,道次,隊名,,成績,,GRK,備註
| RC4|	名次,道次,號碼,姓名,班級,成績,備註
| RC5|	名次,小號,號碼,姓名,班別,成績,備註

# SPNO 號碼布,編碼
|內容|編碼 |
|:-:|:---: |
|級別 |1 2 3 4 5 6 9 8 7 
|     |SG1 SG2 SG3 SC1 SC2 SC3 P6 P5 P4
|班別 |1 2 3 4 5
|     |A B C D E
|學號 |01
|例子 |SG1A01 1101

# 竞賽進級按成績排場次及道號, 田賽按最好成績最后出場.
```js
function porm_road_base_rc(pre_group_cnt) {
    let porm_road_s = null;
    if (pre_group_cnt == 7) {
        porm_road_s = [
            ",4;,5;,3;,6;,2;,7;,8",
            "二,4;一,4;一,5;二,5;二,3;一,3;一,6;二,6;二,2;一,2;二,7;一,7;一,8;二,8"
        ];
    } else if (pre_group_cnt == 6) {
        porm_road_s = [
            ",4;,5;,3;,6;,2;,7;,8",
            "二,4;一,4;一,5;二,5;二,3;一,3;一,6;二,6;二,2;一,2;二,7;一,7;一,8;二,8"];
    }
    else {  //each group for 8 roads
        porm_road_s = [
            ",4;,5;,3;,6;,2;,1;,7;,8",
            "二,4;一,4;一,5;二,5;二,3;一,3;一,6;二,6;二,2;一,2;一,1;二,1;二,7;一,7;一,8;二,8",
            "三,4;二,4;一,4;一,5;二,5;三,5;三,3;二,3;一,3;一,6;二,6;三,6;三,2;二,2;一,2;一,1;二,1;三,1;一,7;二,7;三,7;一,8;二,8;三,8",
            "四,4;三,4;二,4;一,4;一,5;二,5;三,5;四,5;四,3;三,3;二,3;一,3;一,6;二,6;三,6;四,6;四,2;三,2;二,2;一,2;一,1;二,1;三,1;四,1;四,7;三,7;二,7;一,7;一,8;二,8;三,8;四,8"
        ];
    }
    return porm_road_s;
}
```
|	場	|	道	|	人數
|:-:|:---: |:---: |
|		|	4	|	1
|		|	5	|	2
|		|	3	|	3
|		|	6	|	4
|		|	2	|	5
|		|	1	|	6
|		|	7	|	7
|		|	8	|	8
|	二	|	4	|	1
|	一	|	4	|	2
|	一	|	5	|	3
|	二	|	5	|	4
|	二	|	3	|	5
|	一	|	3	|	6
|	一	|	6	|	7
|	二	|	6	|	8
|	二	|	2	|	9
|	一	|	2	|	10
|	一	|	1	|	11
|	二	|	1	|	12
|	二	|	7	|	13
|	一	|	7	|	14
|	一	|	8	|	15
|	二	|	8	|	16
|	三	|	4	|	1
|	二	|	4	|	2
|	一	|	4	|	3
|	一	|	5	|	4
|	二	|	5	|	5
|	三	|	5	|	6
|	三	|	3	|	7
|	二	|	3	|	8
|	一	|	3	|	9
|	一	|	6	|	10
|	二	|	6	|	11
|	三	|	6	|	12
|	三	|	2	|	13
|	二	|	2	|	14
|	一	|	2	|	15
|	一	|	1	|	16
|	二	|	1	|	17
|	三	|	1	|	18
|	一	|	7	|	19
|	二	|	7	|	20
|	三	|	7	|	21
|	一	|	8	|	22
|	二	|	8	|	23
|	三	|	8	|	24
|	四	|	4	|	1
|	三	|	4	|	2
|	二	|	4	|	3
|	一	|	4	|	4
|	一	|	5	|	5
|	二	|	5	|	6
|	三	|	5	|	7
|	四	|	5	|	8
|	四	|	3	|	9
|	三	|	3	|	10
|	二	|	3	|	11
|	一	|	3	|	12
|	一	|	6	|	13
|	二	|	6	|	14
|	三	|	6	|	15
|	四	|	6	|	16
|	四	|	2	|	17
|	三	|	2	|	18
|	二	|	2	|	19
|	一	|	2	|	20
|	一	|	1	|	21
|	二	|	1	|	22
|	三	|	1	|	23
|	四	|	1	|	24
|	四	|	7	|	25
|	三	|	7	|	26
|	二	|	7	|	27
|	一	|	7	|	28
|	一	|	8	|	29
|	二	|	8	|	30
|	三	|	8	|	31
|	四	|	8	|	32

### config.js
```js 
'use strict';
const nconf = (module.exports = require('nconf'));
const path = require('path');
nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'NODE_ENV',
    'PORT',
    'SECRET',
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  .defaults({
    REDISHOST: "127.0.0.1",
    MYSQL_HOST: "127.0.0.1",
    MYSQL_DB: "",
    MYSQL_USER: "",
    MYSQL_PASSWORD: "",
    PORT: 8088,
    SECRET: 'cat',
    FOXITREADER:'',
    WKHTML:'',
    SP_REPORT_TO_PUBLIC:"",
  });
//Check for required settings
function checkConfig(setting) {
  if (!nconf.get(setting)) {
    throw new Error(
      `You must set ${setting} as an environment variable or in config.json!`
    );
  }
}
```
# using sportgroup/sport_rcmrk/config.js

```
var mysql = require("mysql");
const config = require('../../config');

exports.localmysql= mysql.createConnection({
    host: config.get('MYSQL_HOST'),
    user: config.get('MYSQL_USER'),
    password: config.get('MYSQL_PASSWORD'),
    database: config.get('MYSQL_DB'),
    multipleStatements: true,
    acquireTimeout: 50000    
});
```


# 其它Console
- C:/Apache/MySQL Server 8.0
- C:/Apache/www
- C:/Apache/sportdayPHPWebsite
- cmd
- C:/Apache>run
- C:\code\SportDay\Sport_gae_xls\gaexls\bin\Debug\gaexls.exe
- C:\code\Gae_SportDay_GAEDATA\gae\bin\Debug\gae.exe
- C:\code\SportDay\SportDay\bin\Debug\SportDay.exe
- %MY_DOCUMENT%/.credentials
- mbcdevit
- mbc11thsp


# 參考
# Getting Started with Node.js on Google Cloud Platform
* [Getting started with Node.js](https://cloud.google.com/nodejs/getting-started)

