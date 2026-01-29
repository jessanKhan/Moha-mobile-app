import { gql } from '@apollo/client';

export const NEWS_ALL_QUERY = gql`
  query NewsAll($page: Float, $limit: Float) {
    newsAll(page: $page, limit: $limit) {
      id
      title
      titleBn
      subtitleBn
      subtitle
      date
      dateBn
      thumbnailUrl
    }
  }
`;
