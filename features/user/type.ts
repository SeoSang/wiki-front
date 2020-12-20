import { FavoriteSubjectInfo } from '../subject/type';

export interface UserInfo {
  userId: number;
  email: string;
  password?: string;
  studentName: string;
  univName?: string;
  studentNumber: string;
  auth: number; // 1이 관리자, 2가 학생
}

export interface UserState {
  me: UserInfo | null;
  favorites: [] | FavoriteSubjectInfo[];
  loginLoading: boolean;
  isLogined: boolean;
  isRegistered: boolean;
  isDoubleCheckOK: boolean;
  pwCheckModalOpen: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  studentName: string;
  studentNumber: string;
  univName: string;
}

export interface posts {
  postId: number;
  userId: number;
  subjectId: number;
  title: string;
  text: string;
  createdAt: string;
}

export interface PageInfo {
  page: number;
  amount: number;
  start: number;
  end: number;
  currentPosts: posts[];
}

export interface boardContentInfo {
  updatedPostId: number;
}
