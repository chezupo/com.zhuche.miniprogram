import { View } from "@tarojs/components";
import React from "preact/compat";
import Button from "../../../../components/Button";
import style from "../style.module.scss";

type ButtonRenderPropsType = {
  onClick: () => void;
};
const ButtonRender: React.FC<ButtonRenderPropsType> = props => {
  return (
    <>
      <View className={style.bottomWrapper}>
        <Button type="primary" className={style.button} onClick={props.onClick}>
          新增
        </Button>
      </View>
    </>
  );
};

export default ButtonRender;
