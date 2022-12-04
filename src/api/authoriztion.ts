import { post } from "../util/requestClient";
import getPlatformType, { AllPlatformType } from "../util/platformType";
import ErrorHandle, { ErrorType } from "../config/ErrorHandle";
import { AccessTokenType } from "../store/module/me";

export const authorize = async (
  authorizationCode: string,
  pid?: number
): Promise<AccessTokenType> => {
  let platform = "";
  const currentPlayForm = getPlatformType();
  if (currentPlayForm === AllPlatformType.ALIPAY) {
    platform = AllPlatformType.ALIPAY;
  } else if (currentPlayForm === AllPlatformType.WECHAT) {
    platform = AllPlatformType.WECHAT;
  } else if (currentPlayForm === AllPlatformType.TT) {
    platform = AllPlatformType.TT;
  } else {
    throw new ErrorHandle(ErrorType.NOT_SUPPORT_PLATFORM);
  }
  const url = `/socials/${platform}/authorizations`;

  return await post<AccessTokenType>(url, {
    authorizationCode,
    pid
  });
};
