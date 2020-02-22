// @flow strict
import React, { useEffect } from 'react';
// import ReactDisqusComments from 'react-disqus-comments';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
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

type Props = {
  postTitle: String,
};

const Comments = ({ postTitle }: Props) => {
  useEffect(() => {
    /**
     * gitalk
     * @see https://github.com/gitalk/gitalk/blob/master/readme-cn.md
     */
    const gitalk = new Gitalk({
      clientID: '17f31ff09b4f57a72479',
      clientSecret: 'a9a76b6b4e21452413ea830535fa9304f50ba11a',
      repo: 'suyi.xyz.comments',
      owner: 'suyi91',
      admin: ['suyi91'],
      labels: ['suyi.xyz', 'blog'],
      title: postTitle,
      distractionFreeMode: true
    });

    gitalk.render('gitalk-container');
  });

  return (
    <div id="gitalk-container"></div>
  );
};

export default Comments;
