import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';

import EditerListItem from "./EditerListItem";
import AddOptionModal from "./AddOptionModal";

const EditerList = function ({ section, collectionName }) {
  return (
    <List>
      {Object.keys(section).map((label) => (
        <EditerListItem
          key={label}
          label={label}
          text={section[label].text}
          id={section[label].id}
          collectionName={collectionName}
        />
      ))}
      <ListItem>
        <AddOptionModal
          isAdding
          buttonLabel=""
          collectionName={collectionName}
          text=""
          id={null}
        />
      </ListItem>
    </List>
  );
};
export default EditerList;
