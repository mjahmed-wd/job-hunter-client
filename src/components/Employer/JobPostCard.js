import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { useN04TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n04";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import { useGradientBtnStyles } from "@mui-treasury/styles/button/gradient";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "75%",
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
    width: "50%",
    height: "50%",
  },
}));

const JobPostCard = ({ title, company, description, children }) => {
  const chubbyStyles = useGradientBtnStyles({ chubby: true });
  const styles = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  return (
    <div className="container mt-5 mb-5">
      <Card className={cx(styles.root, shadowStyles.root)}>
        {/* <CardMedia
        //   className={cx(styles.media, mediaStyles.root)}
          image={'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'}
        /> */}
        <CardContent>
          <TextInfoContent
            classes={textCardContentStyles}
            heading="Post a Job"
            body={'All fields are required, best wishes for your company'}
          />
          <div className="pt-3">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostCard;
