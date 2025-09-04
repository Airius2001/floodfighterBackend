// api/[[...slug]].ts
export const config = { runtime: 'nodejs22.x' }; // 或 'nodejs20.x'

import 'reflect-metadata';
import serverless from 'serverless-http';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

let cached: any;

async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);


  const { AppModule } = await import('../dist/src/app.module.js');

  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });


  app.enableCors({
    origin: 'https://floodfighter.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.init();               
  return serverless(expressApp); 
}

export default async function handler(req: any, res: any) {
  if (!cached) cached = await bootstrap();
  return cached(req, res);
}
