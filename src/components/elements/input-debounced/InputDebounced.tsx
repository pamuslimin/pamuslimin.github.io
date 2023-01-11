import { FC, useEffect, useState } from "react"
import clsx from "clsx"
import styles from "./InputDebounced.module.scss"
import { MagnifyingGlass as Search } from "phosphor-react"
import { Input } from "@mantine/core"
import { useDebouncedValue, usePrevious } from "@mantine/hooks"

type InputDebouncedProps = {
  className?: string
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

const InputDebounced: FC<InputDebouncedProps> = ({
  className,
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: InputDebouncedProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue)
  const [debounced] = useDebouncedValue(value, 200)

  useEffect(() => {
    onChange?.(debounced)
  }, [debounced])

  return (
    <Input
      className={clsx(styles.InputDebounced, className)}
      onChange={(event: any) => setValue(event.target.value)}
      placeholder='Cari'
      radius='sm'
      rightSection={<Search size={16} />}
      size='md'
      value={value}
      width={100}
    />
  )
}

export default InputDebounced
