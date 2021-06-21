import 'reflect-metadata';
import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { HttpPostController, HttpGetController } from './lib/server/controller'
import { Log } from './lib/os/log';
import Container from 'typedi';

const app = express();
useContainer(Container);
useExpressServer(app, { controllers: [HttpPostController, HttpGetController] }).listen(8888, () => {
  Log.debug('服务已启动：', 'http://127.0.0.1:8888/')
});




