const path = require(`path`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // The “graphql” function allows us to run arbitrary
  // queries against the mongoDB graphql schema.

  // Mongodb{dbName}{collection} is a data node type created from mongoDB is a
  // "connection" (a GraphQL convention for accessing a list of nodes) gives
  // us an easy way to query all documents in the mongoDB collection.

  const { data } = await graphql(`
  {
    allMongodbAnsibleCache(limit: 1000) {
      edges {
        node {
            id
            mongodb_id
            data {
            ansible_hostname
            ansible_fqdn
            ansible_os_family
          }
        }
      }
    }
  }
  `)
  // Create pages.
  const pageTemplate = path.resolve(`./src/templates/host.js`)
  // We want to create a detailed page for each
  // document in our mongoDB collection
  for (const { node } of data.allMongodbAnsibleCache.edges) {
    // Gatsby uses Redux to manage its internal state.
    // Plugins and sites can use functions like "createPage"
    // to interact with Gatsby.
    createPage({
      // Each page is required to have a `path` as well
      // as a template component. The `context` is
      // optional but is often necessary so the template
      // can query data specific to each page.
      path: `/${node.data.ansible_hostname}/`,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  }
}