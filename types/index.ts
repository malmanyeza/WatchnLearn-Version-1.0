export interface User {
  id: string;
  name: string;
  school: string;
  examBoard: 'ZIMSEC' | 'Cambridge';
  level: 'JC' | 'O-Level' | 'A-Level';
  subjects: string[];
  avatar?: string;
}

export interface Subject {
  id: string;
  name: string;
  level: 'JC' | 'O-Level' | 'A-Level';
  examBoard: 'ZIMSEC' | 'Cambridge';
  description: string;
  icon: string;
  enrolled: boolean;
  progress?: number;
  terms: Term[];
}

export interface Term {
  id: string;
  title: string;
  chapters: Chapter[];
  progress: number;
}

export interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
  completed: boolean;
}

export interface Topic {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  duration?: string;
  pages?: number;
  completed: boolean;
  downloaded: boolean;
}

export interface PastPaper {
  id: string;
  year: number;
  paperType: string;
  subject: string;
  examBoard: 'ZIMSEC' | 'Cambridge';
  downloaded: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}