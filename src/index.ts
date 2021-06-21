import 'reflect-metadata';
import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { HttpPostController, HttpGetController } from './lib/server/controller'
import { Log } from './lib/os/log';
import Container from 'typedi';
const cors = require('cors');
const app = express();
const corsOptions = {
  'orgin': '*',
  'methods': 'POST,GET,OPTIONS',
  'maxAge': 2592000
}
app.use(cors(corsOptions));
useContainer(Container);
useExpressServer(app, { controllers: [HttpPostController, HttpGetController] }).listen(8888, () => {
  Log.debug('服务已启动：', 'localhost:8888/')
});




