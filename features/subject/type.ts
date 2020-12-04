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

export interface SubjectState {
  subjects: SubjectInfo[];
  subject: SubjectInfo | null;
  isLoadingSubjects: boolean;
  loadingSubjectsSuccess: boolean;
}
