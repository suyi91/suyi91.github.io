// @flow strict
import React from 'react';
// import ReactDisqusComments from 'react-disqus-comments';
import GitalkComponent from 'gitalk/dist/gitalk-component';
// import { useSiteMetadata } from '../../../hooks';

// type Props = {
//   postTitle: string,
//   postSlug: string
// };

// const Comments = ({ postTitle, postSlug }: Props) => {
//   const { url, disqusShortname } = useSiteMetadata();

//   if (!disqusShortname) {
//     return null;
//   }

//   return (
//     <ReactDisqusComments
//       shortname={disqusShortname}
//       identifier={postTitle}
//       title={postTitle}
//       url={url + postSlug}
//     />
//   );
// };

const Comments = () => {
  const options = {
    clientID: '17f31ff09b4f57a72479',
    clientSecret: 'a9a76b6b4e21452413ea830535fa9304f50ba11a',
    repo: 'suyi.xyz.comments',
    owner: 'suyi91',
    admin: ['suyi91'],
    id: window.location.pathname,
    distractionFreeMode: true
  };

  return (
    <GitalkComponent options={options} />
  );
};

export default Comments;
