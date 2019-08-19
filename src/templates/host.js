import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Link } from "gatsby"

class Item extends React.Component {
  render() {
    const fact = this.props.data.mongodbAnsibleCache

    return (
      <Layout>
        <div>
          <h1>{fact.data.ansible_hostname}</h1>
          <p>{fact.data.ansible_all_ipv4_addresses}</p>
      </div>
      <Link to="/cmdb/">Retour CDMB</Link>
      </Layout>
    )
  }
}

export default Item

export const pageQuery = graphql`
  query($id: String!) {
    mongodbAnsibleCache(id: {eq: $id }) {
      id
      data {
        ansible_fqdn
        ansible_hostname
        ansible_all_ipv4_addresses
      }
    }
  }
`