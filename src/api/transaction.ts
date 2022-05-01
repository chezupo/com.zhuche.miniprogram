import {get} from "../util/requestClient";
import {TransactionItemType} from "../typings";

const getTransaction = async () => await get<TransactionItemType[]>(`/transaction`);

export {getTransaction}
