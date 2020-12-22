export interface AdminState {
  reports: ReportInfo[] | [];
}

export interface ReportInfo {
  reportId: number;
  reportUserId: number;
  reportedUserId: number;
  reportContent: string;
  reportedDate: string;
}
