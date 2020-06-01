import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Provider } from 'react-redux';

import configureStore, { history } from '../store';
import Header from "./header";
import LaptopRig from './LaptopRig';
import "./layout.css"

const store = configureStore();

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
          <Provider store={store}>
            <LaptopRig store={store}/>
          </Provider>
        </main>
      </div>
    </>
  )
}

export default Layout
