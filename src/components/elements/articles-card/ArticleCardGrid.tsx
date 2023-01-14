import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';

const mockdata = [
  {
    title: 'Selamat Hari Raya Idul Fitri 1442H',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipNTZ9q32w6OKW72c6LgmK3-HmCxHjElH6pqTsNb=s1024-p-no-v1',
    date: '11 Mei 2021',
  },
  {
    title: 'Jazakumullah Khoiron Katsiron',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipNRnbBsyEdI59xUWIRYdp0vf7CU6x1mXj7OkDZB=s1024-p-no-v1',
    date: '5 Mei 2021',
  },
  {
    title: 'Percantik dan Tambahkan Kesempurnaan',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipPXvAxwV55zJOtR1DBwavXUxj-lYHCCCtvXhLew=w960-h960-n-o-v1',
    date: '3 Mei 2021',
  },
  {
    title: 'Selamat Menunaikan Ibadah Puasa 1442 H.',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipMVOfNDPCZWXkaakqTZOfvk5mAcC-OWicmfed5B=w960-h960-n-o-v1',
    date: '22 April 2021',
  },
  {
    title: 'Jazakumullah Khoiron Katsiron',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipNRnbBsyEdI59xUWIRYdp0vf7CU6x1mXj7OkDZB=s1024-p-no-v1',
    date: '5 Mei 2021',
  },
  {
    title: 'Percantik dan Tambahkan Kesempurnaan',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipPXvAxwV55zJOtR1DBwavXUxj-lYHCCCtvXhLew=w960-h960-n-o-v1',
    date: '3 Mei 2021',
  },
  {
    title: 'Selamat Menunaikan Ibadah Puasa 1442 H.',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipMVOfNDPCZWXkaakqTZOfvk5mAcC-OWicmfed5B=w960-h960-n-o-v1',
    date: '22 April 2021',
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export function ArticlesCardsGrid() {
  const { classes } = useStyles();

  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 3 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}