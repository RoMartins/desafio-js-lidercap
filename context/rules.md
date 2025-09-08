## EXEMPLO CONTROLLER

export class GetPostCommentsController {
public handle(req: Request, res: Response): void {
const postId = parseInt(req.params.postId);
service.getPostComments(postId, (error, comments) => {
if (error) {
return res.status(404).json({ error: error });
}
res.json(comments);
});
}
}

## EXEMPLO ENTIDADE DE CLASSE

export class Account {
readonly id: string;
readonly email: string;
externalId: string | undefined;
createdAt: Date;

constructor(attributes: Account.Attributes) {
this.id = attributes.id ?? KSUID.randomSync().string;
this.email = attributes.email;
this.externalId = attributes.externalId;
this.createdAt = attributes.createdAt ?? new Date();
}
}

export namespace Account {
export type Attributes = {
email: string;
externalId?: string;
id?: string;
createdAt?: Date;
};
}
