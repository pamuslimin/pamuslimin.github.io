import { FunctionComponent, SVGProps } from "react"

import clsx from "clsx"

import styles from "./Icon.module.scss"

interface IconProps {
  className?: string
  component: FunctionComponent<SVGProps<SVGSVGElement>>
  size?: string | number
  color?: string
}

const Icon = ({
  className,
  component: C,
  color,
  size = "24px",
  ...props
}: IconProps): JSX.Element => {
  return (
    <div
      className={clsx([styles.icon, className, color && styles[color]])}
      style={{
        width: size,
        height: size,
        color,
      }}
      {...props}
    >
      {<C />}
    </div>
  )
}

export default Icon
