import {post} from "../util/requestClient";

const createUploadToken =  async () => await post<{
  accessToken: string
  platForm: string
  prefixUrl: string
}>(`/uploadToken`)

const uploadBase64 = async (base64: string): Promise<string> => {
  return  await post<string>(`/bash64File`, {file: base64})
}

export {createUploadToken, uploadBase64}
