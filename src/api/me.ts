import {UserInfoType} from "../nativeInterface/getUserProfile";
import * as request from "../util/requestClient";
import {getPlatformName} from "../util/platformType";

export type MeInfoType = {
 id: number
  isNewUser: boolean
} & UserInfoType

export const updateMeInfo = async (meInfo: UserInfoType):Promise<MeInfoType> => {
  const platform = getPlatformName()

  return await request.put<MeInfoType>(`/socials/${platform}/me`, meInfo)
}

export const getMeInfo = async (): Promise<MeInfoType> => {
  const platform = getPlatformName()

  return await request.get<MeInfoType>(`/socials/${platform}/me`)
}
