import React from "preact/compat";
import {View} from "@tarojs/components";
import UploadIdCarFrontal from "../../../components/UploadIdCarFrontal";
import UploadIdCardBack from "../../../components/UploadIdCarBack";

const IdCarValidationPage: React.FC = () => {
  return (<View
    style={{
      height: '100vh',
    }}
  >
    <UploadIdCarFrontal />
    <UploadIdCardBack />
  </View>)
}


export default IdCarValidationPage
