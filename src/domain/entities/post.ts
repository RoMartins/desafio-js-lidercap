export class Post {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly body: string;

  constructor(attributes: Post.Attributes) {
    this.id = attributes.id;
    this.userId = attributes.userId;
    this.title = attributes.title;
    this.body = attributes.body;
  }
}

export namespace Post {
  export type Attributes = {
    id: number;
    userId: number;
    title: string;
    body: string;
  };
}