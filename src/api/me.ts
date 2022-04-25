import {UserInfoType} from "../nativeInterface/getUserProfile";
import * as request from "../util/requestClient";
import {getPlatformName} from "../util/platformType";
import {MeItemType} from "../typings";
import {put} from "../util/requestClient";

type MeInfoType = MeItemType
type UpdateMyPhoneNumberQueryType = {
  sign: string
  response: string
}

const updateMeInfo = async (meInfo: UserInfoType):Promise<MeInfoType> => {
  const platform = getPlatformName()

  return await request.put<MeInfoType>(`/socials/${platform}/me`, meInfo)
}

const getMeInfo = async (): Promise<MeInfoType> => {
  const platform = getPlatformName()

  return await request.get<MeInfoType>(`/socials/${platform}/me`)
}

const updateMyPhoneNumber = async (query: UpdateMyPhoneNumberQueryType ) => {
  return await put<MeInfoType>(`/socials/${getPlatformName()}/me/phoneNumber`, query)
}

export type {
  MeInfoType,
  UpdateMyPhoneNumberQueryType
}
export {
  getMeInfo,
  updateMeInfo,
  updateMyPhoneNumber
}
