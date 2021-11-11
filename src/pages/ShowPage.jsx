import { Button, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { find } from "../services/postServices";
import moment from "moment";
import { toggleLike, userLikedPost } from "../services/likeServices";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LoggedInContext } from "../contexts";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

function ShowPage() {
  const { id } = useParams();

  const { isAuthenticated } = useContext(LoggedInContext);

  const handleLike = () => {
    toggleLike(article).then(async () => {
      await find(article.id).then((response) => setArticle(response.data));
      setUserLiked(!userLiked);
    });
  };

  const [userLiked, setUserLiked] = useState(false);
  const [article, setArticle] = useState({
    id: 0,
    title: "",
    content: "",
    likes: [],
    comments: [],
    author: { name: "" },
    createdAt: "",
  });
  const loadArticle = async () => {
    await find(article.id).then((response) => setArticle(response.data));
  };
  useEffect(() => {
    find(id).then((response) => {
      setArticle(response.data);
      setUserLiked(userLikedPost(article));
    });
  }, [id]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 16,
        pt: 10,
      }}
    >
      <Typography component="h1" variant="h4">
        {article.title}
      </Typography>
      <CardMedia
        height={400}
        component="img"
        image="https://source.unsplash.com/random"
        alt="random"
      />
      <Grid container sx={{ mt: 4 }}>
        <Grid item>
          <Typography component="strong" variant="strong">
            Author
          </Typography>
          : {article.author.name}
        </Grid>
        <Grid item>
          <Typography component="strong" variant="strong">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Posted at:
          </Typography>
          {" " + moment(article.createdAt).format("DD/MM/YYYY H:I")}
        </Grid>
        <Grid item sx={{ ml: 10 }}>
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
        </Grid>
      </Grid>
      <Typography sx={{ mt: 4 }} component="div">
        {article.content}
      </Typography>
      <Container sx={{ p: 3, ml: 0 }} maxWidth="sm">
        <Typography component="h4" variant="h4">
          Comments
        </Typography>
        {article.comments.map((comment) => (
          <Comment data={comment} key={comment.id} onChange={loadArticle} />
        ))}
        {isAuthenticated && (
          <CommentForm post={article} onSuccess={loadArticle} />
        )}
      </Container>
    </Box>
  );
}

export default ShowPage;
