import {
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { DatabaseError } from 'pg';
import { QueryFailedError } from 'typeorm';

function validateDatabaseError(
  err: any,
): QueryFailedError<DatabaseError> | undefined {
  if (err instanceof QueryFailedError) {
    return err;
  }
  return undefined;
}

export const handleDbException = (unknownError: any, logger?: Logger) => {
  const error = validateDatabaseError(unknownError);

  if (!error) {
    if (logger) {
      logger.error(error || unknownError);
    }

    throw new InternalServerErrorException(
      'Unexpected error occurred. Please try again later.',
    );
  }

  if (error.driverError.code === '23505') {
    throw new BadRequestException(error.message);
  }
};
