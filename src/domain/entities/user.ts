export class User {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;

  constructor(attributes: User.Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.username = attributes.username;
    this.email = attributes.email;
  }
}

export namespace User {
  export type Attributes = {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}