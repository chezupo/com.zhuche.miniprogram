import store from "../reduxStore";

const imageKeyConvertFullURL = (key: string): string => {
  const config = store.getState().configuration.config
  return `${config.imgPrefix}/${key}`
}

const loadImage = (value: HTMLImageElement): Promise<void> => new Promise(resolve => value.onload = () => resolve() )

export {imageKeyConvertFullURL, loadImage}
