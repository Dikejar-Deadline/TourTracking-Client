import { useStyles } from './HeaderLogo.styles'
import Link from '@/components/Link'
import Logo from '@/components/Logo'

export default function HeaderLogo() {
  const { classes } = useStyles()

  return (
    <Link href='/' className={classes.link}>
      <Logo height={28} />
      <span className={classes.text}>TourTracking</span>
    </Link>
  )
}
