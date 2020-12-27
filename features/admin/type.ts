import { UserInfo } from '../user/type';

export interface AdminState {
  reports: ReportInfo[] | null;
  reportsTotal: number;
  users: UserInfo[] | [];
  usersTotal: number;
}

export interface ReportInfo {
  reportId: number;
  reportUserId: number;
  reportedUserId: number;
  reportUserEmail: string;
  reportedUserEmail: string;
  reportContent: string;
  reportedDate: string;
}
