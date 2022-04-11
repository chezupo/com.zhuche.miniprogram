import {UserInfoType} from "../nativeInterface/getUserProfile";
import * as request from "../util/requestClient";
import {getPlatformName} from "../util/platformType";
import {MeItemType} from "../typings";

export type MeInfoType = MeItemType

export const updateMeInfo = async (meInfo: UserInfoType):Promise<MeInfoType> => {
  const platform = getPlatformName()

  return await request.put<MeInfoType>(`/socials/${platform}/me`, meInfo)
}

export const getMeInfo = async (): Promise<MeInfoType> => {
  const platform = getPlatformName()

  return await request.get<MeInfoType>(`/socials/${platform}/me`)
}
