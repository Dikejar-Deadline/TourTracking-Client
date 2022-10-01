import { Title } from '@mantine/core'

import { useStyles } from '@/components/Layout/PageLayout/PageLayout.styles'

export default function PageLayout({
  children,
  title,
  description,
}) {
  const { classes } = useStyles()

  return (
    <div className={classes.layout}>
      <Title order={1} className={classes.title}>
        {title}
      </Title>
      <p className={classes.description}>{description}</p>
      {children}
    </div>
  )
}
