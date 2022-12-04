import * as React from "react";
import { useState } from "react";
import taro from "@tarojs/taro";
import { Input, Textarea, View } from "@tarojs/components";
import style from "./style.module.scss";
import CarContainer from "./CarContainer";
import ServicePhone from "./ServicePhone";
import { createFeedback, CreateFeedbackQueryType } from "../../../api/feedback";
import Loading from "../../../components/Loading";
import { navigateToHome } from "../../../store/module/router";

const ComplaintFeedback = (): React.ReactElement => {
  const tags: { id: number; name: string }[] = [
    { id: 1, name: "自驾租车订单" },
    { id: 2, name: "门店/车辆相关" },
    { id: 3, name: "押金相关" },
    { id: 4, name: "违章相关" },
    { id: 5, name: "发票相关" },
    { id: 6, name: "软件相关" },
    { id: 7, name: "自驾游相关" },
    { id: 8, name: "其它" }
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CreateFeedbackQueryType>({
    content: "",
    flag: "",
    phone: "",
    email: ""
  });
  const handleChangePhone = e =>
    setData(() => ({ ...data, phone: e.currentTarget.value }));
  const handleChangeEmail = e =>
    setData(() => ({ ...data, email: e.currentTarget.value }));
  const handleChangeContent = e =>
    setData(() => ({ ...data, content: e.currentTarget.value }));
  const handleSubmit = async () => {
    if (data.content.length === 0) {
      await taro.showToast({ title: "请输入评论内容" });
      return;
    }
    if (data.flag.length === 0) {
      await taro.showToast({ title: "请选择问题的类型" });
      return;
    }
    if (!data.phone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
      await taro.showToast({ title: "请输入正确的手机号" });
      return;
    }
    setLoading(true);
    try {
      await createFeedback(data);
      await taro.showToast({ title: "提交成功" });
      navigateToHome();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <View className={style.main}>
        <CarContainer name="选择问题反馈类型(必填)">
          <>
            {tags.map((tag, key) => (
              <View
                className={[
                  style.button,
                  tag.name === data.flag ? style.activeTag : ""
                ].join(" ")}
                onClick={() => setData(() => ({ ...data, flag: tag.name }))}
                key={key}
              >
                {tag.name}
              </View>
            ))}
          </>
        </CarContainer>
        <CarContainer name="问题意见描述(必填)">
          <View className={style.textAreaWrapper}>
            <Textarea
              focus
              value={data.content}
              placeholder="请输入您的反馈意见或问题描述，以便我们能更好的帮助您解决问题"
              className={style.textArea}
              onInput={handleChangeContent}
            />
          </View>
        </CarContainer>

        <CarContainer name="联系方式">
          <View className={style.contactWrapper}>
            <Input
              className={style.contactItem}
              name="phone"
              placeholder="请输入手机号"
              onInput={handleChangePhone}
            />
            <Input
              className={style.contactItem}
              name="email"
              onInput={handleChangeEmail}
              placeholder="请输入邮箱(选填)"
            />
          </View>
        </CarContainer>
        <ServicePhone />
        <View className={style.buttonWrapper}>
          <View className={style.submitButton} onClick={handleSubmit}>
            提交
          </View>
        </View>
      </View>
    </>
  );
};

export default ComplaintFeedback;
