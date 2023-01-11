import { ActionIcon, TextInput } from "@mantine/core"
import { useRef } from "react"
import { MagnifyingGlass as Search } from "phosphor-react"
import styles from "./SearchBar.module.scss"

type SearchBarProps = {
  onClick: (value?: string) => void
  placeholder?: string
}

const SearchBar = ({ onClick, placeholder }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.searchWrapper}>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        radius={6}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            onClick(inputRef?.current?.value)
          }
        }}
      />
      <ActionIcon
        onClick={() => onClick(inputRef?.current?.value)}
        variant='subtle'
        color='green'
        size={36}
        radius={6}
      >
        <Search size={16} />
      </ActionIcon>
    </div>
  )
}

export default SearchBar
