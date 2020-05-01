import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Laptop from './Laptop';
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div>
        <main>
          <Laptop/>
        </main>
      </div>
    </>
  )
}

export default Layout
