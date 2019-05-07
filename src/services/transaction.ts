import Transaction from "../modals/Transaction";
import transactions from "../mocks/transactions";

export const getTransactionHistory = (email: string): Promise<Transaction[]> => {
  return new Promise((res) => {
    res(transactions);
  });
};

