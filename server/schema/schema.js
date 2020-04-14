const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const Employees = require('../models/employee');
const Companies = require('../models/company')

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    Company:{
        type: CompanyType,
        resolve(parent, args){
            return Companies.findById(parent.companyId)
        }
    }
  }),
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    website: { type: GraphQLString },
    employees:{
        type: new GraphQLList(EmployeeType),
        resolve(parent, args){
            return Employees.find({companyId: parent.id})
        },
    }
  }),
});


const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
         return Employees.findById(args.id)
    },

    },
    company:{
        type:CompanyType,
        args: { id: {type: GraphQLID}},
        resolve(parent, args){
            return Company.findById(args.id)
        }
    },
    employees:{
        type: new GraphQLList(EmployeeType),
        resolve(parent, args){
            return Employees.find({})
        }
    },
    companies:{
        type: new GraphQLList(CompanyType),
        resolve(parent, args){
            return Companies.find({})
        }
    }

  },
});




module.exports = new GraphQLSchema({
  query: Query,
});
