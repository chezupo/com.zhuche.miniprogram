import * as request  from "../util/requestClient";
import {BannerListType} from "../store/module/banner";

export const getBanners = async () => await request.get<BannerListType>("/banners")
