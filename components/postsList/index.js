import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const PostsList = ({post}) => {
  const {image, text, link='www.google.com', owner: {firstName, lastName}} = post || {}
  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={image} />
        </ListItemAvatar>
        <ListItemText
          primary={`${firstName} ${lastName}`}
          secondary={
            <Fragment>
              <Typography component="span" variant="body2"  color="textPrimary">
                {text}
              </Typography>
              {` - ${link}`}
            </Fragment>
          }
        />
      </ListItem> 
      <Divider variant="inset" component="li" />
    </List>
  )
}

export default PostsList