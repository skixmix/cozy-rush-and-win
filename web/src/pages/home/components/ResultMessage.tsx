import Typography from "@mui/material/Typography";
import { IErrorMessage } from "../interfaces/ErrorMessage.interface";
import { memo } from "react";
import Box from "@mui/material/Box";
import { BLACK_COLOR } from "../../../theme";

function ResultMessage({ message, icon }: IErrorMessage): JSX.Element {
  return (
    <Box
      marginTop={"50px"}
      bgcolor={"#FDD49B"}
      borderRadius={"12px"}
      padding={"20px"}
    >
      {icon}
      <Typography
        variant="body1"
        gutterBottom
        marginTop={"10px"}
        color={BLACK_COLOR}
        dangerouslySetInnerHTML={{ __html: message }}
      ></Typography>
    </Box>
  );
}

export default memo(ResultMessage);
