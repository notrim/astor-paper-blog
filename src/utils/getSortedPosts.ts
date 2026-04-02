import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort((a, b) => {
      const aSeriesOrder = a.data.seriesOrder;
      const bSeriesOrder = b.data.seriesOrder;
      
      if (aSeriesOrder !== undefined && bSeriesOrder !== undefined) {
        return aSeriesOrder - bSeriesOrder;
      } else if (aSeriesOrder !== undefined) {
        return -1;
      } else if (bSeriesOrder !== undefined) {
        return 1;
      } else {
        return (
          Math.floor(
            new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
          ) -
          Math.floor(
            new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
          )
        );
      }
    });
};

export default getSortedPosts;
