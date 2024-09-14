import React, { memo, useCallback, useState } from "react";
import FormContainer from "./components/FormContainer";
import FormTitleSection from "./components/FormTitleSection";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ResultMessage from "./components/ResultMessage";
import { checkCodeValidity } from "./functions/HomePage.functions";
import { StatusTypeEnum } from "./interfaces/HomePage.interfaces";
import { Box, Link, styled } from "@mui/material";
import { BLACK_COLOR, WHITE_COLOR } from "../../theme";
import FollowMeCta from "./components/FollowMeCta";
import CongratsText from "./components/Congrats/CongratsText";

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FCBB5E",
  border: `3px solid ${BLACK_COLOR}`,
  borderRadius: "12px",
  width: "200px",
  height: "55px",
  color: BLACK_COLOR,
  boxShadow: `0 13px ${BLACK_COLOR}`,
  "&:hover": {
    boxShadow: `0 10px ${BLACK_COLOR}`,
  },
}));

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

      if (result.status !== StatusTypeEnum.ok && result.errorMessage) {
        setErrorMessage(result.errorMessage!);
      } else if (result.obtainedCode) {
        setSuccessMessage(
          "WOW, that's a valid code!<br/>Here is your key<br/><br/>" +
            result.obtainedCode +
            "<br/><br/>Please copy it and keep it safe, you will not be able to see it again!"
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
        label="Enter your code"
        variant="outlined"
        sx={{ marginBottom: "20px", width: "100%" }}
        slotProps={{
          htmlInput: {
            maxLength: 8,
            style: { textTransform: "uppercase", textAlign: "center" },
          },
        }}
        value={currentInputValue}
        onChange={handleTextInput}
        disabled={isLoading || isInSuccessState || isInErrorState}
      />

      {isInSuccessState ? (
        <>
          <CongratsText />
          <ResultMessage
            icon={
              <i
                className="fas fa-face-smile"
                style={{ fontSize: "30px", color: BLACK_COLOR }}
              ></i>
            }
            message={successMessage}
          />
        </>
      ) : (
        <>
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={isInErrorState ? handleTryAgain : handleSubmit}
          >
            {submitButtonText}
          </SubmitButton>
          {isInErrorState ? (
            <ResultMessage
              icon={
                <i
                  className="fas fa-face-frown"
                  style={{ fontSize: "30px", color: BLACK_COLOR }}
                ></i>
              }
              message={errorMessage}
            />
          ) : (
            <></>
          )}
        </>
      )}
      <FollowMeCta />
    </FormContainer>
  );
}

export default memo(HomePage);
