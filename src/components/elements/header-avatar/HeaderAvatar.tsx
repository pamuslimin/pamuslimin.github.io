import { supabase } from "@/supabaseClient";
import { Avatar, Menu, Text, UnstyledButton, useMantineTheme } from "@mantine/core"
import { CaretDown as ChevronDown } from "phosphor-react"
const HeaderAvatar = () => {
  const theme = useMantineTheme()
  const { fullName: userName = "", imageUrl } =
    (localStorage.getItem("profile") && JSON?.parse(localStorage.getItem("profile") ?? "")) || {}

  const userNameInitial = userName
    .split(" ")
    .map((e: string) => e.charAt(0))
    .join("")

  return (
    <Menu width={200} position='bottom-end' transition='pop-top-right'>
      <Menu.Target>
        <UnstyledButton style={{ display: "flex", height: "100%", alignItems: "center" }}>
          <Avatar src={imageUrl} alt={userNameInitial} radius='xl' color='blue' mr={12} size={38} />
          <Text
            weight={600}
            size={14}
            mr={8}
            style={{
              color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
            }}
          >
            {userName}
          </Text>
          <ChevronDown size={16} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            window.location.href = "/app/settings"
          }}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear()
            supabase?.auth?.signOut()
            window.dispatchEvent(new Event("storage"))
          }}
        >
          Keluar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default HeaderAvatar
