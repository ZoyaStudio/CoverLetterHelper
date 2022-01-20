import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EditerList from "./EditerList";
import AppContext from "./context";
// import Typography from '@mui/material/Typography';
const style = {
  // display: 'flex',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "lavender",
  border: "2px solid #000",
  boxShadow: 24,
  // alignItems: 'center',
  // justifyContent: 'center',
  p: 4,
};
const EditDataModal = function () {
  const { intros, bodyParagraphs, conclusions, userId } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        disabled={!userId}
        sx={{
          bgcolor: "orange",
          width: "95%",
          m: 1,
          mb: 2,
        }}
      >
        Edit Data
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Intros" value="1" />
                <Tab label="Body Paragraphs" value="2" />
                <Tab label="Conclusions" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <EditerList section={intros} collectionName="intros" />
            </TabPanel>
            <TabPanel value="2">
              <EditerList
                section={bodyParagraphs}
                collectionName="body paragraphs"
              />
            </TabPanel>
            <TabPanel value="3">
              <EditerList section={conclusions} collectionName="conclusions" />
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
};
export default EditDataModal;
