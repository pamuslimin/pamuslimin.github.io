import {
  Article,
  Buildings, ChatCentered, Export, HouseSimple,
  ListNumbers,
  MagicWand,
  Money,
  TreeStructure,
  UserCircleGear,
  Users,
  UsersThree,
  WaveTriangle
} from "phosphor-react";
import { NavbarLinkProps } from "./NavbarModule";

export const navList: NavbarLinkProps[] = [
  {
    icon: (active: boolean) => <HouseSimple size={24} weight={active ? "fill" : "regular"} />,
    label: "Dashboard",
    href: "app/",
  },
  {
    icon: (active: boolean) => <UsersThree size={24} weight={active ? "fill" : "regular"} />,
    label: "Anak Asuh",
    href: "app/orphans",
  },
  {
    icon: (active: boolean) => <UserCircleGear size={24} weight={active ? "fill" : "regular"} />,
    label: "Pengurus",
    href: "app/managements",
  },
  {
    icon: (active: boolean) => <Export size={24} weight={active ? "fill" : "regular"} />,
    label: "Pengeluaran",
    href: "app/expenses",
  },
  {
    icon: (active: boolean) => <WaveTriangle size={24} weight={active ? "fill" : "regular"} />,
    label: "Pending Donasi",
    href: "app/pending",
  },
  {
    icon: (active: boolean) => <Money size={24} weight={active ? "fill" : "regular"} />,
    label: "Donasi",
    href: "app/income",
  },
  {
    icon: (active: boolean) => <Article size={24} weight={active ? "fill" : "regular"} />,
    label: "Blog",
    href: "app/blog",
  },
  {
    icon: (active: boolean) => <ChatCentered size={24} weight={active ? "fill" : "regular"} />,
    label: "Pesan",
    href: "app/messages",
  },
];
