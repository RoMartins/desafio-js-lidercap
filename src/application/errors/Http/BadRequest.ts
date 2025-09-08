import { ErrorCode } from '../ErrorCode';
import { HttpError } from './HttpError';

export class BadRequest extends HttpError {
  override statusCode: number;
  override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.statusCode = 400;
    this.name = 'BadRequest';
    this.code = code ?? ErrorCode.BAD_REQUEST;
    this.message = message ?? 'Bad Request';
  }
}
