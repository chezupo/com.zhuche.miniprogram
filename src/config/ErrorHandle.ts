
export enum ErrorType {
  NOT_SUPPORT_PLATFORM= "Current client not support this actions." // 未支持的平台
}

export default class ErrorHandle extends Error {
  constructor(errorType: ErrorType, errorMessage?: string) {
    errorMessage = errorMessage ? errorMessage : errorType
    super(errorMessage);
  }
}

