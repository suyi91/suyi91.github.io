// @flow strict
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`404 Not Found - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="404 Not Found">
        <p>页面建设中...</p>
        <img src="/404.jpg" />
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
