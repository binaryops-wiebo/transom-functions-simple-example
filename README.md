## Server Functions - Simple
#### Simple TransomJS Server functions example

In this example we use plugin...core
Demonstrate how you can use your own custom code as an end point in the TransomJS. Your custom code runs in the context of the TransomJS server, and has access to all the plugins.

### Run the example
Clone the repo from `git@github.com:binaryops-wiebo/transom-functions-simple-example.git` and run `npm install'.
Use `npm start` to run the api server. The API will start on the localhost, on port 7070. 

### Details
The function definition is in `myApi.js`. You'll note that it uses a GET request, and the function gets a reference of the TransomJS
server passed in, as well as the expected request, response and next function.
``` javascript
timesten: {
  methods: ["GET"],
  function: function (server, req, res, next) {
    if (req.params["val"]) {
      const v = Number.parseFloat(req.params["val"]);
      res.send(v + " times ten is " + (v * 10));
    }
    next();
  }
}
```

You can browse to http://localhost:7070/api/v1/fx/timesten?val=45 and http://localhost:7070/api/v1/fx/hello to try the functions for yourself!

### See Also

Server functions really shine in combination with other plugins. In [this example](https://transomjs.github.io/docs/secured-function-example/) we add security and in [this example](https://transomjs.github.io/docs/socketio-example/) we show how you can send asynchronous messages, useful in long running processes, or multi-user scenarios. 


