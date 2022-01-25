const { GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema } = require('graphql');
const axiox = require('axios');
const { default: axios } = require('axios');

// Launch type
const launchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        lauch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
});

// Rocket type

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
});

// Root Query
// fields are having object 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(launchType),
            resolve(parent, args) {
                return axiox.get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);
            }
        },
        launch:{
            type:launchType,
            args:{
                flight_number:{type:GraphQLInt}
                 },
                resolve(parent,args){
                    return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res =>res.data);
                }
            }
        }
    }
);


module.exports = new GraphQLSchema({
    query: RootQuery
})