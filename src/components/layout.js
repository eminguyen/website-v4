import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import LaptopRig from './LaptopRig';
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
          <LaptopRig/>
        </main>
      </div>
    </>
  )
}

export default Layout
