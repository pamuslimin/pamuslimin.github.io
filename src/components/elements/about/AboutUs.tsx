import { Image, Text, Container, ThemeIcon, Title, SimpleGrid, createStyles } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: 120,
        paddingBottom: 120,
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
        <Container size="md" className={classes.wrapper}>
            <Text className={classes.supTitle}>Tentang kami</Text>

            <Title className={classes.title} order={2}>
                Panti Asuhan Muslimin Jaya
            </Title>

            <Container size="lg" p={0}>
                <Text color="dimmed" className={classes.description}>
                    Merupakan Lembaga Panti Asuhan dan Pendidikan Al-Quran yang berdiri sejak 1975 dan beralamat di Jl. Dr. Saharjo Jl. Sawo IV No.2, RT.3/RW.7, Manggarai Sel., Kec. Tebet, Jakarta, Daerah Khusus Ibukota Jakarta 12860.
                </Text> <Text color="dimmed" className={classes.description}>
                    Pada mulanya, Alm. KH. Muhammad Saman Husni bersama dengan pendiri lainnya hanya mendirikan sebuah lembaga yang bertujuan untuk menampung sumbangan, donasi atau bantuan dari warga sekitar untuk membantu kaum dhuafa, fakir dan yatim/piatu. Namun sekitar tahun 1979 akhirnya memiliki sebuah rumah yang dijadikan sebagai tempat bernaung bagi para anak asuh dan berkomitmen menjadi panti asuhan sampai saat ini. Tidak hanya menampung anak yatim piatu yang tinggal di rumah panti saja melainkan anak-anak yatim, piatu, yatim piatu dan dhuafa yang tinggal di sekitar panti pun ada yang dibina dan diasuh demi terbukanya masa depan mereka.
                </Text> <Text color="dimmed" className={classes.description}>
                    Visi dan misi dari Panti Asuhan Muslimin Jaya adalah mendidik anak-anak bangsa agar menjadi anak yang bermanfaat untuk nusa, bangsa dan agama.
                </Text> <Text color="dimmed" className={classes.description}>
                    Panti Asuhan Muslimin Jaya mampu menampung 25 sampai 30 anak.  Saat ini panti asuhan memiliki 17 anak yang terdiri dari 9 putra dan 8 putri dan memiliki cabang di Cisaat-Sukabumi yang menampung 50 anak.
                </Text> <Text color="dimmed" className={classes.description}>
                    Kegiatan anak asuh saat ini selain pendidikan formal di sekolah baik itu sekolah negeri maupun swasta, ada juga pendidikan non formal seperti kegiatan ekstrakurikuler panahan, badminton, dan lain-lain. Para anak-anak juga dibekali dengan pendidikan agama yang disediakan oleh pihak panti seperti mengaji Al-Quran dan sholat berjamaah.
                </Text> <Text color="dimmed" className={classes.description}>
                    Saat ini Panti Asuhan Muslimin Jaya 100% masih bergantung dengan donasi dari para donatur untuk kegiatan operasional nya. Oleh karena itu, uluran tangan Bapak/Ibu sangat berharga bagi kami semua.
                </Text>     
                 </Container>
        </Container>
    );
}