import { Request } from 'express';

export interface AppRequest extends Request {
  user?: any;
  authorized?: boolean;
}
