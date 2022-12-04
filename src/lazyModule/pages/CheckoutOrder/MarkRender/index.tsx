import React from "react";
import { Textarea, View } from "@tarojs/components";
import Container from "../components";
import style from "../DepositRender/style.module.scss";

type RemarkRenderPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};
const RemarkRender: React.FC<RemarkRenderPropsType> = props => {
  return (
    <Container className={style.main}>
      <View className={style.title}>备注</View>
      <View className={style.itemWrapper}>
        <Textarea
          placeholder="如果您有额外的要求，请在这里写下来"
          value={props.value}
          onInput={e => props.onChange(e.detail.value)}
        />
      </View>
    </Container>
  );
};

export default RemarkRender;
