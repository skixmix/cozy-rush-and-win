import {
  ICodeSubmitResult,
  StatusTypeEnum,
} from "../interfaces/HomePage.interfaces";
import {
  checkCodeValidity,
  codeAlreadyUsedErrorMessage,
  defaultErrorMessage,
} from "./HomePage.functions";

describe("checkCodeValidity", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockReset();
  });

  it("should return a valid code when server response is OK", async () => {
    const expectedResult = "TEST!";

    jest.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "ok", code: expectedResult }), {
        status: 200,
      })
    );

    const result: ICodeSubmitResult = await checkCodeValidity("someCode");
    expect(result.status).toBe(StatusTypeEnum.ok);
    expect(result.obtainedCode).toBe(expectedResult);
  });

  it("should return a default error response when server returns a non-200 status", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 500 }));

    const result: ICodeSubmitResult = await checkCodeValidity("someCode");
    expect(result.status).toBe(StatusTypeEnum.error);
    expect(result.errorMessage).toBe(defaultErrorMessage);
  });

  it("should return the already used error response when server response says already used code", async () => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ status: "alreadyUsed" }), { status: 200 })
      );

    const result: ICodeSubmitResult = await checkCodeValidity("someCode");
    expect(result.status).toBe(StatusTypeEnum.alreadyUsed);
    expect(result.errorMessage).toBe(codeAlreadyUsedErrorMessage);
  });

  it("should return a default error response when fetch throws an error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Network error"));

    const result: ICodeSubmitResult = await checkCodeValidity("someCode");
    expect(result.status).toBe(StatusTypeEnum.error);
    expect(result.errorMessage).toBe(defaultErrorMessage);
  });
});
