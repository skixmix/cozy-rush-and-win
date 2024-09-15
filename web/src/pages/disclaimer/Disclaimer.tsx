import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BLACK_COLOR, WHITE_COLOR } from "../../theme";
import Link from "@mui/material/Link";

function Disclaimer(): JSX.Element {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box
        bgcolor={"#FCBB5E"}
        padding={"20px"}
        maxWidth={{ md: "350px", xs: "80%" }}
        borderRadius={"12px"}
      >
        <Typography variant="h4" color={BLACK_COLOR}>
          Disclaimer
        </Typography>
        <br />
        <Typography variant="body1" color={BLACK_COLOR}>
          By entering an 8-character code on this website, you can check if you
          have won a game key as part of our giveaway. No personal data is
          collected, and no tracking or registration is required to participate.
          Codes are provided through our YouTube videos and are valid for
          one-time use only. Each giveaway is limited to one winner per code. By
          using this website, you agree that entering a code does not guarantee
          a prize, and codes must be entered in the correct sequence to verify
          eligibility.
        </Typography>
      </Box>
      <Box marginTop={"40px"}>
        <Link
          color={WHITE_COLOR}
          fontSize={"25px"}
          underline="hover"
          fontFamily={"MoreSugar"}
          href="/"
        >
          <i className="fas fa-arrow-left"></i> Go back
        </Link>
      </Box>
    </Box>
  );
}

export default Disclaimer;
