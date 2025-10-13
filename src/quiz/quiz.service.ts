import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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

  // Randomly select 10 questions, keeping all options and explanations
  async findRandom(limit = 10) {
    // Randomly obtain the question ID
    const randomIds = await this.quizRepo
      .createQueryBuilder('quiz')
      .select('quiz.question_id')
      .orderBy('RANDOM()')
      .limit(limit)
      .getRawMany();

    const ids = randomIds.map((q) => q.quiz_question_id);

    // Check the complete question and its associated data
    return this.quizRepo.find({
      where: { question_id: In(ids) },
      relations: ['options', 'explanations'],
    });
  }
}
