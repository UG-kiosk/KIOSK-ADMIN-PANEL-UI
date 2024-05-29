interface Post {
  position: string;
  faculty: string[];
}

interface Content {
  tutorial: string;
  posts: Post[];
}

export interface Academic {
  _id?: string;
  name: string;
  link: string;
  email: string;
  content: Content;
}
