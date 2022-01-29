import { useContext } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import AddOptionModal from './AddOptionModal'
import AppContext from './context'
import { deleteData } from './firebase-config'

const EditerListItem = function ({ label, text, id, collectionName }) {
    const {
        title,
        roleName,
        companyName,
        getData,
        setIntros,
        setBodyParagraphs,
        setConclusions,
        userId,
    } = useContext(AppContext)
    const handleDeleteClick = () => {
        let callBack = () => {}
        if (collectionName === 'intros') {
            callBack = () => {
                getData('intros', userId, setIntros)
            }
        } else if (collectionName === 'body paragraphs') {
            callBack = () => {
                getData('body paragraphs', userId, setBodyParagraphs)
            }
        } else if (collectionName === 'conclusions') {
            callBack = () => {
                getData('conclusions', userId, setConclusions)
            }
        }
        deleteData(collectionName, id, callBack)
    }
    return (
        <ListItem
            secondaryAction={
                <>
                    <AddOptionModal
                        title={title}
                        roleName={roleName}
                        companyName={companyName}
                        buttonLabel={label}
                        collectionName={collectionName}
                        text={text}
                        id={id}
                    />
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleDeleteClick}
                    >
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                </>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <NotesOutlinedIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={label} />
        </ListItem>
    )
}
export default EditerListItem
