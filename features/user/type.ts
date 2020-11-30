export interface UserInfo {
  userId: number;
  email: string;
  password?: string;
  studentName: string;
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
}

export interface posts{
  postId : number,
  userId : number,
  subjectId : number,
  title : string,
  text : string,
  createdAt : string,   
}

export interface PageInfo {
  page : number,
  amount : number,
  start : number,
  end : number,
  currentPosts : posts[]
}

export interface boardContentInfo {
  updatedPostId : number
}