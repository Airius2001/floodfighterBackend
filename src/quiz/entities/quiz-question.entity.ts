import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { QuizOption } from './quiz-option.entity';
import { QuizExplanation } from './quiz-explanation.entity';

@Entity('public_quiz_questions')
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column('text')
  question_text: string;

  @Column('text')
  scenario_category: string;

  @Column('text')
  difficulty_level: string;

  @OneToMany(() => QuizOption, (option) => option.question)
  options: QuizOption[];

  @OneToMany(() => QuizExplanation, (explanation) => explanation.question)
  explanations: QuizExplanation[];
}
