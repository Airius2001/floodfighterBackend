import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpModule } from '@nestjs/axios';
import { WaterDataService } from './water-data.service';
import { WaterDataController } from './water-data.controller';

import { FloodController } from './flood.controller';
import { FloodService } from './flood.service';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { GeoController } from './geo.controller';
import { GeoService } from './geo.service';
import { RainfallService } from './rainfall.service';
import { RainfallController } from './rainfall.controller';

// Import TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './quiz/entities/quiz-question.entity';
import { QuizOption } from './quiz/entities/quiz-option.entity';
import { QuizExplanation } from './quiz/entities/quiz-explanation.entity';

//import quiz service and controller (test)
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d3m66m3ipnbc73ah05sg-a.singapore-postgres.render.com', // Render host
      port: 5432,
      username: 'floodfighter_db_user',
      password: '684YGLA0lG2yKGpexauXVdquY0YpmH4J',
      database: 'floodfighter_db',
      entities: [QuizQuestion, QuizOption, QuizExplanation],
      synchronize: true,
      ssl: { rejectUnauthorized: false }, // Render PostgreSQL have to actaviate SSL
    }),
    TypeOrmModule.forFeature([QuizQuestion, QuizOption, QuizExplanation]),
  ],
  controllers: [
    WaterDataController,
    FloodController,
    WeatherController,
    GeoController,
    RainfallController,
    QuizController,
  ],
  providers: [
    WaterDataService,
    FloodService,
    WeatherService,
    GeoService,
    RainfallService,
    QuizService,
  ],
})
export class AppModule {}
