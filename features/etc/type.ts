import { Post } from '../board/type';

export interface EtcState {
  pwCheckModalOpen: boolean;
  reportPostModalOpen: boolean;
  IconNameModalOpen: boolean;
  notices: null | Post[];
}
