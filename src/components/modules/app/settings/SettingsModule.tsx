import { Button, NavLink, Select, Stack, Tabs, TextInput, Title } from "@mantine/core"
import { ColorSchemeToggle } from "../../../elements/color-scheme-switch/ColorSchemeSwitch"
import { SwitchesCard } from "../../../elements/switches-card/SwitchesCard"
import { useStyles } from "../../../../styles/shared.styles"
import classes from "./SettingsModule.module.scss"
import clsx from "clsx"
import { BoundingBox, Notification, UserGear } from "phosphor-react"
import InProgressNotification from "@/components/elements/in-progress-card/InProgress"
function SettingsModule() {
  const { classes: styles } = useStyles()
  return (
    <>
      <Tabs
        variant='pills'
        orientation='vertical'
        defaultValue='general'
        style={{ height: "100%", minHeight: "calc(100vh - 64px)" }}
      >
        <Tabs.List className={clsx(classes.sidebar, styles.header)}>
          <Title my={16} order={4}>
            Pengaturan
          </Title>
          <Tabs.Tab value='general' icon={<BoundingBox size={14} />}>
            Umum
          </Tabs.Tab>
          <Tabs.Tab value='profile' icon={<UserGear size={14} />}>
            Profil
          </Tabs.Tab>
          <Tabs.Tab value='notifications' icon={<Notification size={14} />}>
            Notifikasi
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='general' className={classes.content}>
          <SwitchesCard
            className={classes.switchGroup}
            title={"Tampilan"}
            description={""}
            data={[
              {
                title: "Bahasa",
                description: "Pilih bahasa yang akan digunakan",
                switch: (
                  <Select
                    placeholder='pilih bahasa'
                    withinPortal
                    value={"id-js"}
                    data={[
                      { value: "en", label: "English" },
                      { value: "id", label: "Indonesia" },
                      { value: "id-js", label: "Jakselian" },
                    ]}
                  />
                ),
              },
              {
                title: "Tema",
                description: "Ubah tema aplikasi",
                switch: <ColorSchemeToggle />,
              },
            ]}
          />
        </Tabs.Panel>
        <Tabs.Panel value='profile' className={classes.content}>
          <SwitchesCard
            className={classes.switchGroup}
            title={"Profil"}
            description={""}
            data={[
              {
                title: "Nama",
                description: "Ubah nama pengguna",
                switch: <TextInput />,
              },
            ]}
          />
          <SwitchesCard
            className={classes.switchGroup}
            title={"Keamanan"}
            description={""}
            data={[
              {
                title: "Ganti kata sandi",
                description: "Ubah password pengguna",
                switch: <Button>Ganti Password</Button>,
              },
            ]}
          />
          <SwitchesCard
            className={classes.switchGroup}
            title={"Keamanan"}
            description={""}
            data={[
              {
                title: "Ganti kata sandi",
                description: "Ubah password pengguna",
                switch: <Button>Ganti Password</Button>,
              },
            ]}
          />
        </Tabs.Panel>

        <Tabs.Panel value='notifications' className={classes.content}>
          <InProgressNotification />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default SettingsModule
