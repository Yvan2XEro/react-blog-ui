import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Paper from "@mui/material/Paper";
import CommentIcon from "@mui/icons-material/Comment";
import { getUser } from "../services/authService";
import { LoggedInContext } from "../contexts";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { removeComment } from "../services/commentServices";
import { toast } from "react-toastify";

function Comment({ data, onChange }) {
  const [user] = useState(getUser());
  const { isAuthenticated } = useContext(LoggedInContext);

  const validName = () => {
    if (!isAuthenticated) return data.user.name;
    if (user != null && user.id != data.user.id) return data.user.name;
    return "You";
  };

  const handleDelete = () => {
    removeComment(data.id).then(() => {
      toast.warn("Message deleted!");
      onChange();
    });
  };
  useEffect(() => {
    validName();
  }, []);
  return (
    <Box sx={{ mt: 1, p: 2 }} component={Paper}>
      <Grid container>
        <Grid item xs>
          <Typography component="h3" variant="strong">
            <CommentIcon />
            {validName()}
          </Typography>
        </Grid>
        <Grid item>
          At: {" " + moment(data.createdAt).format("DD/MM hh:mm")}
        </Grid>
        {validName() === "You" && (
          <Grid sx={{ ml: 2 }} item>
            <Button onClick={handleDelete}>
              <DeleteOutlineIcon size="small" color="error" />
            </Button>
          </Grid>
        )}
      </Grid>
      {data.content}
    </Box>
  );
}

export default Comment;
