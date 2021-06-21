import React, { useContext } from "react";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import { AuthContext } from "../../ProvideAuth/ProvideAuth";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    transition: "0.3s",
    position: "relative",
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      backgroundColor: "#d9daf1",
      borderRadius: "1rem",
      zIndex: 0,
      bottom: 0,
    },
    "&:hover": {
      "&:before": {
        bottom: -6,
      },
      "& $card": {
        boxShadow: "-12px 12px 64px 0 #bcc3d6",
      },
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px 0 #dbdbe8",
    backgroundColor: "#fff",
    transition: "0.4s",
    height: "100%",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  avatar: {
    fontFamily: "Ubuntu",
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
  join: {
    background: "linear-gradient(to top, #638ef0, #82e7fe)",
    "& > *": {
      textTransform: "none !important",
    },
  },
}));

export const CustomCard = ({
  thumbnail,
  title,
  subtitle,
  description,
  jobId,
}) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={2} gap={2}>
          <Avatar className={styles.logo} variant={"rounded"} src={thumbnail} />
          <Info position={"middle"} useStyles={useApexInfoStyles}>
            <InfoTitle>{title}</InfoTitle>
            <InfoSubtitle>{subtitle}</InfoSubtitle>
          </Info>
        </Row>
        <Box
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          {description}
        </Box>
        <Row p={2} gap={2} position={"bottom"}>
          {/* <Item>
            <AvatarGroup max={4} classes={{ avatar: styles.avatar }}>
              {new Array(5).fill(0).map((_, index) => (
                <Avatar
                  key={index}
                  src={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
                />
              ))}
            </AvatarGroup>
          </Item> */}
          {currentUser?.role === "Job Seeker" && (
            <Item>
                <Button
                  className={styles.join}
                  classes={btnStyles}
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => history.push(`/job/${jobId}`)}
                  disableRipple
                >
                  Apply Now
                </Button>
            </Item>
          )}
        </Row>
      </Column>
    </div>
  );
};
