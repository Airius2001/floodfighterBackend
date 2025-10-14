import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';

@Injectable()
export class QuizService implements OnModuleInit {
  private readonly logger = new Logger(QuizService.name);

  constructor(
    @InjectRepository(QuizQuestion)
    private readonly quizRepo: Repository<QuizQuestion>,
  ) {}

  // Automatically execute the keep-alive logic once when the service starts
  async onModuleInit() {
    this.keepDatabaseAlive();
    // Perform a database 'keep-alive' every 5 minutes
    setInterval(() => this.keepDatabaseAlive(), 5 * 60 * 1000);
  }

  private async keepDatabaseAlive() {
    try {
      await this.quizRepo.query('SELECT 1');
      this.logger.log('Database connection kept alive ✅');
    } catch (err) {
      this.logger.error('Database keep-alive failed ❌', err);
    }
  }

  // The existing findAll method
  async findAll() {
    return this.quizRepo.find({ relations: ['options', 'explanations'] });
  }

  // The original random question method (with minor corrections)
  async findRandom(limit = 10) {
    const randomIds = await this.quizRepo
      .createQueryBuilder('quiz')
      .select('quiz.question_id', 'id')
      .orderBy('RANDOM()')
      .limit(limit)
      .getRawMany();

    // 🛠 Fix: The field name mapped is incorrect
    const ids = randomIds.map((q) => q.id);

    return this.quizRepo.find({
      where: { question_id: In(ids) },
      relations: ['options', 'explanations'],
    });
  }
}
