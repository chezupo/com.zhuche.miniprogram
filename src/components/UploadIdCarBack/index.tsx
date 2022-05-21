import React from "preact/compat";
import UploadLicense from "../UploadLicense";
import {useAppDispatch, useAppSelector} from "../../reduxStore";
import {uploadLicence} from "../../api/me";
import {uploadUserInfo} from "../../reduxStore/module/me";

const UploadIdCardBack: React.FC = () => {
  const dispatch = useAppDispatch();
  const idCardBack = useAppSelector(state => state.me?.data?.idCarBack) || ''
  const handleChangeIdCardFrontal = async (newUrl: string) => {
    const res = await uploadLicence({idCarBack: newUrl})
    dispatch(uploadUserInfo(res))
  }
return (
  <UploadLicense
    icon='backOfIdCard'
    remark='请上传身份证的背面'
    url={idCardBack}
    onChange={handleChangeIdCardFrontal}
  />
  )
}

export default UploadIdCardBack
