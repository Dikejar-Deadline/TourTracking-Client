import { Button, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'

import { useStyles } from '../../Header/Header.styles'

const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const { classes } = useStyles()

  return (
    <Tooltip
      label={dark ? "Light Mode" : "Dark Mode"}
      openDelay={500}
    >
      <Button
        variant='filled'
        color='gray'
        className={classes.button}
        onClick={() => toggleColorScheme()}
        aria-label={dark ? "Light Mode" : "Dark Mode"}
      >
        {dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
      </Button>
    </Tooltip>
  )
}

export default ThemeSwitch
