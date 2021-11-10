import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { find } from "../services/postServices";
import moment from "moment";

function ShowPage() {
  const { id } = useParams();
  console.log(id);

  const [article, setArticle] = useState({
    title: "",
    content: "",
    likes: [],
    comments: [],
    author: { name: "" },
    createdAt: "",
  });
  useEffect(() => {
    find(id).then((response) => {
      setArticle(response.data);
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 16,
        pt: 8,
      }}
    >
      <Typography component="h1" variant="h4">
        {article.title}
      </Typography>
      <Grid container>
        <Grid item>
          <Typography component="strong" variant="strong">
            Author
          </Typography>
          : {article.author.name}
        </Grid>
        <Grid item>
          <Typography component="strong" variant="strong">
            Posted at:
          </Typography>
          {" " + moment(article.createdAt).format("DD/MM/YYYY H:I")}
        </Grid>
      </Grid>
      <Typography component="div">{article.content}</Typography>
    </Box>
  );
}

export default ShowPage;
