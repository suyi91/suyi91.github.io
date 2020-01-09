import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({ copyrights }) => (
  <footer>
    {copyrights ? (
      <div
        dangerouslySetInnerHTML={{
          __html: copyrights,
        }}
      />
    ) : (
      <>
        <span className="footerCopyrights">
          © 2019 Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </span>
        <span className="footerCopyrights">
          <a
            href="http://www.beian.miit.gov.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="beian"
          >
            苏ICP备18013443号
          </a>
        </span>
      </>
    )}
  </footer>
)

Footer.propTypes = {
  copyrights: PropTypes.string,
}

export default Footer
