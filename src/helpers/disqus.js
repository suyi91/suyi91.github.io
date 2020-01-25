export const getDisqusPageConfig = ({ location, path, title }) => ({
  url: location.origin,
  identifier: path,
  title,
})
