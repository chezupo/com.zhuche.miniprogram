import {ConfigurationType} from "../store/module/configuration";
import * as request from "../util/requestClient";

// 获取配置
export const getConfiguration = async (): Promise<ConfigurationType> => await request.get<ConfigurationType>("/configurations")
