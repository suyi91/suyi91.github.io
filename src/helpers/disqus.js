export const getDisqusPageConfig = ({ path, title }) => ({
  url: location.origin,
  identifier: path,
  title,
})
