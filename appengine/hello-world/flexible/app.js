/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.options('/api', function (req2, res) {
  // res.send('<h1>Hello Node.js</h1>');
  // res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  console.log(req2);
//   if(req2.body && (!req2.body.path && !req2.body.token)){
    
//       req2.body = JSON.parse(req2.body);
//   }
  if (req2.body && req2.body.path && req2.body.token) {
      var request = require("request");
      console.log('https://api.medium.com' + req2.body.path)
      var options = {
          method: 'GET',
          url: 'https://api.medium.com' + req2.body.path,
          headers: {
              'cache-control': 'no-cache',
              authorization: req2.body.token
          }
      };

      request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
          var json = JSON.parse(body);
          res.json(json)
      });
      // res.send(`${Date.now()}`);
  } else {
      var json = {
          'message': 'No Request'
      };
      res.json(json)
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
