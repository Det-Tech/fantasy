import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link href='/'>
        Go User
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Created and Maintained by '}
      <Link href='https://github.com/prateekvijayvergiya/'>
        Prateek Vijayvergiya
      </Link>{'.'}
    </Typography>
  )
}

export default Copyright