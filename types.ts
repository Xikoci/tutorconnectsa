
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  balance?: number;
  pendingBalance?: number;
  points?: number;
  streak?: number;
  badges?: string[];
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Teacher extends User {
  role: UserRole.TEACHER;
  subjects: string[];
  grades: string[];
  hourlyRate: number;
  bio: string;
  rating: number;
  reviewsCount: number;
  isOnline: boolean;
  verified: boolean;
  qualifications: string[];
  reviews: Review[];
  availability: { [day: string]: string[] };
  videoUrl?: string;
  requirements?: string[];
}

export interface Booking {
  id: string;
  teacherId: string;
  studentId: string;
  teacherName: string;
  studentName: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  tutorFee: number;
  platformFee: number;
  totalPaid: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetLink?: string;
  paymentMethod?: string;
  feedbackGiven?: boolean;
}

export interface LaunchStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  category: 'Tech' | 'Fin' | 'Legal' | 'Growth';
}
