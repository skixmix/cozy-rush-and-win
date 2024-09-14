import React, { memo, useCallback, useState } from "react";
import FormContainer from "./components/FormContainer";
import FormTitleSection from "./components/FormTitleSection";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ErrorMessage from "./components/ErrorMessage";
import { checkCodeValidity } from "./functions/HomePage.functions";
import { StatusTypeEnum } from "./interfaces/HomePage.interfaces";

function HomePage(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentInputValue, setCurrentInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async function handleCodeSubmission(event: React.FormEvent) {
      event.preventDefault();
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const result = await checkCodeValidity(currentInputValue);

      if (result.status === StatusTypeEnum.error && result.errorMessage) {
        setErrorMessage(result.errorMessage!);
      } else if (result.obtainedCode) {
        setSuccessMessage(
          "WOW, that's a valid code! Here is your key: " + result.obtainedCode
        );
      }
      setIsLoading(false);
    },
    [currentInputValue, isLoading]
  );

  const handleTryAgain = useCallback(function resetToInitialState() {
    setCurrentInputValue("");
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(false);
  }, []);

  const isInErrorState = !!errorMessage && errorMessage.length > 0;
  const isInSuccessState =
    !isInErrorState && !!successMessage && successMessage.length > 0;

  let submitButtonText = "Submit";
  if (isInErrorState) {
    submitButtonText = "Try Again";
  } else if (isLoading) {
    submitButtonText = "Checking...";
  }

  const handleTextInput = useCallback(function handleTextInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setCurrentInputValue(event.target.value);
  },
  []);

  return (
    <FormContainer>
      <FormTitleSection />
      <TextField
        label="e.g. 0123ABCD"
        variant="outlined"
        sx={{ marginBottom: "20px", width: "100%", maxWidth: "400px" }}
        slotProps={{
          htmlInput: {
            maxLength: 8,
            style: { textTransform: "uppercase", textAlign: "center" },
          },
        }}
        value={currentInputValue}
        onChange={handleTextInput}
        disabled={isLoading}
      />

      {isInSuccessState ? (
        <>{successMessage}</>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", maxWidth: "400px" }}
            onClick={isInErrorState ? handleTryAgain : handleSubmit}
          >
            {submitButtonText}
          </Button>
          {isInErrorState ? <ErrorMessage message={errorMessage} /> : <></>}
        </>
      )}
    </FormContainer>
  );
}

export default memo(HomePage);
