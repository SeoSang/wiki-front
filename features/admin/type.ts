import { UserInfo } from '../user/type';

export interface AdminState {
  reports: ReportInfo[] | [];
  reportsTotal: number;
  users: UserInfo[] | [];
  usersTotal: number;
}

export interface ReportInfo {
  reportId: number;
  reportUserId: number;
  reportedUserId: number;
  reportContent: string;
  reportedDate: string;
}
