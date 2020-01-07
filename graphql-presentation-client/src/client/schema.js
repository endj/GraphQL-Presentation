
export const SCHEMA = `
type Query {
    presentations: [Presentation!]!
    presentation(id: ID!): Presentation!
}

type Presentation {
    id: ID!
    title: String!
    author: Author
    meta: Meta
    theme: Theme
    pages: [Page!]
}

type Page {
    bulletPoints: [String!]
    header: String
    image: String
    id: ID!
}

type Author {
    age: Int
    firstName: String
    lastName: String
    id: ID!
}

type Meta {
    createdAt: String!
    numberOfSlides: Int!
}

type Theme {
    font(theme: FontTheme!): Font!
    colour(theme: ColourTheme!): Colour!
}

type Font {
    family: String
    size: String
    colour: String
}

type Colour {
    primary: String
    secondary: String
    accent: String
}

enum ColourTheme {
    DARK,
    LIGHT,
    GREEN
}

enum FontTheme {
    MONO,
    MONO_LIGHT,
    PRESENTATION,
    PRESENTATION_LIGHT
}


`;