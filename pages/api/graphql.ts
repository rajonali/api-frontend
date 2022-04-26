import {ApolloServer, gql} from 'apollo-server-micro';
import {PrismaClient} from '@prisma/client';
import Cors from 'micro-cors';
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient()

const cors = Cors();

const typeDefs = gql`

type User {
    id: String,
    name: String,
    image: String,
}



    type Card {
        id: String!,
        name: String!,
        email: String!,
        phone: String!,
        bio: String!,
        twitter: String!,
        github: String!,
        website: String!, 
        }

        input CardInput {
            name: String!,
            email: String!, 
            phone: String!,
            bio: String!,
            twitter: String!,
            github: String!,
            website: String!,
        } 
        
        type Query {
            getUserInfo(id: String!): User,
            getCards: [Card],
            getCard(id: String!): Card 
            }



        type Mutation {
            addCard( input: CardInput!): Card
            deleteCard(id: String!): Card

    }


`;

const resolvers = {
    Query: {
        getCards: async () => {
            const cards = await prisma.card.findMany({
                take: 2, 
            })
            return cards  

        },

        getCard: async (_, args) => {
            return prisma.card.findUnique({
                where: {
                    id: args.id
                }
            }
            )
        },

        getUserInfo: async (_, args) => {
            return prisma.user.findUnique({
                where: {
                    id: args.id 
                }
            })
        }

    },

    Mutation : {
        addCard: async (_, args) => {
            return prisma.card.create({
                data: {...args.input, id: uuidv4()},
            }) 
        },
        deleteCard: async (_, args) => {
            return prisma.card.delete({
                where: {
                    id: args.id,
                }
            })
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
    }
}

const apolloServer  = new ApolloServer({  typeDefs,  resolvers,  });

const startServer = apolloServer.start();

export default async function handler(req, res)  {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://studio.apollographql.com"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
    );
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }
  
    await startServer;
    
    await apolloServer.createHandler({
      path: "/api/graphql",
    })(req, res);

};
  


  



