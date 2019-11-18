import React, { useEffect } from 'react';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PostListContainer = ({ location }) => {
    const dispatch = useDispatch();
    const { posts, error, loading, user } = useSelector(
        ({ posts, loading, user }) => ({
            posts: posts.posts,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        })
    );
    useEffect(() => {
        const { tag, username, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listPosts({ tag, username, page }));
    }, [dispatch, location.search]);

    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            showWriteButton={user}
        />
    );
};

export default withRouter(PostListContainer);