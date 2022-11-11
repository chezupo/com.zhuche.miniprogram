import React from "preact/compat";
import UploadLicense from "../UploadLicense";
import {useAppDispatch, useAppSelector} from "../../reduxStore";
import {uploadLicence} from "../../api/me";
import {uploadIdCarBack, uploadIdCarFrontal, uploadUserInfo} from "../../reduxStore/module/me";

const UploadIdCarFrontal: React.FC = () => {
  const dispatch = useAppDispatch();
  const idCardFrontal = useAppSelector(state => state.me?.data?.idCarFrontal) || ''
  const handleChangeIdCardFrontal = async (newUrl: string) => {
    await uploadLicence({idCarFrontal: newUrl})
    dispatch(uploadIdCarFrontal(newUrl));
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
