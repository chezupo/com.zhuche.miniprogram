import React from "preact/compat";
import taro from "@tarojs/taro";
import {useEffect, useState} from "preact/hooks";
import {Image, View} from "@tarojs/components";
import NotFound from "../../../components/NotFound";
// @ts-ignore
import style from './style.module.scss';
import SpinContainer from "../../../components/SpinContainer";
import {getViolations} from "../../../api/violations";

const NotFoundRender: React.FC = () => (
  <View className={style.notfound}>
    <NotFound
      title='您没有违章记录'
    />
  </View>
)
const ViolationPage: React.FC = () => {
  const [imageVisibleStr, setImageVisibleStr ] = useState<string | undefined>()
  const [data, setData] = useState<ViolationItemType[]>([])
  useEffect(() => {
    taro.showLoading({title: '加载中'})
    getViolations()
      .then(res => setData(res))
      .finally(() => taro.hideLoading())
  }, [])

  return (<>
    {
      !!imageVisibleStr && (
        <SpinContainer
          onClick={() => setImageVisibleStr(undefined)}
        >
          <Image src={imageVisibleStr} />
        </SpinContainer>
      )
    }

    <View className={style.main}>
      {data.length === 0 && ( <NotFoundRender /> )}
      {data.map(item => (
        <View className={style.itemWrapper} key={item.id}>
          <View className={style.rowWrapper}>
            <View>标&emsp;&emsp;题:</View>
            <View>{item.title}</View>
          </View>
          <View className={style.rowWrapper}>
            <View>说&emsp;&emsp;明:</View>
            <View>{item.description}</View>
          </View>
          <View className={style.rowWrapper}>
            <View>扣除费用:</View> <View>{item.amount}</View>
          </View>
          <View className={style.rowWrapper}>
            <View>图&emsp;&emsp;片:</View>
            <View>
              {
                item.images.map((image, i) => (
                    <Image
                      key={i}
                      mode='widthFix'
                      className={style.image}
                      onClick={() => setImageVisibleStr(image)}
                      src={image}
                    />
                  )
                )
              }
            </View>
          </View>
        </View>
      ))}
      {data.length > 0 && ( <View className={style.bottomWrapper}>-- 到底了 --</View> ) }
    </View>
  </>)
}

export default ViolationPage
