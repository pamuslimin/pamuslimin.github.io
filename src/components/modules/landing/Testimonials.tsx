import { Carousel } from "@mantine/carousel";
import { useMantineTheme, Image, Group, Stack, Text, Container, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
const data = [
  {
    image: "https://nkptjnpkjiavarhbrjes.supabase.co/storage/v1/object/public/images/kid%20(2).jpg?t=2023-01-15T14%3A42%3A00.869Z",
    testimonials: "Saya ingin jadi dosen",
    name: "Andi Rahman",
  },
  {
    image: "https://nkptjnpkjiavarhbrjes.supabase.co/storage/v1/object/public/images/kid.jpg?t=2023-01-15T14%3A42%3A12.690Z",
    testimonials: "Cita cita saya adalah seorang saudagar",
    name: "Susanto Gusta",
  },
  {
    image: "https://nkptjnpkjiavarhbrjes.supabase.co/storage/v1/object/public/images/kid%20(2).jpg?t=2023-01-15T14%3A42%3A00.869Z",
    testimonials: "Saya bermimpi menjadi pesiar",
    name: "Murdi Layardi",
  },
  {
    image: "https://nkptjnpkjiavarhbrjes.supabase.co/storage/v1/object/public/images/kid.jpg?t=2023-01-15T14%3A42%3A12.690Z",
    testimonials: "Saya bercita cita menjadi pemain sepakbola",
    name: "Sepa Tubaru",
  },
  {
    image: "https://nkptjnpkjiavarhbrjes.supabase.co/storage/v1/object/public/images/kid%20(2).jpg?t=2023-01-15T14%3A42%3A00.869Z",
    testimonials: "Saya ingin menjadi pilot.",
    name: "Alam Ikhsan",
  },

];
export function Testimonials(): JSX.Element {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.name}>
      <Group align={"center"} h="100%">
        <Image width={200} height={200} withPlaceholder src={item.image} />
        <Stack>
          <Text color="dark">{item.testimonials}</Text>
          <Text color="dimmed" size={18}>{item.name}</Text>
        </Stack>
      </Group>
    </Carousel.Slide>
  ));

  return (
    <Container size="xl">
      <Title order={2}  >Bantu Kami Mengantar Mereka Menuju Mimpinya</Title>
      <Carousel
        slideSize="50%"
        mx="md"
        height={300}
        breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
        slideGap="xl"
        align="center"
        slidesToScroll={mobile ? 1 : 2}
      >
        {slides}
      </Carousel>
    </Container>
  );
}
