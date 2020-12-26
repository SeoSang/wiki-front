import { Post } from '../board/type';

export interface EtcState {
  pwCheckModalOpen: boolean;
  reportPostModalOpen: boolean;
  notices: null | Post[];
}
