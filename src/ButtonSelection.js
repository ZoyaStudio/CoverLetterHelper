import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ButtonSelection = function ({ section, value, setter, test, label }) {
    const buttons = Object.keys(section).map((name) => (
        <Button
            sx={{
                m: 0.5,
                bgcolor:
                    value === section[name].text
                        ? 'violet'
                        : 'rgb(110, 139, 236)',
                '&:hover': {
                    bgcolor: 'rgb(84, 67, 161)',
                },
            }}
            variant="contained"
            key={name}
            className={value === section[name].text ? 'selectedBTN' : ''}
            onClick={() => {
                setter(section[name].text)
            }}
            disabled={test ? test(section[name].text, value) : null}
        >
            {name}
        </Button>
    ))
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                {
                    // eslint-disable-next-line prefer-template
                }
                <Typography
                    sx={{
                        mr: 1,
                    }}
                >
                    {label}
                </Typography>
                <Typography
                    sx={{
                        color: 'rgb(150 150 150)',
                    }}
                >
                    {/* {value || `Select a ${label}`} */}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>{buttons}</AccordionDetails>
        </Accordion>
    )
}
export default ButtonSelection
