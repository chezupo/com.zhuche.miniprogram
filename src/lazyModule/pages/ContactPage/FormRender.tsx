import React from "preact/compat";
import { Input, View } from "@tarojs/components";
import taro from "@tarojs/taro";
import SpinContainer from "../../../components/SpinContainer";
import Button from "../../../components/Button";
import style from "./style.module.scss";

export type FormValueType = Omit<UserContactItemType, "id">;

type FormPropsType = {
  value: FormValueType;
  onChange: (newValue: FormValueType) => void;
  onSubmit: (newValue: FormValueType) => void;
  onCancel: () => void;
};
const FormRender: React.FC<FormPropsType> = props => {
  const handleSubmit = async () => {
    if (props.value.name.length === 0) {
      await taro.showToast({ title: "名字不能为空" });
      return;
    }
    if (props.value.phone.length === 0) {
      await taro.showToast({ title: "手机不能为空" });
      return;
    }
    if (props.value.relation.length === 0) {
      await taro.showToast({ title: "关系不能为空" });
      return;
    }
    props.onSubmit(props.value);
  };
  const handleChangeName = e => {
    props.onChange({
      ...props.value,
      name: e.currentTarget.value
    });
  };
  const handleChangePhone = e => {
    props.onChange({
      ...props.value,
      phone: e.currentTarget.value
    });
  };
  const handleChangeRelation = e => {
    props.onChange({
      ...props.value,
      relation: e.currentTarget.value
    });
  };

  return (
    <SpinContainer>
      <View className={style.formWrapper}>
        <View className={style.form}>
          <View className={style.formItem}>
            <View>姓名:</View>
            <Input
              className={style.input}
              value={props.value.name}
              onInput={handleChangeName}
            />
          </View>
          <View className={style.formItem}>
            <View>电话:</View>
            <Input
              className={style.input}
              value={props.value.phone + ""}
              type="number"
              onInput={handleChangePhone}
            />
          </View>
          <View className={style.formItem}>
            <View>关系:</View>
            <Input
              value={props.value.relation}
              className={style.input}
              onInput={handleChangeRelation}
            />
          </View>
        </View>
        <View className={style.buttonWrapper}>
          <Button onClick={() => props.onCancel()}>取消</Button>
          <Button type="primary" onClick={() => handleSubmit()}>
            确定
          </Button>
        </View>
      </View>
    </SpinContainer>
  );
};

export default FormRender;
