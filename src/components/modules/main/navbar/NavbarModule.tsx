import {
  Collapse,
  createStyles,
  Group,
  Image,
  Navbar as BaseNavbar,
  Popover,
  ScrollArea,
  Stack,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { ReactNode } from "react";

import { useToggle } from "@mantine/hooks";
import { Link, useMatch } from "@tanstack/react-location";
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  Database,
  Gear,
} from "phosphor-react";
import styles from "./Navbar.module.scss";
import { navList } from "./navList";
import logo from "@/assets/Logo.png";
const useStyles = createStyles((theme) => ({
  link: {
    "&:hover": {
      opacity: 1,
      color: "white",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.green[5] : theme.colors.green[6],
    },
  },

  active: {
    opacity: 1,
    color: "white",
    "&, &:hover": {
      color: "white",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.green[5] : theme.colors.green[6],
    },
  },
}));

export interface NavbarLinkProps {
  icon?: (active: boolean) => ReactNode;
  label: string;
  active?: boolean;
  isExpanded?: boolean;
  links?: NavbarLinkProps[];
  href?: string;
  onClick?(): void;
  level?: number;
}

function NavbarLink({ icon, label, active, isExpanded, links, onClick, level }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  const [opened, toggleOpen] = useToggle();
  const items = (expanded: boolean) =>
    links?.map((item) => (
      <Link to={`/${item.href}`} key={item.href} aria-labeled-by={item.label}>
        {({ isActive }) => (
          <NavbarLink
            {...item}
            level={(level ?? 0) + 1}
            key={item.label}
            active={isActive}
            isExpanded={expanded}
          />
        )}
      </Link>
    ));
  const Button = (
    <UnstyledButton
      name={label}
      className={cx(
        classes.link,
        { [classes.active]: active },
        styles[`level-${level}`],
        styles.link,
        { [styles.active]: active },
      )}
      onClick={() => (links && links.length > 0 ? toggleOpen() : onClick?.())}
    >
      <Group>
        {icon?.(active ?? false)}
        {isExpanded && <span className={styles.label}>{label}</span>}
      </Group>
    </UnstyledButton>
  );
  return isExpanded ? (
    <>
      <Tooltip label={label} position='right' withinPortal transitionDuration={0}>
        {Button}
      </Tooltip>
      {links && links.length > 0 && (
        <Collapse in={opened}>
          <Stack spacing='xs'>{items(isExpanded)}</Stack>
        </Collapse>
      )}
    </>
  ) : (
    <Popover opened={opened} onClose={() => toggleOpen(false)} withinPortal position='right-start'>
      <Popover.Target>{Button}</Popover.Target>
      <Popover.Dropdown>{items(true)}</Popover.Dropdown>
    </Popover>
  );
}

export function Navbar() {
  const [expanded, toggleExpand] = useToggle();
  const { data: { navList: newList } } = useMatch();
  let links: ReactNode[] = [];
  if (newList) {
    links = (newList as NavbarLinkProps[]).map((item) => NavLinkItem(item, expanded));
  } else {
    links = (navList as NavbarLinkProps[]).map((item) => NavLinkItem(item, expanded));
  }

  return (
    <BaseNavbar width={{ base: expanded ? 220 : 80 }} p='xs'  >
      <BaseNavbar.Section mx='-xs' px='xs'>
        {expanded ? <Title
          ta="center" my={"xs"}
          className={styles.title}
          variant='gradient'
          order={3}
          gradient={{ from: "green", to: "cyan" }}
        >
          PA Muslimin Jaya
        </Title>
          : <Image src={logo}></Image>}
      </BaseNavbar.Section>
      <BaseNavbar.Section component={ScrollArea} grow mx='-xs' px='xs'>
        {links}
      </BaseNavbar.Section>
      {/* <BaseNavbar.Section>
        <Stack justify='center' spacing={0}>
          <Link to='/app/settings'>
            {({ isActive }) => (
              <NavbarLink
                active={isActive}
                isExpanded={expanded}
                label='Settings'
                icon={(active) => <Gear size={24} weight={active ? "fill" : "regular"} />}
              />
            )}
          </Link>
        </Stack>
      </BaseNavbar.Section> */}
      <BaseNavbar.Section mx='-xs' px='xs' my={8}>
        <NavbarLink
          icon={() => (expanded ? <CaretDoubleLeft size={24} /> : <CaretDoubleRight size={24} />)}
          label={"Sembunyikan"}
          onClick={() => toggleExpand()}
          isExpanded={expanded}
        />
      </BaseNavbar.Section>
    </BaseNavbar >
  );
}

function NavLinkItem(item: NavbarLinkProps, expanded: boolean): JSX.Element {
  if (!item.href) {
    return <NavbarLink {...item} level={1} key={item.label} isExpanded={expanded} />;
  }
  return (
    <Link to={item?.href ? `/${item?.href}` : "#"} replace={true} key={item.href} aria-labeled-by={item.label}>
      {({ isActive }) => (
        <NavbarLink {...item} level={1} key={item.label} active={isActive} isExpanded={expanded} />
      )}
    </Link>
  );
}
