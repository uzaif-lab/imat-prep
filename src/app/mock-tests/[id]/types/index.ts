export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  category: string;
  options: Option[];
  correctOption: string;
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

export interface MockTests {
  [key: string]: MockTest;
} 