import React from "preact/compat";
import UploadLicense from "../UploadLicense";
import {useAppDispatch, useAppSelector} from "../../reduxStore";
import {uploadLicence} from "../../api/me";
import {uploadUserInfo} from "../../reduxStore/module/me";

const UploadDrvierLicense: React.FC = () => {
  const dispatch = useAppDispatch();
  const driverLicense = useAppSelector(state => state.me?.data?.driverLicense) || ''
  const handleChangeIdCardFrontal = async (newUrl: string) => {
    const res = await uploadLicence({driverLicense: newUrl})
    dispatch(uploadUserInfo(res))
  }
return (
  <UploadLicense
    icon='DriverLicense'
    remark='请上传驾驶证'
    url={driverLicense}
    onChange={handleChangeIdCardFrontal}
  />
  )
}

export default UploadDrvierLicense
