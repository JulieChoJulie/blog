import React from 'react';
import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
    const { lastPage, posts, loading } = useSelector(({posts, loading}) => ({
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['posts/LIST_POSTS'],
    }));

    // not showing if there is no data or it is loading
    if (loading || !posts) return null;

    // no page value => set 1
    const { tag, username, page = 1 } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    return (
        <Pagination
            tag={tag}
            username={username}
            page={parseInt(page, 10)}
            lastPage={lastPage}
        />
    );
};

export default withRouter(PaginationContainer);