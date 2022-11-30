import {get} from "../util/requestClient";

const getTransaction = async () => await get<TransactionItemType[]>(`/transaction`);

export {getTransaction}
