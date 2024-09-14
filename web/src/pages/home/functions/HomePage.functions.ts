import {
  ICodeSubmitResult,
  IServerResponse,
  StatusTypeEnum,
} from "../interfaces/HomePage.interfaces";

export const defaultErrorMessage =
  "This code is not valid. If you want to obtain a valid code, make sure to subscribe and turn on notifications!";
export const codeAlreadyUsedErrorMessage =
  "Awww snap! The code was already used by someone else! Want new codes? Make sure to subscribe and turn on notifications!";
export const defaultResponse: ICodeSubmitResult = {
  status: StatusTypeEnum.error,
  errorMessage: defaultErrorMessage,
};
export const alreadyUsedResponse: ICodeSubmitResult = {
  status: StatusTypeEnum.alreadyUsed,
  errorMessage: codeAlreadyUsedErrorMessage,
};

export async function checkCodeValidity(
  code: String | null
): Promise<ICodeSubmitResult> {
  try {
    const response = await fetch("your-server-url-here.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: code }),
    });

    if (response.status !== 200) {
      return defaultResponse;
    }

    const result: IServerResponse = await response.json();
    const currentStatus = mapServerStatusToEnum(result.status);
    if (currentStatus === StatusTypeEnum.ok) {
      return {
        status: StatusTypeEnum.ok,
        obtainedCode: result.code,
      };
    } else if (currentStatus === StatusTypeEnum.alreadyUsed) {
      return alreadyUsedResponse;
    }
  } catch (error) {}
  return defaultResponse;
}

export const mapServerStatusToEnum = (status: string): StatusTypeEnum => {
  switch (status) {
    case "ok":
      return StatusTypeEnum.ok;
    case "error":
      return StatusTypeEnum.error;
    case "alreadyUsed":
      return StatusTypeEnum.alreadyUsed;
    default:
      return StatusTypeEnum.error;
  }
};
