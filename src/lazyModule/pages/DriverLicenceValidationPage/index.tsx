import React from "preact/compat";
import {View} from "@tarojs/components";
import NotFound from "../../../components/NotFound";
import UploadDriverLicense from "../../../components/UploadDriverLicense";

const DriverLicenceValidation: React.FC = () => {
  return (<View >
    <UploadDriverLicense />
  </View>)
}


export default DriverLicenceValidation
