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
  const footerRight = (
    <a className={styles['footer__right']} href="http://www.beian.miit.gov.cn/" target="_blank">
      苏ICP备18013443号
    </a>
  );
  return (
    <footer className={styles['footer']}>
      {footerLeft}
      <span className={styles['footer__divider']}>❤️</span>
      {footerRight}
    </footer>
  );
};

export default Footer;
