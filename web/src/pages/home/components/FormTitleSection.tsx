import Typography from "@mui/material/Typography";
import { memo } from "react";

function FormTitleSection(): JSX.Element {
  return (
    <>
      <img
        src="/img/cat.png"
        alt="CozyGamez logo"
        style={{ width: "200px", marginBottom: "5px" }}
      />
      <Typography variant="h4" gutterBottom marginBottom={"20px"}>
        Enter your code here
      </Typography>
    </>
  );
}

export default memo(FormTitleSection);
