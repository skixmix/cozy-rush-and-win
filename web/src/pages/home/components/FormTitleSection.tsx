import Typography from "@mui/material/Typography";
import { memo } from "react";

function FormTitleSection(): JSX.Element {
  return (
    <>
      <img
        src="/img/cat.png"
        alt="Your"
        style={{ width: "300px", marginBottom: "10px" }}
      />
      <Typography variant="h5" gutterBottom>
        Enter your code here
      </Typography>
    </>
  );
}

export default memo(FormTitleSection);
