import React from "preact/compat";
import taro from "@tarojs/taro";
import { useState } from "preact/hooks";
import { Textarea, View } from "@tarojs/components";
import style from "./style.module.scss";
import Icon from "../../../../../components/Icon";
import { primaryThemeColor } from "../../../../../global";
import Button from "../../../../../components/Button";

export type SubmitType = {
  content: string;
  rate: number;
};
type StartRenderPropsType = {
  isEmpty?: boolean;
  onClick: () => void;
};
const StartRender: React.FC<StartRenderPropsType> = props => {
  const value = props.isEmpty ? "star-empty" : "start";
  return (
    <Icon
      onClick={() => props.onClick()}
      value={value}
      className={style.start}
      style={{ color: props.isEmpty ? "gray" : primaryThemeColor }}
    />
  );
};
type CommentRenderProType = {
  onSubmit: (value: SubmitType) => void;
  onCancel: () => void;
};
const CommentRender: React.FC<CommentRenderProType> = props => {
  const [rate, setRate] = useState<number>(5);
  const [content, setContent] = useState<string>("");
  const handleInput = e => {
    setContent(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    if (content.length === 0) {
      await taro.showToast({ title: "评价内容不能为空" });
      return;
    }
    props.onSubmit({ content, rate });
  };

  return (
    <>
      <View className={style.main}>
        <View className={style.title}>添加评价</View>
        <View className={style.container}>
          <Textarea
            value={content}
            onInput={handleInput}
            className={style.textArea}
            focus
            placeholder="请写下您的评价"
          />
          <View className={style.startWrapper}>
            <View className={style.rateTitle}>评分:</View>
            <View className={style.startWrapper}>
              {Array.from(Array(5)).map((_, i) => (
                <StartRender
                  isEmpty={i + 1 > rate}
                  key={i}
                  onClick={() => setRate(i + 1)}
                />
              ))}
            </View>
          </View>
          <View className={style.buttonWrapper}>
            <Button onClick={props.onCancel}>取消</Button>
            <Button type="primary" onClick={handleSubmit}>
              确定
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
export default CommentRender;
