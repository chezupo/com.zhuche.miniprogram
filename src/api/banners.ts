import * as request  from "../util/requestClient";
import {BannerType} from "../store/banner";

export const getBanners = async () => await request.get<BannerType[]>("/banners")
