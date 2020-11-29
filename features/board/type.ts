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

export interface BoardState {
  post: Post | null;
  posts: Post[] | null;
  isLoadingPost: boolean;
  isLoadingPosts: boolean;
}
