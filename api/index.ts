// api/index.ts
import 'reflect-metadata';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';

// 复用 handler，减少冷启动
let cached: any;

async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  // 如果前端不同域名，放开 CORS；生产建议把 origin 改成你的前端域名
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.init(); // serverless 环境不调用 listen
  return serverless(expressApp);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cached) cached = await bootstrap();
  return cached(req as unknown as Request, res as unknown as Response);
}
