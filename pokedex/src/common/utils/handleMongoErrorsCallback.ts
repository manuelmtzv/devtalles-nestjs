import { MongoError } from 'mongodb';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

type HandleMongoErrorsCallbackOptions = {
  internalErrorMessage?: string;
  duplicateRecordErrorMessage?: string;
};

export async function handleMongoErrorsCallback<T>(
  callback: () => Promise<T>,
  {
    internalErrorMessage = 'We found an error while processing your request. Check the logs for more information.',
    duplicateRecordErrorMessage = 'Record already exists in the database',
  }: HandleMongoErrorsCallbackOptions = {},
): Promise<T> {
  try {
    return await callback();
  } catch (err) {
    if (err.code === 11000) {
      type MongoErrorWithKeyValue = MongoError & {
        keyValue: Record<string, string>;
      };

      const key = Object.keys((err as MongoErrorWithKeyValue).keyValue)[0];
      const value = (err as MongoErrorWithKeyValue).keyValue[key];

      throw new BadRequestException(
        `${duplicateRecordErrorMessage}. Key: ${key}, Value: ${value}`,
      );
    }

    console.error(err);

    throw new InternalServerErrorException(internalErrorMessage);
  }
}
