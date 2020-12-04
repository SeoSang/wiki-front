export interface SubjectInfo {
  subjectId: string;
  subjectName: string;
  icon_name: string;
  professor: string;
  year: number;
  semester: number;
}

export interface FavoriteSubjectInfo extends SubjectInfo {
  fav_subject_id: number; //PK
  user_id: number; //FK
}

export interface SubjectState {
  subjects: SubjectInfo[];
  subject: SubjectInfo | null;
  isLoadingSubjects: boolean;
  isSearchingSubjects: boolean;
  loadingSubjectsSuccess: boolean;
  searchingSubjectsSuccess: boolean;
}
