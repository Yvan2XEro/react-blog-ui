import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { postComment } from "../services/commentServices";
import { getUser } from "../services/authService";
import { toast } from "react-toastify";
import SendIcon from '@mui/icons-material/Send';

function CommentForm({ post, onSuccess }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log(content);
    postComment({
      content,
      post: post["@id"],
      user: `/api/users/${getUser().id}`,
    }).then(() => {
      onSuccess();
      setContent("");
      toast.success("Comment posted!");
    });
  };

  return (
    <>
      <Typography sx={{ mt: 2 }} component="h4" variant="h4">
        New Comment
      </Typography>
      <Box sx={{ mt: 2 }} component={Paper}>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={4}
          fullWidth
          value={content}
          onChange={({ target }) => setContent(target.value)}
          placeholder="Input your comment..."
        />
        <Button
          onClick={handleSubmit}
          variant="outlined"
          size="medium"
          sx={{ mb: 2, mt: 2 }}
        >
          <SendIcon/>
        </Button>
      </Box>
    </>
  );
}

export default CommentForm;
