import React from "preact/compat";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import Icon from "../../../../components/Icon";
import {UserContactItemType} from "../../../../typings";

type ItemRenderPropsType = {
  value: UserContactItemType
  onEdit: (newValue: UserContactItemType) => void
  onDelete: () => void
}
const ItemRender: React.FC<ItemRenderPropsType> = props => {
  return (<>
    <View className={style.main}>
      <View className={style.leftWrapper}>
        <View className={style.item}>
          <View>姓名: </View><View>{props.value.name}</View>
        </View>
        <View className={style.item}>
          <View>电话: </View><View>{props.value.phone}</View>
        </View>
        <View className={style.item}>
          <View>关系: </View><View>{props.value.relation}</View>
        </View>
      </View>
      <View className={style.buttonWrapper}>
        <Icon
          value='edit'
          className={style.icon}
          onClick={() => props.onEdit(props.value)}
        />
      </View>
      <View
        className={[ style.buttonWrapper, style.deleteIcon].join(' ')}
        onClick={() => props.onDelete()}
      >
        <Icon value='delete' className={style.icon} />
      </View>
    </View>
  </>)
}

export default ItemRender
