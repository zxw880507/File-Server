const net = require('net');

const stdin = process.stdin;
stdin.setEncoding('utf8');
stdin.resume();

const client = net.createConnection({
    host: '192.168.0.23',
    port: 7000
});

client.setEncoding('utf-8');

client.on('connect', () => {
    // when a connection is established
    console.log("successfully connected to server");
    stdin.on('data', data => {
        client.write(data.match(/.+(?=\n)/).join(''));
    });
});

client.on('data', (data) => {
    console.log('Server says: ', data);
});