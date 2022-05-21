import React from "preact/compat";
import {useState} from "preact/hooks";
import taro from "@tarojs/taro";
import {Image, View} from "@tarojs/components";
import Icon, {IconType} from "../Icon";
// @ts-ignore
import style from './style.module.scss';
import {uploadBase64} from "../../api/upload";

type UploadLicensePropsType = {
  url: string
  onChange: (url: string) => void
  remark: string
  icon: IconType
}
const UploadLicense: React.FC<UploadLicensePropsType> = ({url,  onChange, ...props}) => {
  const [loading, setLoading]  = useState<boolean>(false)
  const handleChooseImage = async () => {
    setLoading(true)
    try {
      const {tempFilePaths} = await taro.chooseImage({count: 1 })
      const path = tempFilePaths[0];
      const getFile = (): Promise<string> => new Promise<string>(resolve => {
        taro.getFileSystemManager().readFile({
          encoding: 'base64',
          filePath: path,
          success: res => {
            resolve(res.data as  string)
          }
        })
      })
      const file = await getFile();
      onChange( await uploadBase64(file) )
    } finally {
      setLoading(false)
    }
  }
  return (
    <View
      className={style.main}
      onClick={handleChooseImage}
    >
      <View className={style.container}>
        {!url && (
          <>
            <Icon value={props.icon} className={style.icon} />
            <View className={style.notice}>{props.remark}</View>
          </>
        )}
        { !!url && <Image src={url} mode='scaleToFill' className={style.image} /> }
      </View>
      <View className={style.button}>
        <View>
          {
            !url ? '上传' : '修改'
          }
        </View>
      </View>
      {
        loading && (
          <View className={style.loadingWrapper}>
            <View>上传中...</View>
          </View>
        )
      }
    </View>
  )
}

export default UploadLicense
