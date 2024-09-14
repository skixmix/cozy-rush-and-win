import Typography from "@mui/material/Typography";
import { IErrorMessage } from "../interfaces/ErrorMessage.interface";
import Link from "@mui/material/Link";
import { memo } from "react";

function ErrorMessage({ message }: IErrorMessage): JSX.Element {
  return (
    <Typography variant="body1" gutterBottom marginTop={"10px"}>
      {message}{" "}
      <Link
        color="primary"
        href="https://www.youtube.com/@cozygamez"
        target="_blank"
      >
        follow me on YouTube
      </Link>
    </Typography>
  );
}

export default memo(ErrorMessage);
