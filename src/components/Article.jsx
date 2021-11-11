import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toggleLike, userLikedPost } from "../services/likeServices";
import { LoggedInContext } from "../contexts";
import { find } from "../services/postServices";

export default function Article({ data }) {
  const { isAuthenticated } = useContext(LoggedInContext);
  const [article, setArticle] = useState(data);
  const [userLiked, setUserLiked] = useState(userLikedPost(article));
  const handleLike = () => {
    toggleLike(article).then(async () => {
      await find(article.id).then((response) => setArticle(response.data));
      setUserLiked(!userLiked);
    });
  };

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
            {article.title}
          </Typography>
          <Typography>
            {article.content.length > 100
              ? article.content.substring(0, 100) + "..."
              : article.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link className="article-link" to={`/posts/${article.id}`}>
              <VisibilityIcon />
            </Link>
          </Button>
          <Button size="small">
            <Typography size="small" className="article-link">
              <QuestionAnswerIcon /> {article.comments.length}
            </Typography>
          </Button>
          <Button size="small" onClick={handleLike} disabled={!isAuthenticated}>
            <Typography size="small" className="article-link">
              {!userLiked ? <FavoriteBorderIcon /> : <FavoriteIcon />}{" "}
              {article.likes.length}
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
