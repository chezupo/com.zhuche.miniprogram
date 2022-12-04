import React from "react";
import ContainerWithButtons from "../components/ContainerWithButtons";
import ItemContainer from "../components/ItemContainer/ItemContainer";
import ItemRender from "../components/ItemRender";
import style from "./style.module.scss";

const MoreRender: React.FC = () => {
  return (
    <ContainerWithButtons className={style.main}>
      <ItemContainer title="车辆配置" className={style.containerWrapper}>
        <ItemRender title="倒车雷达" isActive={false} />
        <ItemRender title="倒车雷达" isActive={false} />
        <ItemRender title="倒车雷达" isActive={false} />
        <ItemRender title="倒车雷达" isActive={false} />
        <ItemRender title="倒车雷达" isActive={false} />
      </ItemContainer>
      <ItemContainer title="动力类型" className={style.containerWrapper}>
        <ItemRender title="汽油" isActive={false} />
        <ItemRender title="油电混合" isActive={false} />
        <ItemRender title="纯电动" isActive={false} />
      </ItemContainer>
      <ItemContainer title="自助" className={style.selfContainerWrapper}>
        <ItemRender title="可自助取还" isActive={false} />
        <ItemRender title="非自助取还" isActive={false} />
      </ItemContainer>
    </ContainerWithButtons>
  );
};

export default MoreRender;
