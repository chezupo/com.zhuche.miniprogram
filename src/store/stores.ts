import SubscriptionBuilder from "../util/SubscriptionBuilder";

type PopularAttractionType = {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export const popularAttractionsObserve = new SubscriptionBuilder<PopularAttractionType[]>([
  {id: 1, name: '橘子洲头', lat: 1, lng: 1},
  {id: 2, name: '岳麓山', lat: 1, lng: 1},
  {id: 3, name: '世界之窗', lat: 1, lng: 1},
  {id: 4, name: '湖南博物馆', lat: 1, lng: 1},
  {id: 5, name: '烈士公园', lat: 1, lng: 1},
  {id: 6, name: '电影小镇', lat: 1, lng: 1},
])
