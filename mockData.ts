
import { Teacher, UserRole, Booking } from './types.ts';

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
    bio: 'Patient tutor specializing in building strong foundations in Accounting and Afrikaans. I focus on understanding the "why" behind the numbers.',
    rating: 4.7,
    reviewsCount: 89,
    isOnline: false,
    verified: true,
    balance: 3200,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    qualifications: [
      "B.Com Accounting (Stellenbosch)",
      "PGCE (UNISA)",
      "TEFL Certified"
    ],
    requirements: [
      "Stable Internet Connection",
      "Noise-cancelling Mic",
      "Desktop/Laptop (No tablets for sharing spreadsheets)"
    ],
    availability: {
      "Monday": ["15:00", "16:00", "17:00"],
      "Wednesday": ["15:00", "16:00"],
      "Friday": ["14:00", "15:00", "16:00"]
    },
    reviews: [
      { id: 'r3', studentName: 'Michael B.', rating: 4, comment: 'Great accounting help, really understands the syllabus.', date: '2023-10-01' },
      { id: 'r4', studentName: 'Lerato K.', rating: 5, comment: 'My Afrikaans has improved so much!', date: '2023-09-10' }
    ]
  },
  {
    id: 't3',
    name: 'Simphiwe Zulu',
    email: 'simphiwe@tutorconnect.sa',
    role: UserRole.TEACHER,
    avatar: 'https://picsum.photos/id/1027/200/200',
    subjects: ['English Home Language', 'History'],
    grades: ['Grade 11', 'Matric (Grade 12)'],
    hourlyRate: 180,
    bio: 'Passionate about literature and essay writing skills. Let us ace that English paper! I also help with history source-based questions.',
    rating: 4.8,
    reviewsCount: 56,
    isOnline: true,
    verified: true,
    balance: 1500,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    qualifications: [
      "BA English Literature (UCT)",
      "Masters in History",
      "SACE Registered"
    ],
    requirements: [
      "Stable Fiber Internet",
      "HD Camera",
      "Quiet Room"
    ],
    availability: {
      "Tuesday": ["14:00", "15:00", "16:00", "17:00"],
      "Thursday": ["14:00", "15:00", "16:00"],
      "Saturday": ["09:00", "10:00", "11:00"]
    },
    reviews: [
      { id: 'r5', studentName: 'Kyle R.', rating: 5, comment: 'Helped me structure my essays perfectly.', date: '2023-10-20' }
    ]
  },
  {
    id: 't4',
    name: 'Sarah Pillay',
    email: 'sarah@tutorconnect.sa',
    role: UserRole.TEACHER,
    avatar: 'https://picsum.photos/id/106/200/200',
    subjects: ['Life Sciences', 'Geography'],
    grades: ['Grade 10', 'Grade 11'],
    hourlyRate: 220,
    bio: 'Biology enthusiast making Life Sciences fun and interactive using visual aids. I believe in hands-on learning.',
    rating: 5.0,
    reviewsCount: 32,
    isOnline: true,
    verified: true,
    balance: 2100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    qualifications: [
      "B.Sc Life Sciences (UKZN)",
      "PGCE Senior Phase & FET"
    ],
    requirements: [
      "Stable Internet",
      "Whiteboard or iPad for diagrams",
      "Quiet Environment"
    ],
    availability: {
      "Monday": ["16:00", "17:00"],
      "Wednesday": ["16:00", "17:00"],
      "Friday": ["15:00", "16:00"],
      "Saturday": ["10:00", "11:00"]
    },
    reviews: [
      { id: 'r6', studentName: 'Priya N.', rating: 5, comment: 'Love the diagrams and explanations.', date: '2023-09-30' }
    ]
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
    date: new Date().toISOString(), // Today
    time: '14:00',
    duration: 1,
    tutorFee: 250,
    platformFee: 30,
    totalPaid: 280,
    status: 'upcoming',
    meetLink: 'room-123'
  },
  {
    id: 'b2',
    teacherId: 't2',
    studentId: 's1',
    teacherName: 'Johan Van Der Merwe',
    studentName: 'Student User',
    subject: 'Accounting',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    time: '16:00',
    duration: 1,
    tutorFee: 200,
    platformFee: 30,
    totalPaid: 230,
    status: 'completed'
  }
];
