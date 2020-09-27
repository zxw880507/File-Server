const net = require('net');
const fs = require('fs');
const { stdout } = require('process');
const stdin = process.stdin;
stdin.setEncoding('utf-8');
const server = net.createServer();
const port = 7000;

server.on('listening', () => {
    console.log("Tcp server listening on port:", port);
});

server.on('connection', (client) => {
    console.log('New client connected!');
    client.setEncoding('utf-8');
    client.write('Hello there!');
    client.on('data', data => {
        if (/^\.\/.*/g.test(data)) {
            fs.readFile(data, { encoding: 'utf-8' }, (error, filedata) => {
                if (error) {
                    client.write(`${data} doesn't exist`)
                } else {
                    client.write(filedata);
                }
            });

        } else {
            console.log(`Incoming: ${data}`);
        }
    });
    stdin.on('data', data => {
        client.write(data.match(/.+(?=\n)/).join(''));
    })
});

server.listen(port);