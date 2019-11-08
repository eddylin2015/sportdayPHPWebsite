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

const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const config = require('./config');

const app = express();
app.disable('etag');
app.use(require('morgan')('combined'));
app.set('views', require('path').join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy',true)
//public static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'files')));

// [START session]
// Configure the session and session storage.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//default false

app.use(session({  
    resave: false,
    saveUninitialized: false,
    secret: config.get('SECRET'),
    signed: true,
    store: new RedisStore({host:config.get('REDISHOST')}),
}));

// [END session]

// OAuth2
app.use(passport.initialize());
app.use(passport.session())
app.use(require('./lib/oauth2').router);

// Books
app.use('/blogs', require('./blogs/crud'));
app.use('/api/blogs', require('./blogs/api'));
//sortableTable
app.use('/sortableTable', require('./sortableTable/crud'));
app.use('/namelist', require('./namelist/crud'));
app.use('/report_to_public', require('./report_to_public/crud'));
// Redirect root to /books
app.get('/', (req, res) => {
  res.render('index',{profile:req.user});   // res.redirect('/index');
});

app.get('/errors', () => {
  throw new Error('Test exception');
});

app.get('/logs', (req, res) => {
  console.log('Hey, you triggered a custom log entry. Good job!');
  res.sendStatus(200);
});

app.get('/auth/login',    function (req, res) {
  //console.log(req.query.return);
  res.render('login',{redirect:req.query.return});
});

app.get('/login',    function (req, res) {
  //console.log(req.query.return);
  res.render('login',{redirect:req.query.return});
});

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

const cluster = require('cluster');
const numCPUs = require('os').cpus().length-1;
if (cluster.isMaster) {
  //var
  let numReqs = 0;
  let numPidReqs={}
  //function
  function eachWorker(callback) {
    for (const id in cluster.workers) {
      callback(cluster.workers[id]);
    }
  }   
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1; let key="pid"+msg.pid;
      numPidReqs[key] = numPidReqs.hasOwnProperty(key) ? (numPidReqs[key] +  1): 1 ;      
      eachWorker((worker) => { worker.send({cmd:'workNumReqs',num:numReqs, pid: msg.pid, nums:JSON.stringify(numPidReqs)});});
    }else if(msg.cmd && msg.cmd === 'notifyUpdateUsers') {
      eachWorker((worker) => { worker.send({cmd:'workUpdateUsers',staf:msg.stafref});});
    }
  }  
  //start Master
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs -1; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log('worker %d died (%s). restarting...',
    worker.process.pid, signal || code);
    cluster.fork();
  });
  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }
  //
  var os = require('os');
  var ifaces = os.networkInterfaces();
  
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
  
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
  
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
  });
  //

} else {
  // Start the server
  const port = process.env.PORT || 80;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
  console.log(`Worker ${process.pid} started`);
  process.on('message', (msg) => {
    if(msg && msg.cmd=="workNumReqs"){  
      CntReqs=msg.num;
      CntClusterReqs=msg.nums;
    }else if(msg && msg.cmd=="workUpdateUsers"){
      console.log(cluster.worker.id,JSON.stringify(msg));        
      users.updateUser(msg.staf, (result)=> {
        console.log(JSON.stringify({pid: process.pid , staf:msg.staf, res: result}));
      });  
    }    
  });  

}
module.exports = app;
