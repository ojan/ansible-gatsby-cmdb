import Layout from "../components/layout"
import React from "react"
import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Liste des nodes AWF</h1>
    <ul>
      {data.allMongodbAnsibleCache.edges.map(document => (
        <li key={document.node.id}>
            <Link to={`/${document.node.data.ansible_hostname}`}>{document.node.data.ansible_hostname}</Link>: {document.node.data.ansible_os_family}
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`  
query MongoQuery {
  allMongodbAnsibleCache {
    edges {
      node {
        id
        mongodb_id
        data {
          ansible_hostname
          ansible_os_family
          ansible_processor_count
        }
      }
    }
  }
}
`
