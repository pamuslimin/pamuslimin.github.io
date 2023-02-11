import { ArticlesCardsGrid } from "@/components/elements/articles-card/ArticleCardGrid";
import { Center, ScrollArea, Title } from "@mantine/core";

export function NewsPage() {
  return (
    <>
      <ScrollArea style={{ height: "800px", marginBottom: "20px", justifyContent: "center" }}>

        <script src="https://embedsocial.com/js/iframe.js"></script><iframe style={{ border: 0, width: "80%", marginLeft: "10%", height: "2500px" }} scrolling="no" src="https://embedsocial.com/api/pro_hashtag/7f53b30424eeef6ea7dc4c3467e092fb665515f4"></iframe><script>iFrameResize();</script>

      </ScrollArea>
    </>

  );
}
