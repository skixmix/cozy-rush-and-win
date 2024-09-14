import Box from "@mui/material/Box";
import { IFormContainer } from "../interfaces/FormContainer.interface";
import { memo } from "react";

function FormContainer({ children }: IFormContainer): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "auto", md: "100vh" },
        paddingTop: { xs: "20px", md: "0" },
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default memo(FormContainer);
