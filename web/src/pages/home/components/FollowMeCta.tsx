import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { memo } from "react";
import { WHITE_COLOR } from "../../../theme";

function FollowMeCta(): JSX.Element {
  return (
    <Box
      marginTop={"40px"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Link
        color={WHITE_COLOR}
        fontSize={"25px"}
        underline="hover"
        fontFamily={"MoreSugar"}
        href="https://www.youtube.com/@cozygamez"
        target="_blank"
      >
        Follow me on <i className="fab fa-youtube"></i>
      </Link>
      <Link
        marginTop={"30px"}
        color={WHITE_COLOR}
        fontSize={"18px"}
        underline="hover"
        fontFamily={"MoreSugar"}
        href="/disclaimer"
      >
        Disclaimer
      </Link>
    </Box>
  );
}

export default memo(FollowMeCta);
