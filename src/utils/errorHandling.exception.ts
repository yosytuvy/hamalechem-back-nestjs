import { HttpException } from "@nestjs/common";

export class CustomException extends HttpException {
  constructor(message:string, code:number, optionalFields:object = {}) {
    super(message, code, {...optionalFields});
  }
}
