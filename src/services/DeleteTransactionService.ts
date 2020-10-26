import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    const checkTransaction = await transactionsRepository.findOne({
      where: { id: transaction_id },
    });

    if (!checkTransaction) {
      throw new AppError('transaction does not exists');
    }

    await transactionsRepository.delete(transaction_id);
  }
}

export default DeleteTransactionService;
