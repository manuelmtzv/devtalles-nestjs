import { Repository } from 'typeorm';
import { handleDbException } from './handleDbException';

export async function deleteAllRows<T>(repository: Repository<T>) {
  const query = repository.createQueryBuilder();

  try {
    return await query.delete().where({}).execute();
  } catch (err) {
    handleDbException(err);
  }
}
