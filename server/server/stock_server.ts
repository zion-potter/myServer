import * as express from 'express';
import {Server} from 'ws';

const app = express();

app.get('/', (request, response) => response.send('这里是首页'));

app.get('/api/stock', (request, response) => {
    response.json(stocks);
});

app.get('/api/stock/:id', (request, response) => {
    response.json(stocks.find((stock) => stock.id == request.params.id));
});

const server = app.listen(8080, 'localhost', () => {
    console.log('服务器已经启动，地址是http://localhost:8080');
});

const wsServer = new Server({port: 8081});
wsServer.on('connection', websocket => {
    websocket.send('欢迎连接服务器.');
    websocket.on('message', message => {
        console.log('接受到客户端发送的消息，消息内容是：' + message);
    });
});

setInterval(() => {
   if(wsServer.clients) {
       wsServer.clients.forEach(client => {
           client.send('这是定时推送的消息哟');
       })
   }
}, 2000)

export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public catagories: Array<string>) {

    }
}

const stocks: Stock[] = [
    new Stock(1, '第一只股票', 1.99, 3.5, "这是第一只股票，你能咋地", ['IT','互联网']),
    new Stock(2, '第二只股票', 2.99, 4.5, "这是第二只股票，你能咋地", ['金融']),
    new Stock(3, '第三只股票', 3.99, 2.5, "这是第三只股票，你能咋地", ['IT']),
    new Stock(4, '第四只股票', 4.99, 1.5, "这是第四只股票，你能咋地", ['互联网']),
    new Stock(5, '第五只股票', 5.99, 2.0, "这是第五只股票，你能咋地", ['金融']),
    new Stock(6, '第六只股票', 6.99, 4.0, "这是第六只股票，你能咋地", ['IT','互联网']),
    new Stock(7, '第七只股票', 7.99, 5.0, "这是第七只股票，你能咋地", ['IT','金融']),
    new Stock(8, '第八只股票', 8.99, 3.0, "这是第八只股票，你能咋地", ['金融','互联网']),
];