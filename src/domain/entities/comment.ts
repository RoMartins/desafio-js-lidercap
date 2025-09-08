export class Comment {
  readonly id: number;
  readonly postId: number;
  readonly name: string;
  readonly email: string;
  readonly body: string;

  constructor(attributes: Comment.Attributes) {
    this.id = attributes.id;
    this.postId = attributes.postId;
    this.name = attributes.name;
    this.email = attributes.email;
    this.body = attributes.body;
  }
}

export namespace Comment {
  export type Attributes = {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
  };
}