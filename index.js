const express = require('express')
const crypto = require('crypto')
const bodyParser = require('body-parser')

const app = express()

const softwareName = "resamv1-cms";
const version = "v1";
const authKey = "keepingConnnection123";
var loggedIn = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.bodyParser());


app.get('/', (req, res) => {
    res.send('Welcome to ReSam (resource management utility software). Intended to be used in the backend.');
});


app.post('/',(req,res)=>{

    var resonseObject = {};

    if(req.body.body.authKey && req.body.body.reference)
    {
        resonseObject.got = req.body.authKey;
        resonseObject.prev = authKey;


        if(req.body.body.authKey===authKey){
          const key = req.body.body.reference+(new Date()).toISOString();
          const hashValue = crypto.createHash('md5').update(key).digest('hex');
          resonseObject["hash-generated"] = hashValue;
          resonseObject["connection"] = "alive/connected";
        }else{
          resonseObject["connection"] = "dead/not-connected";
          resonseObject["error"] = "Invalid Auth Key!";
        }

    }else{
      resonseObject["connection"] = "dead/not-connected";
      resonseObject["error"] = "Auth Key && Auth Reference required!";
    }

    res.send(resonseObject);
});

app.post('/about',(req,res)=>{

  const resonseObject = {
    "software":softwareName,
    "version":version,
    "current-hash-val":crypto.createHash('md5').update(softwareName+version).digest('hex')
  };
 
  res.send(resonseObject);
});

app.post('/',(req,res)=>{

  const resonseObject = {
    "software":softwareName,
    "version":version,
    "current-hash-val":crypto.createHash('md5').update(softwareName+version).digest('hex')
  };
 
  res.send(resonseObject);
});





  
app.listen(3000)