export interface ICodeSubmitResult {
  status: StatusTypeEnum;
  obtainedCode?: string;
  errorMessage?: string;
}

export interface IServerResponse {
  status: StatusTypeEnum;
  code?: string;
}

export enum StatusTypeEnum {
  ok = "ok",
  error = "error",
  alreadyUsed = "alreadyUsed",
}
