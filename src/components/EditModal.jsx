import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import { findAll } from "../services/userServices"
import { update, add } from "../services/postServices"
import { Button, TextField, Typography,FormControl, InputLabel, Select,MenuItem } from "@mui/material";
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({post, onSuccess, onFailure, open, onClose}) {
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(article.id>0) {
            await update(article.id, {...article, author:authorIri})
            .then(() => {
                toast.success("Update success!")
                onSuccess()
            })
        }else{
            await add({...article, author:authorIri})
            .then(()=>{
                toast.success("Post  added success!")
                onSuccess()
            })
        }
    }
    console.log(post)
    const [article, setArticle] = React.useState(post!=null?post:{id:0,title:"", content: "", author: ""})
    const [users, setUsers] = React.useState([])
    const [authorIri, setAuthorIri] = React.useState(post!=null?post.author["@id"]:null)
    const loadUsers = async ()=>{
        await findAll().then((response) => {
            setUsers(response.data["hydra:member"])
        })
    }
    React.useEffect(()=>{
        setArticle(post!=null?post:{title:"", content: "", author: null})
        setAuthorIri(post!=null?post.author["@id"]:null)
        loadUsers()
    },[post])
  return (
    <Modal
      sx={{border:"none"}}
      open={open}
      onClose={onSuccess}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box sx={style}  component={Paper}>
            <Typography sx={{ mt: 2 }} component="h4" variant="h4">
                {article.author===null?"New post": "Edit post"}
            </Typography>
            <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Author</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={authorIri}
                    onChange={(e)=>setAuthorIri(e.target.value)}
                >
                    {users.map((user) => <MenuItem value={user["@id"]} key={user.id}>{user.name}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
              id="outlined-multiline-static"
              label="Title"
              fullWidth
              sx={{ mt: 2 }}
              value={article.title}
              onChange={(e)=>setArticle({...article, title:e.target.value})}
              placeholder="Title..."
            />
            <TextField
              id="outlined-multiline-static"
              label="Content"
              multiline
              rows={6}
              value={article.content}
              onChange={(e)=>setArticle({...article, content:e.target.value})}
              sx={{ mt: 2 }}
              fullWidth
              placeholder="Input post content..."
            />
            <Button
              onClick={handleSubmit}
              variant="outlined"
              size="medium"
              disabled={authorIri==="" || article.title==="" || article.content===""}
              sx={{ mb: 2, mt: 2 }}
            > Save </Button>
        </Box>
    </Modal>
  );
}