import { useState, React, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import IconButton from "@mui/material/IconButton";
import converter from "./utility";
import AppContext from "./context";
import { addData, editData } from "./firebase-config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "lavender",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddOptionModal = function ({
  buttonLabel,
  text,
  collectionName,
  isAdding,
  id,
}) {
  const { title, userId, roleName, companyName } = useContext(AppContext);
  const sampleText =
    "I'm a <title> interested in the <roleName> role at <companyName>.";
  const [open, setOpen] = useState(false);
  const [editerText, setEditerText] = useState(text || sampleText);
  const [label, setLabel] = useState(buttonLabel || "");
  const handleClose = () => {
    setOpen(false);
    setEditerText(sampleText);
    setLabel("");
  };

  const handleSaveClick = () => {
    let callBack = () => {};
    if (collectionName === "intros") {
      callBack = () => {
        getData("intros", userId, setIntros);
      };
    } else if (collectionName === "body paragraphs") {
      callBack = () => {
        getData("body paragraphs", userId, setBodyParagraphs);
      };
    } else if (collectionName === "conclusions") {
      callBack = () => {
        getData("conclusions", userId, setConclusions);
      };
    }
    if (id) {
      editData(collectionName, label, editerText, id);
    } else {
      addData(collectionName, label, editerText, userId);
    }
  };
  return (
    <>
      {isAdding ? (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "relative", right: 8 }}
        >
          <AddCircleOutlineOutlinedIcon fontSize="large" sx={{ mr: 1 }} />
          <ListItemText primary="Add item" />
        </IconButton>
      ) : (
        <IconButton
          edge="end"
          aria-label="editer"
          onClick={() => setOpen(true)}
        >
          <CreateOutlinedIcon fontSize="large" />
        </IconButton>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" sx={{ mt: 1, mb: 5 }}>
            Here is what your text will look like in the app.
          </Typography>
          <Paper
            elevation={3}
            sx={{
              m: 1,
              mb: 3,
              p: 3,
            }}
          >
            {converter(editerText, title, roleName, companyName)}
          </Paper>
          <Typography sx={{ m: 2 }}>
            Create a label that will be the text that appears on the button for
            your slecting your text.
          </Typography>
          <TextField
            sx={{
              m: 0.5,
              width: 750,
              bgcolor: "#fff2db",
            }}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            label="Label"
            variant="outlined"
          />
          <Typography sx={{ m: 2 }}>
            Use the placeholders{" "}
            {
              "<title>, <companyName> and <roleName> to allow the app to insert these values. For example, "
            }
          </Typography>
          <Typography
            sx={{
              m: 2,
              fontStyle: "italic",
              bgcolor: "white",
              p: 2,
            }}
          >
            {sampleText}
          </Typography>
          <Typography sx={{ m: 2 }}>becomes</Typography>
          <Typography
            sx={{
              m: 2,
              fontStyle: "italic",
              bgcolor: "white",
              p: 2,
            }}
          >
            {converter(sampleText, title, roleName, companyName)}
          </Typography>

          <TextField
            sx={{
              m: 0.5,
              mb: 2,
              width: 750,
              bgcolor: "#fff2db",
            }}
            value={editerText}
            onChange={(e) => setEditerText(e.target.value)}
            label="Text"
            variant="outlined"
          />
          <Button
            variant="contained"
            size="large"
            sx={{ m: 1 }}
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ m: 1 }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};
export default AddOptionModal;
