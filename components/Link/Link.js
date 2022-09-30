import { Anchor } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons'
import Link from 'next/link'
import { forwardRef } from 'react'

import { useStyles } from './Link.styles'

// eslint-disable-next-line react/display-name
const CustomLink = forwardRef((props, ref) => {
  const {
    href,
    children,
    noIcon = false,
    as,
    replace,
    scroll,
    shallow,
    passHref = true,
    prefetch,
    locale,
    legacyBehavior,
    ...rest
  } = props
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  const { classes } = useStyles()

  if (isInternalLink) {
    return (
      <Link
        href={href}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
        prefetch={prefetch}
        locale={locale}
        legacyBehavior={legacyBehavior}
      >
        <Anchor ref={ref} {...rest}>
          {children}
        </Anchor>
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <Anchor href={href} ref={ref} {...rest}>
        {children}
      </Anchor>
    )
  }
  return (
    <Anchor
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      ref={ref}
      {...rest}
    >
      {children}
      {!noIcon && (
        <span>
          <IconExternalLink size={18} className={classes.externalLink} />
        </span>
      )}
    </Anchor>
  )
})

export default CustomLink
