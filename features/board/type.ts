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
  usersVO : Author | null;
}

export interface Author {
  auth: number,
  email: string,
  password: string,
  studentName: string,
  studentNumber: string,
  univName: string,
  userId: number
}

export interface AddPostFormData {
  userId: number;
  subjectId: number;
  categoryId: number;
  createDate: number;
  title: string;
  text: string;
}

export interface UpdatePostFormData {
  boardId : number;
  userId :number;
  title : string;
  text : string
}

export interface Comment {
  commentText: string;
  studentName : string;
  noticeDate: string;
  userId: number;
  boardId: number;
  commentId: number;
}

export interface AddCommentFormData {
  userId: number;
  boardId: number;
  commentText : string;
}