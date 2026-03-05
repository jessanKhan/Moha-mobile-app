import { gql } from '@apollo/client';

export const CREATE_COMPLAIN = gql`
  mutation CreateComplain($createComplainInput: CreateComplainInput!) {
    createComplain(createComplainInput: $createComplainInput) {
      id
      name
      fatherName
      motherName
      guardianName
      nid
      passport
      age
      dob
      isMinor
      gender
      nationality
      language
      address
      email
      phone
      description
      incidentDate
      incidentAge
      district
      subdistrict
      incidentAddress
      attachmentUrl
      suspectInfo {
        name
      }
      createdAt
    }
  }
`;

export const CREATE_CRIMINAL = gql`
  mutation CreateCriminal(
    $name: String,
    $nickname: String,
    $age: String,
    $gender: String,
    $phone: String,
    $socialMedia: String,
    $location: String,
    $activity: [String!],
    $activityArea: String,
    $activityPlace: String,
    $activityAddress: String,
    $activityTime: String,
    $activityDescription: String,
    $revealIdentity: YesOrNo!,
    $photoUrl: Upload,
    $documents: [CreateCriminalDocumentInput!]
  ) {
    createCriminal(
      createCriminalInput: {
        name: $name,
        nickname: $nickname,
        age: $age,
        gender: $gender,
        phone: $phone,
        socialMedia: $socialMedia,
        location: $location,
        activity: $activity,
        activityArea: $activityArea,
        activityPlace: $activityPlace,
        activityAddress: $activityAddress,
        activityTime: $activityTime,
        activityDescription: $activityDescription,
        revealIdentity: $revealIdentity,
        photoUrl: $photoUrl,
        documents: $documents
      }
    ) {
      id
      name
      nickname
      age
      gender
      photoUrl
      phone
      socialMedia
      location
      activity
      activityArea
      activityPlace
      activityAddress
      activityTime
      activityDescription
      documents {
        id
        criminalId
        fileName
        fileUrl
        description
        createdAt
      }
      revealIdentity
      createdAt
    }
  }
`;
