import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {useState} from "react";

type Itemype = {id:number; name: string }
const OrderRender = (): React.ReactElement => {
  const [activeId, setActiveId] = useState<number>(null)
  const items: Itemype[] = [
    {id: 1, name: '默认排序'},
    {id: 2, name: '价格从低到高'},
    {id: 3, name: '价格从高到低'},
  ]
  const handleSelectItem = (item: Itemype) => setActiveId(item.id)

  return (<View className={style.main}>
    {
      items.map(item => (
        <View
          key={item.id}
          className={[style.itemWrapper, activeId === item.id ? style.active : ''].join(' ')}
          onClick={() => handleSelectItem(item)}
        >
          <View>
            {item.name}
          </View>
          <View className='at-icon at-icon-check'></View>
        </View>
      ))
    }
  </View>)
}

export default OrderRender
