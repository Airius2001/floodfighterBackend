// api/index.ts
export const config = { runtime: 'vercel/node@22.x' }; 

import 'reflect-metadata';
import serverless from 'serverless-http';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';

let cached: any;

async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  // 可改成你的前端域名白名单
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.init(); // serverless 环境不调用 listen
  return serverless(expressApp);
}

export default async function handler(req: any, res: any) {
  if (!cached) cached = await bootstrap();
  return cached(req, res);
}
