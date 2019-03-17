## Server Functions - Simple
#### Simple TransomJS Server functions example

In this example we create a TransomJS server and only use the [transom-server-functions plugin](https://transomjs.github.io/docs/transom-server-functions/).
It demonstrates how you can use your own custom code as an end point in the API. Your custom code runs in the context of the TransomJS server, and has access to the entire server context.

### Run the example
Clone the repo from `git@github.com:binaryops-wiebo/transom-functions-simple-example.git` and run `npm install`.
Use `npm start` to run the api server. The API will start on the localhost, on port 7070. 

### Details
The function definition is in `myApi.js`. You'll note that it uses a GET request, and the function gets a reference of the TransomJS
server passed in. Of course it also gets the `request`, `response` and `next` functions, as you would in any Restify server.
``` javascript
timesten: {
  methods: ["GET"],
  function: function(server, req, res, next) {
    let result = 'val parameter is required.';
    if (req.params['val']) {
      const v = Number.parseFloat(req.params['val']);
      result = `${v} times ten is ${v * 10}`;
    }
    res.send(result);
    next();
  }
}
```

You can browse to http://localhost:7070/api/v1/fx/timesten?val=45 to try the functions for yourself!

### See Also

Server functions really shine in combination with other plugins. In [this example](https://transomjs.github.io/docs/secured-function-example/) we add security and in [this example](https://transomjs.github.io/docs/socketio-example/) we show how you can send asynchronous messages from a function, useful in long running processes, or multi-user scenarios. 


