import store from "../reduxStore";

const imageKeyConvertFullURL = (key: string): string => {
  const config = store.getState().configuration.config
  return `${config.imgPrefix}/${key}`
}

export {imageKeyConvertFullURL}
