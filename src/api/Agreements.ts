import {get} from "../util/requestClient";

const getCheckoutOrderAgreements = async (): Promise<AgreementItemType[]> => {
  return await get<AgreementItemType[]>(`/agreements/checkoutOrderAgreements`)
}

/**
 * 获取登录的说明协议
 */
const getLoginAgreements = async (): Promise<AgreementItemType[]> => {
  return await get<AgreementItemType[]>(`/agreements/loginAgreements`)
}

/***
 * 获取协议详情
 * @param id
 */
const getAgreementDetail = async (id: number) => await get<AgreementItemType>(`/agreements/${id}`)

export {
  getCheckoutOrderAgreements,
  getLoginAgreements,
  getAgreementDetail
}



