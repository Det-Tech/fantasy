import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styles from '../../styles/Card.module.css'
import Link from 'next/link'

const UserCard = ({name, email, id, image}) => {
  const classes = useStyles()
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="user image"
          height="200"
          image={image}
        />
        <CardContent>
          <Typography className={classes.text} gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography className={classes.text} variant="body2" color="textSecondary">
            {email}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link href={`/users/${id}`}>
            <a>View Full Profile</a>
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    padding: 5
  },
  text: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
})

export default UserCard