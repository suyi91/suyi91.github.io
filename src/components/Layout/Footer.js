import React from 'react';
import styles from './Footer.module.scss';
import { useSiteMetadata } from '../../hooks';

const Footer = () => {
  const { year } = useSiteMetadata();
  const footerLeft = (
    <span className={styles['footer__left']}>
      © {year} Built with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>
    </span>
  );
  return (
    <footer className={styles['footer']}>
      {footerLeft}
      <span className={styles['footer__divider']}>❤️</span>
    </footer>
  );
};

export default Footer;
