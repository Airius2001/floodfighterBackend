import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizQuestion)
    private readonly quizRepo: Repository<QuizQuestion>,
  ) {}

  async findAll() {
    return this.quizRepo.find({ relations: ['options', 'explanations'] });
  }
}
