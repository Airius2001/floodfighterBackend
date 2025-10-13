import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuizQuestion } from './quiz-question.entity';

@Entity('public_quiz_explanations')
export class QuizExplanation {
  @PrimaryGeneratedColumn()
  explanation_id: number;

  @Column()
  question_id: number;

  @Column('text')
  explanation_text: string;

  @ManyToOne(() => QuizQuestion, (question) => question.explanations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestion;
}
