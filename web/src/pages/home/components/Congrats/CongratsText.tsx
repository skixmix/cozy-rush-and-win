import React from "react";
import "./CongratsText.css";
import Typography from "@mui/material/Typography";

const CongratsText: React.FC = () => {
  return (
    <Typography className="congrats-text" variant="h4">
      Congrats!
    </Typography>
  );
};

export default CongratsText;
