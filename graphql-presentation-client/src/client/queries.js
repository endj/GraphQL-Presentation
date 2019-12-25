import { gql } from "apollo-boost";

export const FIND_PRESENTATION_BY_ID = gql`query Presentation($id: ID!){
                                   presentation(id: $id) {
                                     id
                                     title
                                     author {
                                       age
                                       firstName
                                       lastName
                                       id
                                     }
                                     meta {
                                       createdAt
                                       numberOfSlides
                                     }
                                     theme {
                                       font {
                                         family
                                         size
                                       }
                                       colour {
                                         primary
                                         secondary
                                         accent
                                       }
                                     }
                                     pages {
                                       bulletPoints
                                       header
                                       image
                                       id
                                     }
                                   }
                                 }`

export const LIST_ALL_PRESENTATIONS = gql`{
                                   presentations {
                                     id
                                     title
                                     author {
                                       firstName
                                       lastName
                                     }
                                     meta {
                                       createdAt
                                     }
                                     theme {
                                       font {
                                         family
                                         size
                                       }
                                       colour {
                                         primary
                                         secondary
                                         accent
                                       }
                                     }
                                   }
                                 }`