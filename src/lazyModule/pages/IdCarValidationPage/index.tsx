import React from "preact/compat";
import {View} from "@tarojs/components";
import NotFound from "../../../components/NotFound";

const IdCarValidationPage: React.FC = () => {
  return (<View
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <NotFound
      title='请在取车时，与门店进行认证'
    />
  </View>)
}


export default IdCarValidationPage
