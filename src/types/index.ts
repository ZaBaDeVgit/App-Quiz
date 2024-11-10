export interface Categories {
  [key: string]: string[];
}

export interface Question {
  category: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
}

export interface TestResult {
  category: string;
  topic: string;
  score: number;
  total: number;
  date: string;
}