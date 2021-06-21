import React from "react";
import {
  CategoryProvider,
  CategoryTitle,
  CategoryItem,
} from "@mui-treasury/components/menu/category";
import {
  SocialProvider,
  SocialLink,
} from "@mui-treasury/components/socialLink";
import { useBallSocialLinkStyles } from "@mui-treasury/styles/socialLink/ball";

import { useNikiCategoryMenuStyles } from "@mui-treasury/styles/categoryMenu/niki";
import { ColumnToRow, Item } from "@mui-treasury/components/flex";
import {
  EmailSubscribe,
  EmailTextInput,
  SubmitButton,
} from "@mui-treasury/components/EmailSubscribe";
import { useInfoEmailSubscribeStyles } from "@mui-treasury/styles/emailSubscribe/info";
import ArrowForward from "@material-ui/icons/ArrowForward";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// import { FontProvider, Font } from 'website/src/components/Font';

const Footer = () => {
  return (
    <>
      <div className="light-bg-color">
        <hr />
        <Box width={"100%"} px={{ xs: 2, sm: 3, lg: 4 }}>
          <Box pt={6} pb={{ md: 6 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} lg={3}>
                <Box
                  component={"img"}
                  mt={-3}
                  width={120}
                  src="https://i.ya-webdesign.com/images/lines-design-png-10.png"
                  alt=""
                />
                <Box>
                  <SocialProvider useStyles={useBallSocialLinkStyles}>
                    <SocialLink brand={"Envelope"} />
                    <SocialLink brand={"GooglePlus"} />
                  </SocialProvider>
                </Box>
              </Grid>
              <Grid item xs={12} md={8} lg={5}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
                      <CategoryTitle>
                        <p>Partners</p>
                      </CategoryTitle>
                      <CategoryItem>JagoBD</CategoryItem>
                      <CategoryItem>Prothom Alo</CategoryItem>
                      <CategoryItem>Programming Hero</CategoryItem>
                      <CategoryItem>Uber</CategoryItem>
                    </CategoryProvider>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
                      <CategoryTitle>
                        <p>Information</p>
                      </CategoryTitle>
                      <CategoryItem>About Us</CategoryItem>
                      <CategoryItem>Privacy Policy</CategoryItem>
                      <CategoryItem>News</CategoryItem>
                      <CategoryItem>FAQ</CategoryItem>
                    </CategoryProvider>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
                      <CategoryTitle>
                        <p>About</p>
                      </CategoryTitle>
                      <CategoryItem>Contact</CategoryItem>
                      <CategoryItem>Team</CategoryItem>
                      <CategoryItem>Support</CategoryItem>
                    </CategoryProvider>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={8} lg={4} style={{ marginLeft: "auto" }}>
                <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
                  <CategoryTitle>
                    <p>Subscribe</p>
                  </CategoryTitle>
                </CategoryProvider>
                <EmailSubscribe
                  onSubmit={(email) =>
                    alert(`Your email ${email} is registered successfully.`)
                  }
                  useStyles={useInfoEmailSubscribeStyles}
                  inputClearedAfterSubmit
                >
                  <EmailTextInput placeholder="Email address" />
                  <SubmitButton aria-label={"subscribe"}>
                    <ArrowForward />
                  </SubmitButton>
                </EmailSubscribe>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <ColumnToRow
            at={"md"}
            columnStyle={{ alignItems: "center" }}
            rowStyle={{ alignItems: "unset" }}
          >
            <Item grow shrink={0}>
              <Box py={1} textAlign={{ xs: "center", md: "left" }}>
                <Typography
                  component={"p"}
                  variant={"caption"}
                  color={"textSecondary"}
                >
                  Visit ❤️ Bangladesh
                </Typography>
              </Box>
            </Item>
            <Item>
              <Box py={1} textAlign={{ xs: "center", md: "right" }}>
                <Typography
                  component={"p"}
                  variant={"caption"}
                  color={"textSecondary"}
                >
                  ©Jubair {new Date().getFullYear()} All right reserved
                </Typography>
              </Box>
            </Item>
          </ColumnToRow>
        </Box>
      </div>
    </>
  );
};

export default Footer;