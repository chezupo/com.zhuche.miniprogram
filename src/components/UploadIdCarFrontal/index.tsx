import React from "preact/compat";
import UploadLicense from "../UploadLicense";
import {useAppDispatch, useAppSelector} from "../../reduxStore";
import {uploadLicence} from "../../api/me";
import {uploadUserInfo} from "../../reduxStore/module/me";

const UploadIdCarFrontal: React.FC = () => {
  const dispatch = useAppDispatch();
  const idCardFrontal = useAppSelector(state => state.me?.data?.idCarFrontal) || ''
  const handleChangeIdCardFrontal = async (newUrl: string) => {
    const res = await uploadLicence({idCarFrontal: newUrl})
    dispatch(uploadUserInfo(res))
  }
return (
  <UploadLicense
    icon='idCardFrontal'
    remark='请上传身份证的正面'
    url={idCardFrontal}
    onChange={handleChangeIdCardFrontal}
  />
  )
}

export default UploadIdCarFrontal
