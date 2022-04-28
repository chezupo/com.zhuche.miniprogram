import React from "preact/compat";
import {View} from "@tarojs/components";
import NotFound from "../../../components/NotFound";

const DriverLicenceValidation: React.FC = () => {
  return (<View
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}
  >
    <NotFound
      title='请在取车时，与门店进行认证'
    />
  </View>)
}


export default DriverLicenceValidation
