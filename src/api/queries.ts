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

export const GET_EVENTS_QUERY = gql`
  query GetEvents($page: Float, $limit: Float, $pageId: Float) {
    events(page: $page, limit: $limit, pageId: $pageId) {
      id
      title
      titleBn
      fromDate
      fromDateBn
    }
  }
`;

export const CATEGORY_BY_COMPONENT_ID = gql`
  query CategoryByComponentId($componentId: Int!) {
    categoryByComponentId(componentId: $componentId) {
      id
      menuId
      componentId
      name
      nameBn
      logoUrl
      color
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;

export const ALL_QUICK_LINKS = gql`
  query AllQuickLinks($page: Float!, $limit: Float!) {
    allQuickLinks(page: $page, limit: $limit) {
      id
      label
      labelBn
      url
      category
      createdAt
      updateAt
    }
  }
`;

export const POLICIES_QUERY = gql`
  query Policies($page: Int!, $limit: Int!) {
    policies(page: $page, limit: $limit) {
      id
      title
      titleBn
      attachmentUrl
      description
      descriptionBn
      date
      isPublished
    }
  }
`;
