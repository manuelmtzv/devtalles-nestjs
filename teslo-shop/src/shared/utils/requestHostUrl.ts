import type { Request } from 'express';

type Options = {
  prefix?: string;
};

export const requestHostUrl = (req: Request, { prefix = '' }: Options) => {
  return `${req.protocol}://${req.get('Host')}/${prefix}`;
};
