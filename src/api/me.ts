import {UserInfoType} from "../nativeInterface/getUserProfile";
import * as request from "../util/requestClient";
import {getPlatformName} from "../util/platformType";
import {get, put} from "../util/requestClient";

type MeInfoType = MeItemType
type UpdateMyPhoneNumberQueryType = {
  sign: string
  response: string
}

type UploadLicenceType = {
  idCarFrontal?: string
  idCarBack?: string
  driverLicense?: string
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

const getMyQr = async () => {
  return await get<string>(`/QR`)
}

const uploadLicence = async (data: UploadLicenceType) => await put<MeInfoType>(`/me/license`, data)

export type {
  MeInfoType,
  UpdateMyPhoneNumberQueryType
}
export {
  getMeInfo,
  updateMeInfo,
  updateMyPhoneNumber,
  getMyQr,
  uploadLicence
}
