const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require('graphql');


const findById = (collection, id) => collection?.find(item => item.id == id);

const movies = [
  { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: 1 },
  { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2' },
  { id: 3, name: 'V for vendetta',  genre: 'Sci-Fi-Triller', directorId: 3 },
  { id: 4, name: 'Snatch', genre: 'Crime-Comedy', directorId: '4' },
  { id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
  { id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: 1 },
  { id: 7, name: 'Inglourious Bastards', genre: 'Crime', directorId: '1' },
  { id: '8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4' },
];

const directors = [
  { id: '1', name: 'Quentin Tarantino', age: 55 },
  { id: '2', name: 'Michael Radford', age: 72 },
  { id: 3, name: 'James McTeigue', age: 51 },
  { id: 4, name: 'GuyRitchie', age: 50 },
];


const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve: (parent, args) => {
        return findById(directors, parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => {
        return movies.filter(movie => movie.directorId == parent.id);
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => {
        return movies;
      },
    },
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return findById(movies, args.id);
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: (parent, args) => {
        return directors;
      },
    },
    director: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return findById(directors, args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
