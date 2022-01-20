import { React, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonSelection from "./ButtonSelection";
import EditDataModal from "./EditDataModal";
import AppContext from "./context";
import { saveSignOff } from "./firebase-config";
// import TemplateSelection from './TemplateSelection';
const textFeildStyle = { bgcolor: "#fff2db" };
const ControlPanel = function () {
  // console.log(bodyParagraphs);
  const {
    intros,
    bodyParagraphs,
    conclusions,
    title,
    setTitle,
    companyName,
    setCompanyName,
    companyFocus,
    setCompanyFocus,
    roleName,
    setRoleName,
    intro,
    setIntro,
    bodyParagraphOne,
    setBodyParagraphOne,
    bodyParagraphTwo,
    setBodyParagraphTwo,
    bodyParagraphThree,
    setBodyParagraphThree,
    conclusion,
    setConclusion,
    signOffLines,
    setSignOffLines,
    userId,
  } = useContext(AppContext);
  const handleSignOffLineChange = (index, value) => {
    const newLines = JSON.parse(JSON.stringify(signOffLines));
    newLines[index] = value;
    setSignOffLines(newLines);
  };
  const handleSaveUserData = () => {
    saveSignOff(signOffLines, userId);
  };
  const hasDuplicateParagraphs = (text, value) =>
    (bodyParagraphOne === text ||
      bodyParagraphTwo === text ||
      bodyParagraphThree === text) &&
    text !== value;
  return (
    <span className="selection">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          bgcolor: "white",
          m: 2,
          p: 1.5,
          borderRadius: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography>Company Specifics</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Current Designation"
          variant="outlined"
          sx={textFeildStyle}
        />
        <TextField
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          label="Company Name"
          variant="outlined"
          sx={textFeildStyle}
        />
        <TextField
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          label="Role Name"
          variant="outlined"
          sx={textFeildStyle}
        />
        <TextField
          value={companyFocus}
          onChange={(e) => setCompanyFocus(e.target.value)}
          label="Company Focus"
          variant="outlined"
          sx={textFeildStyle}
        />
        <Typography>Sign Off</Typography>
        <TextField
          value={signOffLines[0]}
          onChange={(e) => {
            handleSignOffLineChange(0, e.target.value);
          }}
          label="Line 1"
          variant="outlined"
          sx={textFeildStyle}
        />
        <TextField
          value={signOffLines[1]}
          onChange={(e) => {
            handleSignOffLineChange(1, e.target.value);
          }}
          label="Line 2"
          variant="outlined"
          sx={textFeildStyle}
        />
        <TextField
          value={signOffLines[2]}
          onChange={(e) => {
            handleSignOffLineChange(2, e.target.value);
          }}
          label="Line 3"
          variant="outlined"
          sx={textFeildStyle}
        />
        <TextField
          value={signOffLines[3]}
          onChange={(e) => {
            handleSignOffLineChange(3, e.target.value);
          }}
          label="Line 4"
          variant="outlined"
          sx={textFeildStyle}
        />
        <Button
          variant="contained"
          onClick={handleSaveUserData}
          disabled={!userId}
        >
          Save Sign Off
        </Button>
      </Box>
      {/* <TemplateSelection
        setIntro={setIntro}
        setBodyParagraphOne={setBodyParagraphOne}
        setBodyParagraphTwo={setBodyParagraphTwo}
        setBodyParagraphThree={setBodyParagraphThree}
        setConclusion={setConclusion}
      /> */}
      <EditDataModal />
      <ButtonSelection
        section={intros}
        value={intro}
        setter={setIntro}
        label="Intros"
      />
      <ButtonSelection
        section={bodyParagraphs}
        value={bodyParagraphOne}
        setter={setBodyParagraphOne}
        label="Paragraph One"
        test={hasDuplicateParagraphs}
      />
      <ButtonSelection
        section={bodyParagraphs}
        value={bodyParagraphTwo}
        setter={setBodyParagraphTwo}
        label="Paragraph Two"
        test={hasDuplicateParagraphs}
      />
      <ButtonSelection
        section={bodyParagraphs}
        value={bodyParagraphThree}
        setter={setBodyParagraphThree}
        label="Paragraph Three"
        test={hasDuplicateParagraphs}
      />
      <ButtonSelection
        section={conclusions}
        value={conclusion}
        setter={setConclusion}
        label="Conclusions"
      />
    </span>
  );
};

export default ControlPanel;
