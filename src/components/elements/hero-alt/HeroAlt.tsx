import { createStyles, Overlay, Title, Container, Button, Text } from "@mantine/core";
import heroImg from "@/assets/heroImg.png";
const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: 180,
        paddingBottom: 130,
        backgroundImage:
            `url('${heroImg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        '@media (max-width: 520px)': {
            paddingTop: 80,
            paddingBottom: 50,
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    title: {
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: -1,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        color: theme.white,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        '@media (max-width: 520px)': {
            fontSize: 28,
            textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor][4],
    },

    description: {
        color: theme.colors.gray[0],
        textAlign: 'center',

        '@media (max-width: 520px)': {
            fontSize: theme.fontSizes.md,
            textAlign: 'left',
        },
    },

    controls: {
        marginTop: theme.spacing.xl * 1.5,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,

        '@media (max-width: 520px)': {
            flexDirection: 'column',
        },
    },

    control: {
        height: 42,
        fontSize: theme.fontSizes.md,

        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        '@media (max-width: 520px)': {
            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },

    secondaryControl: {
        color: theme.white,
        backgroundColor: 'rgba(255, 255, 255, .4)',

        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .45) !important',
        },
    },
}));

export function HeroAlt({ onDonateClick, onAboutClick }: any) {
    const { classes, cx } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    Mari Kita
                    Berbagi Dengan Sesama !
                </Title>

                <Container size={640}>
                    <Text size="lg" className={classes.description}>
                        Salurkan dana dan donasi terbaik Anda kepada kami, insya Allah kami akan
                        menyalurkan dana dan donasi Anda menjadi shodaqoh jariah yang terus membawa
                        manfaat..
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Button className={classes.control} variant="white" size="lg" onClick={()=> onDonateClick?.()}>
                        Mulai Berdonasi
                    </Button>
                    <Button className={cx(classes.control, classes.secondaryControl)} size="lg" onClick={()=> onAboutClick?.()}>
                        Pelajari lebih lanjut
                    </Button>
                </div>
            </div>
        </div>
    );
}