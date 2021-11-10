import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Article({ data }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {data.title}
          </Typography>
          <Typography>
            {data.content.length > 100
              ? data.content.substring(0, 100) + "..."
              : data.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link className="article-link" to={`/posts/${data.id}`}>
              <VisibilityIcon />
            </Link>
          </Button>
          <Button size="small">
            <Typography size="small" className="article-link">
              <QuestionAnswerIcon /> {data.comments.length}
            </Typography>
          </Button>
          <Button size="small">
            <Typography size="small" className="article-link">
              <FavoriteBorderIcon /> {data.likes.length}
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
