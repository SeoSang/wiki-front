export interface UserInfo {
  userId: number;
  email: string;
  password?: string;
  studentName: string;
  univName?: string;
  studentNumber: string;
  auth: number; // 1이 관리자, 2가 학생
}

export interface SubjectInfo {
  subject_id: string;
  subject_name: string;
  icon_name: string;
  professor: string;
}

export interface FavoriteSubjectInfo extends SubjectInfo {
  fav_subject_id: number; //PK
  user_id: number; //FK
}

export interface UserState {
  me: UserInfo | null;
  favorites: [] | FavoriteSubjectInfo[];
  loginLoading: boolean;
  isLogined: boolean;
  isRegistered: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  studentName: string;
  studentNumber: string;
  univName: string;
}
