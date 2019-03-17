module.exports = {
    note:
        'This is a very simple example NodeJS app that uses TransomJS and the Server Functions module.',
    name: 'My functions Example App',
    transom: {},
    definition: {
        functions: {
            hello: {
                methods: ['GET'],
                function: function(server, req, res, next) {
                    res.send('Hello world!');
                    next();
                }
            },
            timesten: {
                methods: ['GET'],
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
        }
    }
};
