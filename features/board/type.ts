export interface BoardState {
  post: Post | null;
  posts: Post[] | null;
  isLoadingPost: boolean;
  isLoadingPosts: boolean;
  addingPostSuccess: boolean;
  addingCommentSuccess: boolean;
  updatingPostSuccess: boolean;
  comments: Comment[];
  page : number;
  total : number;
}
export interface Post {
  boardId: number;
  userId: number;
  subjectId: number;
  categoryId: number;
  title: string;
  text: string;
  createDate: Date;
  updateDate: Date;
  hitNum: number;
}
export interface AddPostFormData {
  userId: number;
  subjectId: number;
  categoryId: number;
  createDate  : number;
  title: string;
  text: string;
}
export interface Comment {
  commentId: number;
  boardId: number;
  userId: number;
  subjectId: number;
  noticeDate: string;
  commentText: string;
}
