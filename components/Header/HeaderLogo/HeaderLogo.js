import { useStyles } from './HeaderLogo.styles'
import Link from '../../Link'
import Logo from '../../Logo'

export default function HeaderLogo() {
  const { classes } = useStyles()

  return (
    <Link href='/' className={classes.link}>
      <Logo height={28} />
      <span className={classes.text}>TourTracking</span>
    </Link>
  )
}
