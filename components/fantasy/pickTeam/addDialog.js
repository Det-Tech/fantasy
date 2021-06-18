import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, handleAdd,id } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set Players</DialogTitle>
      {
          <List>
            <ListItem autoFocus button onClick={(e) => handleAdd(e,id,false,true)}>
            <ListItemAvatar>
                <Avatar>
                <DeleteIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add player" />
            </ListItem>

            <ListItem autoFocus button>
            <ListItemAvatar>
                <Avatar>
                <HelpIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="View Information" />
            </ListItem>
      </List>
    }
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleListItemClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};