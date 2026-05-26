// src/types/index.ts

export interface CollegeFees {
  min: number;
  max: number;
  ug: number;
  pg: number;
}

export interface CollegePlacements {
  avgPackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string[];
}

export interface CourseItem {
  name: string;
  duration: string;
  seats: number;
  fees: number;
}

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  type: string;
  category: string;
  rating: number;
  totalReviews: number;
  established: number;
  totalStudents: number;
  fees: CollegeFees;
  placements: CollegePlacements;
  courses: CourseItem[];
  about: string;
  facilities: string[];
  rankingNIRF: number | null;
  rankingQS: number | null;
  imageUrl: string | null;
  websiteUrl: string | null;
  isSaved?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  collegeId: string;
  rating: number;
  title: string;
  content: string;
  pros: string | null;
  cons: string | null;
  batch: number | null;
  course: string | null;
  createdAt: string;
  user: {
    name: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
