// import { useContext } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AppContext from './context';
// import { templates } from './data';

// const TemplateSelection = function () {
//   const {
//     setIntro, setBodyParagraphOne, setBodyParagraphTwo, setBodyParagraphThree, setConclusion
//   } = useContext(AppContext);
//   const TemplateButtons = Object.keys(templates).map((templateKey) => (
//     <Button
//       variant="contained"
//       sx={
//       {
//         m: 0.5,
//         bgcolor: 'rgb(110, 139, 236)',
//         '&:hover': {
//           bgcolor: 'rgb(84, 67, 161)',
//         },
//       }
//     }
//       type="button"
//       key={templateKey}
//       onClick={() => {
//         setIntro(templates[templateKey].intro);
//         setBodyParagraphOne(templates[templateKey].bodyParagraphOne);
//         setBodyParagraphTwo(templates[templateKey].bodyParagraphTwo);
//         setBodyParagraphThree(templates[templateKey].bodyParagraphThree);
//         setConclusion(templates[templateKey].conclusion);
//       }}
//     >
//       {templateKey}
//     </Button>
//   ));
//   return (
//     <Accordion>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <Typography>Templates</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         {TemplateButtons}
//       </AccordionDetails>
//     </Accordion>
//   );
// };
// export default TemplateSelection;
