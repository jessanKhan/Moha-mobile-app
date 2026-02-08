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


export const GET_SLIDERS_QUERY = gql`
  query Sliders($page: Float!, $limit: Float!) {
    sliders(page: $page, limit: $limit) {
      id
      title
      titleBn
      subtitle
      subtitleBn
      mediaUrl
    }
  }
`;

export const COMPONENTS_QUERY = gql`
  query Components($page: Float!, $limit: Float!) {
    components(page: $page, limit: $limit) {
      id
      label
      labelBn
      thumbnailPath
      mobileRouteName
      iconGradientColors
      iconName
      isMobile
    }
  }
`;
