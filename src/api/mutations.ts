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
  mutation CreateCriminal($createCriminalInput: CreateCriminalInput!) {
    createCriminal(createCriminalInput: $createCriminalInput) {
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
      activityDescription
      revealIdentity
      createdAt
    }
  }
`;
