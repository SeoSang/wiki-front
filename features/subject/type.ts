export interface SubjectInfo {
  subjectId: number;
  subjectName: string;
  iconName?: string;
  professor: string;
  year?: number;
  semester?: number;
}

export interface FavoriteSubjectInfo extends SubjectInfo {
  favSubjectId: number; //PK
  userId: number; //FK
}

export interface SubjectState {
  subjects: SubjectInfo[];
  subject: SubjectInfo | null;
  isLoadingSubjects: boolean;
  isSearchingSubjects: boolean;
  loadingSubjectsSuccess: boolean;
  searchingSubjectsSuccess: boolean;
}

export interface AddSubjectFormData {
  subjectName: string,
	professor: string,
	year: number,
	semester: number
}