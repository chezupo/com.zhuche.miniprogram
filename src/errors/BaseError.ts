export enum ErrorTypes {
  GQLError,
  USER_AUTH_REJECT
}

export default class BaseError extends Error{
  public errorType: ErrorTypes;

  constructor(props: {message: string; errorType: ErrorTypes}) {
    super(props.message);
    this.errorType = props.errorType
  }
}
