import { Image, Text, Container, ThemeIcon, Title, SimpleGrid, createStyles } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: 80,
        paddingBottom: 50,
        minHeight: "50vh",
    },

    item: {
        display: 'flex',
    },

    itemIcon: {
        padding: theme.spacing.xs,
        marginRight: theme.spacing.md,
    },

    itemTitle: {
        marginBottom: theme.spacing.xs / 2,
    },

    supTitle: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontWeight: 800,
        fontSize: theme.fontSizes.sm,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        letterSpacing: 0.5,
    },

    title: {
        lineHeight: 1,
        textAlign: 'left',
        marginTop: theme.spacing.xl,
    },

    description: {
        textAlign: 'left',
        marginTop: theme.spacing.xs,
    },

    highlight: {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        padding: 5,
        paddingTop: 0,
        borderRadius: theme.radius.sm,
        display: 'inline-block',
        color: theme.colorScheme === 'dark' ? theme.white : 'inherit',
    },
}));

interface FeatureImage {
    image: string;
    title: React.ReactNode;
    description: React.ReactNode;
}

interface FeaturesImagesProps {
    supTitle: React.ReactNode;
    description: React.ReactNode;
    data: FeatureImage[];
}

export function AboutUs({ }: any) {
    const { classes } = useStyles();

    return (
        <Container size={700} className={classes.wrapper}>
            <Text className={classes.supTitle}>Tentang kami</Text>

            <Title className={classes.title} order={2}>
                Panti Asuhan Muslimin Jaya
            </Title>

            <Container size="lg" p={0}>
                <Text color="dimmed" className={classes.description}>
                    Merupakan Lembaga Panti Asuhan dan Pendidikan Al-Quran berdiri sejak tahun 1975 yang berada di Jl. Dr. Saharjo Jl. Sawo IV No.2, RT.3/RW.7, Manggarai Sel., Kec. Tebet, Jakarta, Daerah Khusus Ibukota Jakarta 12860, tak hanya menampung anak yatim piatu saja melainkan anak-anak terlantar demi terbukanya masa depan mereka.
                </Text>
                <Text color="dimmed"  className={classes.description}>
                Panti asuhan Muslimin jaya putra mampu menampun 25 sampai 30 anak, Saat ini panti asuhan memiliki 17 anak yang terdiri dari 9 putra dan 8 putri dan memiliki Cabang di cisaat sukabumi yang menampung 50 anak
                </Text>
            </Container>
        </Container>
    );
}