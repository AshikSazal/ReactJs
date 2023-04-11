import React, { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText, ListItem, List } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";

const ListItems = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            {props.icon}
          </ListItemIcon>
          <ListItemText>{props.text}</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <List disablePadding dense>
        {open && props.sublist.map((item, index) => (
          <ListItem key={index} disablePadding onClick={() => handleNavigate(item.path)}>
            <ListItemButton>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ListItems;
