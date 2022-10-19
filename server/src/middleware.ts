import { Request, Response, NextFunction } from 'express';

export class ValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ValidationError';

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
