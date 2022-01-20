import { useContext } from "react";
import Paper from "@mui/material/Paper";
import converter from "./utility";
import AppContext from "./context";

const Preview = function () {
  const {
    companyName,
    companyFocus,
    roleName,
    title,
    intro,
    bodyParagraphOne,
    bodyParagraphTwo,
    bodyParagraphThree,
    conclusion,
    signOffLines,
  } = useContext(AppContext);
  return (
    <Paper
      elevation={3}
      sx={{
        m: 0.5,
        p: 3,
      }}
    >
      {companyName && roleName && companyFocus && title ? (
        <>
          <p>
            {"Dear hiring team at "}
            {companyName},
          </p>
          <br />
          <p>
            {`${converter(
              intro,
              title,
              roleName,
              companyName
            )} ${companyFocus}`}
          </p>
          <p>{converter(bodyParagraphOne, title, roleName, companyName)}</p>
          <p>
            {bodyParagraphTwo &&
              converter(bodyParagraphTwo, title, roleName, companyName)}
          </p>
          <p>
            {bodyParagraphThree &&
              converter(bodyParagraphThree, title, roleName, companyName)}
          </p>
          <p>{converter(conclusion, title, roleName, companyName)}</p>
          <br />
          <p>
            {/* If you have any questions, please contact me at */}
            {signOffLines[0]}
            <br />
            {signOffLines[1]}
            {/* 206-861-6649 */}
            <br />
            {signOffLines[2]}
            {/* eamendenhall@outlook.com */}
            <br />
            {signOffLines[3]}
            {/* Elizabeth Mendenhall */}
            <br />
          </p>
        </>
      ) : (
        <p>Please fill in the company specifics section</p>
      )}
    </Paper>
  );
};
export default Preview;
