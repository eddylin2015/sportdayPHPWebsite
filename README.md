# School_Sport_Game_Arrangement
# 校運會編排系統

# 運動項目表

輸入田及競賽成績, 輸出名單、成績、進階成績及進階名單。完整平板操作, 包括輸入、輸出、打印名單及成績表。(wkhtmltoPDF 制作PDF; 利用foxitreader /p path; 后台打印)

- ITEM: 男A100M   
- SI_ID:1101X  (X: 0 初 1 複 2 決)

```
	11男A	12男B	13男C	14男D	15男E	21女A	22女B	23女C	24女D	25女E
01	50M					50M					50M
02	60M				60M					60M	
03	100M	100M	100M	100M			100M	100M	100M		
04	200M	200M	200M	200M			200M	200M	200M		
05	400M	400M	400M				400M	400M			
06	800M	800M	800M				800M	800M			
07	1000M				1000M					1000M	
08	1500M	1500M	1500M	1500M			1500M	1500M	1500M		
09	3000M		3000M				3000M	3000M			
10	5000M	5000M									
11	60M欄								60M欄		
12	80M欄			80M欄			80M欄	80M欄			
13	100M欄		100M欄				100M欄				
14	110M欄	110M欄	110M欄								
15	4x50M				4x50M	4x50M				4x50M	4x50M
16	4x100M	4x100M	4x100M	4x100M			4x100M	4x100M	4x100M		
17	4x400M	4x400M	4x400M				4x400M	4x400M			
18	跳高	跳高	跳高	跳高	跳高	跳高	跳高	跳高	跳高	跳高	跳高
19	跳遠	跳遠	跳遠	跳遠	跳遠	跳遠	跳遠	跳遠	跳遠	跳遠	跳遠
20	三級跳遠	三級跳遠	三級跳遠								
21	壘球				壘球	壘球				壘球	壘球
22	鉛球	鉛球	鉛球	鉛球			鉛球	鉛球	鉛球	
```

# RCX - SI_ID 表


```
RC5 si_id,rcx,rank,s_number,number,name,classno,rc,note
RC5 名次,小號,號碼,姓名,班別,成績,備註 //800以上 決 si_id( 6,7,8,9,10)
RC7 si_id,rcx,rank,group_id,s_number,number,name,classno,rc,grk,note
RC7 名次,組次,小號,號碼,姓名,班別,成績,GRK,備註 //800以上 分組決
RC1 si_id,rcx,rank,group_id,road,number,classno,name,rc,grk,note
RC1 名次,組次,道次,號碼,姓名,班別,成績,GRK,備註 //短跑 初,複 si_id( 1,2,3,4,5 , 11,12,13,14)
RC2 si_id,rcx,rank,road,number,classno,name,rc,note
RC2 名次,道次,號碼,姓名,班級,成績,備註 //短跑 決
RC3 si_id,rcx,rank,group_id,road,name,number,rc,classno,grk,note
RC3 名次,組次,道次,隊名,,成績,,GRK,備註 //4x初, 複 si_id( 15, 16, 17)
RC4 si_id,rcx,rank,road,name,number,rc,classno,note
RC4 名次,道次,隊名,,成績,,備註 //4x決賽
RCFIE
RCFJH
```

# 標題

- RC1	名次,組次,道次,號碼,姓名,班別,成績,GRK,備註
- RC2	名次,道次,號碼,姓名,班級,成績,備註
- RC3	名次,組次,道次,隊名,,成績,,GRK,備註
- RC4	名次,道次,號碼,姓名,班級,成績,備註
- RC5	名次,小號,號碼,姓名,班別,成績,備註

# SPNO 號碼編排

- 1 2 3 4 5 6
- SG1 SG2 SG3 SC1 SC2 SC3
- 9 8 7 
- P6 P5 P4
- 1 2 3 4 5
- A B C D E
- 01
- SG1A01 1101

# config.js

```
const nconf = (module.exports = require('nconf'));
const path = require('path');
nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'NODE_ENV',
    'PORT',
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    REDISHOST: "",
    MYSQL_HOST: "",
    MYSQL_DB: "",
    MYSQL_USER: "",
    MYSQL_PASSWORD: "",
    PORT: 80,
    // Set this a secret string of your choosing
    SECRET: '.......',
    FOXITREADER:'...',
    WKHTML:'...',
    SP_REPORT_TO_PUBLIC:"...",
    SP_DB:'',
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