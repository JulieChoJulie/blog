import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from "../../modules/post";
import { withRouter } from 'react-router-dom';


const PostViewerContainer = ({ match }) => {
    // API request when it's first mounted
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading } = useSelector(({ post, loading }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST']
    }));

    useEffect(() => {
        dispatch(readPost(postId));
        // remove post date in redux when unmounted.
        return () => {
            dispatch(unloadPost());
        }
    }, [dispatch, postId])
    return <PostViewer post={post} loading={loading} error={error}/>
};

export default withRouter(PostViewerContainer);