import ErrorTypes from "./errorTypes";


export default class GQLError extends Error{
  public errorType: ErrorTypes;
  constructor(props) {
    super(props);
    this.errorType = ErrorTypes.GQLError
  }
}
