const { ApolloServer, gql } = require('apollo-server-azure-functions');

// A schema is a collection of type definitions (hence "typeDefs") that
// together define the "shape" of queries that are executed against your data.
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  # This is a name type to display name
  type Name {
      firstName: String
      lastName: String
  }

  # Type for storing urls of the professional links: linkedin and github
  type Professional {
    email: String
    website: String
    linkedin: String
    github: String
  }

  # Type for storing urls of the social links: insta and twitter
  type Social {
    instagram: String
    twitter: String
  }

  # Type for multi level types
  type Connect {
      professional: Professional
      social: Social
  }

  # Type for the different skills I am associated with
  type Skills {
      language: [String]
      database: [String]
      cloudService: [String]
      frameworks: [String]
      vcs: [String]
      api: [String]
      industryKnowledge: [String]
  }

  # All the querying items
  type Query {
    hello: String
    name: Name
    connect: Connect
    skills: Skills
  }
`;

// The initialized schema, generally these are linked with databases
const Name = {
        firstName: "Aditya",
        lastName: "Raman"
    }

const Connect = {
    professional: {
        email: "adityaraman96@gmail.com",
        website: "https://www.ramanaditya.com",
        linkedin: "https://www.linkedin.com/in/ramanaditya/",
        github: "https://github.com/ramanaditya"
    },
    social: {
        instagram: "https://www.instagram.com/_adityaraman/",
        twitter: "https://twitter.com/_adityaraman"
    }
};

const Skills = {
    language: ["Python", "JavaScript", "Cpp", "Golang"],
    database: ["MySQL", "Postgres", "Firebase", "sqlite3"],
    cloudService: ["Azure", "GCP", "AWS"],
    frameworks: ["Django", "Flask", "NodeJs"],
    vcs: ["git", "GitHub", "Azure DevOps", "Gitlab"],
    api: ["REST", "GraphQL"],
    industryKnowledge: ["Data Structures", "Algorithms", "Serverless"]
}


// Resolvers define the technique for fetching the types defined in the schema
const resolvers = {
  Query: {
    hello: () => 'Hello world! I am Aditya Raman',
    name: () => Name,
    connect: () => Connect,
    skills: () => Skills
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();