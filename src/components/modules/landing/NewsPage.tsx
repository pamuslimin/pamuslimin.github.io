import { ArticlesCardsGrid } from "@/components/elements/articles-card/ArticleCardGrid";
import { Center, Title } from "@mantine/core";

export function NewsPage() {
  return (
    <>
      <Center mt={48}>
        <Title order={2}>Berita Terkini</Title>

      </Center>
      <ArticlesCardsGrid />
    </>

  );
}
