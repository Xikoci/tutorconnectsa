
import { Teacher, UserRole, Booking, VerificationStatus } from './types.ts';

export const SUBJECTS = [
  "Mathematics", "Physical Sciences", "Accounting", "English Home Language", 
  "Afrikaans EAT", "Geography", "Life Sciences", "History", "Coding & IT"
];

export const GRADES = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Matric (Grade 12)"];

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Thandi Nkosi',
    email: 'thandi@tutorconnect.sa',
    role: UserRole.TEACHER,
    avatar: 'https://picsum.photos/id/1011/200/200',
    subjects: ['Mathematics', 'Physical Sciences'],
    grades: ['Grade 10', 'Grade 11', 'Matric (Grade 12)'],
    hourlyRate: 250,
    bio: 'Experienced Matric Maths teacher with a 98% pass rate history. I make complex algebra simple and help students visualize geometry problems.',
    rating: 4.9,
    reviewsCount: 124,
    isOnline: true,
    verified: true,
    verificationStatus: VerificationStatus.VERIFIED,
    saceNumber: 'SACE102938',
    idNumber: '8910125000081',
    balance: 4500,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    qualifications: [
      "B.Ed Mathematics & Science (Wits University)",
      "Honours in Mathematics Education",
      "SACE Registered Educator"
    ],
    requirements: [
      "Stable Fiber Internet (10Mbps+)",
      "Wacom Graphic Tablet / Stylus for Whiteboard",
      "Noise-cancelling Headset",
      "HD Webcam",
      "Quiet Environment"
    ],
    availability: {
      "Monday": ["14:00", "15:00", "16:00"],
      "Tuesday": ["15:00", "16:00"],
      "Wednesday": ["14:00", "16:00", "17:00"],
      "Thursday": ["15:00", "17:00"],
      "Friday": ["14:00", "15:00"]
    },
    reviews: [
      { id: 'r1', studentName: 'Sipho M.', rating: 5, comment: 'Ma\'am Thandi is the best! My marks went from 40% to 75%.', date: '2023-10-15' },
      { id: 'r2', studentName: 'Jessica L.', rating: 5, comment: 'Very patient and explains clearly.', date: '2023-09-22' }
    ]
  },
  {
    id: 't2',
    name: 'Johan Van Der Merwe',
    email: 'johan@tutorconnect.sa',
    role: UserRole.TEACHER,
    avatar: 'https://picsum.photos/id/1005/200/200',
    subjects: ['Accounting', 'Afrikaans EAT'],
    grades: ['Grade 8', 'Grade 9', 'Grade 10'],
    hourlyRate: 200,
    bio: 'Patient tutor specializing in building strong foundations in Accounting and Afrikaans.',
    rating: 4.7,
    reviewsCount: 89,
    isOnline: false,
    verified: false,
    verificationStatus: VerificationStatus.PENDING,
    saceNumber: 'SACE998877',
    idNumber: '9205105000085',
    balance: 3200,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    qualifications: [
      "B.Com Accounting (Stellenbosch)",
      "PGCE (UNISA)"
    ],
    availability: {
      "Monday": ["15:00", "16:00", "17:00"],
      "Wednesday": ["15:00", "16:00"],
      "Friday": ["14:00", "15:00", "16:00"]
    },
    reviews: []
  },
  {
    id: 't3',
    name: 'Sarah Pillay',
    email: 'sarah@tutorconnect.sa',
    role: UserRole.TEACHER,
    avatar: 'https://picsum.photos/id/106/200/200',
    subjects: ['Life Sciences'],
    grades: ['Grade 10', 'Grade 11'],
    hourlyRate: 220,
    bio: 'Biology enthusiast making Life Sciences fun and interactive.',
    rating: 5.0,
    reviewsCount: 32,
    isOnline: true,
    verified: false,
    verificationStatus: VerificationStatus.NOT_STARTED,
    qualifications: ["B.Sc Life Sciences (UKZN)"],
    availability: {
      "Monday": ["16:00", "17:00"],
      "Saturday": ["10:00", "11:00"]
    },
    reviews: []
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    teacherId: 't1',
    studentId: 's1',
    teacherName: 'Thandi Nkosi',
    studentName: 'Student User',
    subject: 'Mathematics',
    date: new Date().toISOString(),
    time: '14:00',
    duration: 1,
    tutorFee: 250,
    platformFee: 30,
    totalPaid: 280,
    status: 'upcoming',
    meetLink: 'room-123'
  }
];
