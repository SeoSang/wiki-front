export interface BoardState {
  post: Post | null;
  posts: Post[] | null;
  isLoadingPost: boolean;
  isLoadingPosts: boolean;
  addingPostSuccess: boolean;
  addingCommentSuccess: boolean;
  updatingPostSuccess: boolean;
  comments: Comment[];
}
export interface Post {
  postId: number;
  userId: number;
  subjectId: number;
  categoryId: number;
  title: string;
  text: string;
  createDate: Date;
  updateDate: Date;
  hitnum: number;
}
export interface AddPostFormData {
  userId: number;
  subjectId: number;
  categoryId: number;
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
