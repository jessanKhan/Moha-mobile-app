import { gql } from '@apollo/client';

export const NEWS_ALL_QUERY = gql`
  query GetNews($page: Float, $limit: Float, $pageId: Float) {
    newsAll(page: $page, limit: $limit, pageId: $pageId) {
      id
      pageId
      isCopiedTo
      category
      title
      titleBn
      subtitle
      subtitleBn
      description
      descriptionBn
      date
      dateBn
      slug
      order
      reporter
      thumbnailUrl
      isMarquee
      isPublished
      isArchived
      isApprovedByAdmin
      isCommitment
      createdAt
      createdBy
      updatedAt
      updatedBy
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
      viewAllLink
      color
      iconName
      mobileRouteName
      iconGradientColors
      createdAt
      createdBy
      updatedAt
      updatedBy
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

export const INITIATIVES_QUERY = gql`
  query Initiatives($page: Float!, $limit: Float!) {
    initiatives(page: $page, limit: $limit) {
      id
      title
      titleBn
      subtitle
      subtitleBn
      description
      descriptionBn
      order
      color
      iconName
      attachmentUrl
      isPublished
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;
export const CONTENTS_BY_COMPONENT_ID = gql`
  query ContentsByComponentId($componentId: Float!) {
    contentsByComponentId(componentId: $componentId) {
      id
      pageId
      componentId
      title
      titleBn
      subtitle
      subtitleBn
      description
      descriptionBn
      order
      color
      iconName
      iconUrl
      items {
        id
        contentId
        title
        titleBn
        subtitle
        subtitleBn
        description
        descriptionBn
      }
    }
  }
`;

export const SERVICES_QUERY = gql`
  query Services($page: Float!, $limit: Float!) {
    services(page: $page, limit: $limit) {
      id
      title
      titleBn
      subtitle
      subtitleBn
      description
      descriptionBn
      isCenter
      order
      color
      iconName
      attachmentUrl
      isPublished
    }
  }
`;

export const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      id
      name
      nameBn
      code
    }
  }
`;

export const HOTLINES_BY_COUNTRY_QUERY = gql`
  query HotlinesByCountry($page: Int, $limit: Int, $country: String!) {
    hotlinesByCountry(page: $page, limit: $limit, country: $country) {
      id
      country
      countryBn
      title
      titleBn
      number
      numberBn
      link
      logoUrl
      color
      order
      isPublished
    }
  }
`;
export const CENTERS_BY_SERVICE_ID = gql`
  query CentersByServiceId($serviceId: Float!) {
    centersByServiceId(serviceId: $serviceId) {
      id
      serviceId
      urgency
      priority
      name
      nameBn
      district
      districtBn
      address
      addressBn
      phone
      phoneBn
      capacity
      capacityBn
      attachmentUrl
      isPublished
    }
  }
`;

export const AIDS_BY_SERVICE_ID = gql`
  query AidsByServiceId($serviceId: Float!) {
    aidsByServiceId(serviceId: $serviceId) {
      id
      serviceId
      title
      titleBn
      subtitle
      subtitleBn
      description
      descriptionBn
      iconName
      attachmentUrl
      order
      isPublished
      topics {
        id
        aidId
        title
        titleBn
        subtitle
        subtitleBn
        description
        descriptionBn
        iconName
        attachmentUrl
        order
      }
      cards {
        id
        aidId
        title
        titleBn
        subtitle
        subtitleBn
        description
        descriptionBn
        iconName
        attachmentUrl
        order
      }
      promos {
        id
        aidId
        title
        titleBn
        subtitle
        subtitleBn
        description
        descriptionBn
        iconName
        attachmentUrl
        order
      }
    }
  }
`;

export const REPORT_TABLES_QUERY = gql`
  query ReportTables {
    reportTables {
      id
      name
      nameBn
      slug
      month
      year
      division
      district
      upazilla
      columns
      createdAt
      updatedAt
      rows {
        id
        tableId
        data
        year
        month
        division
        district
        upazilla
        createdAt
        updatedAt
      }
    }
  }
`;


export const GET_CATEGORIES_OF_POLICY = gql`
  query GetCategoriesOfPolicy {
    categoriesOfPolicy {
      id
      name
      nameBn
    }
  }
`;

export const GET_POLICIES_BY_CATEGORY = gql`
  query GetPoliciesByCategory($category: String!) {
    policiesByCategory(category: $category) {
      id
      title
      titleBn
      attachmentUrl
      date
      dateBn
    }
  }
`;

export const GET_ALL_ACHIEVEMENTS = gql`
  query GetAllAchievements($page: Float, $limit: Float, $pageId: Float) {
    allAchievements(page: $page, limit: $limit, pageId: $pageId) {
      id
      pageId
      isCopiedTo
      slug
      category
      title
      titleBn
      subtitle
      subtitleBn
      description
      descriptionBn
      order
      fromDate
      toDate
      fromDateBn
      toDateBn
      location
      locationBn
      thumbnail
      photos {
        id
        achievementId
        url
        createdAt
        createdBy
        updatedAt
        updatedBy
      }
      isMarquee
      isArchived
      isPublished
      isApprovedByAdmin
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;
