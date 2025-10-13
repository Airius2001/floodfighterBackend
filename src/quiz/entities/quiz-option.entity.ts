import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuizQuestion } from './quiz-question.entity';

@Entity('public_quiz_options')
export class QuizOption {
  @PrimaryGeneratedColumn()
  option_id: number;

  @Column()
  question_id: number;

  @Column('text')
  option_text: string;

  @Column({ default: false })
  is_correct: boolean;

  @ManyToOne(() => QuizQuestion, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestion;
}
