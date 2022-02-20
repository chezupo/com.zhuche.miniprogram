import SubscriptionBuilder from "../../util/SubscriptionBuilder";
import {getConfiguration} from "../../api/configuration";

export type ConfigurationType = {
  imgPrefix: string
}

export const ConfigurationObserve = SubscriptionBuilder.initCallBack<ConfigurationType>({imgPrefix: ''}, async ():Promise<ConfigurationType> => {
  return await getConfiguration()
})
