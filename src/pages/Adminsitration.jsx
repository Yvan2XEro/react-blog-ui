import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { findAll, remove } from "../services/postServices";
import moment from "moment";
import { Button, Container, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

function createData({ id, title, author, createdAt, likes, comments }) {
  return {
    id,
    title,
    author: author.name,
    created: moment(createdAt).format("DD/MM/YYYY H:M"),
    likesCount: likes.length,
    commentsCount: comments.length,
  };
}

export default function Administration() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    await findAll().then((response) => setPosts(response.data["hydra:member"]));
  };
  const deletePost = async (id) => {
    try {
      await remove(id).then(() => {
        toast.success("Deleted!");
        loadPosts();
      });
    } catch (err) {
      toast.error("Could not delete this element!!");
    }
  };
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <Container sx={{ mt: 10 }}>
      <Typography component="h2" variant="h3">
        All Articles
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ m: "auto" }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Likes count</TableCell>
              <TableCell align="right">Comments counts</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .map((post) => createData(post))
              .map((article) => (
                <TableRow
                  key={article.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {article.title}
                  </TableCell>
                  <TableCell align="right">{article.author}</TableCell>
                  <TableCell align="right">{article.created}</TableCell>
                  <TableCell align="right">{article.likesCount}</TableCell>
                  <TableCell align="right">{article.commentsCount}</TableCell>
                  <TableCell align="right">
                    <Button>
                      <EditIcon size="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => deletePost(article.id)}>
                      <DeleteOutlineIcon size="small" color="error" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
