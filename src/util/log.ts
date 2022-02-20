export default class log {
  static info(message:  string |  Object, data?: Object) {
    if (process.env.NODE_ENV === 'development') {
      data ? console.log(message, data) : console.log(message)
    }
  }
}

