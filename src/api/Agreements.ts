import {AgreementItemType} from "../typings";
import {get} from "../util/requestClient";

const getCheckoutOrderAgreements = async (): Promise<AgreementItemType[]> => {
  return await get<AgreementItemType[]>(`/agreements/checkoutOrderAgreements`)
}

export {getCheckoutOrderAgreements}



