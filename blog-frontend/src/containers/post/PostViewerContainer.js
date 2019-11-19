import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from "../../modules/post";
import { withRouter } from 'react-router-dom';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from "../../modules/write";

const PostViewerContainer = ({ match, history }) => {
    // API request when it's first mounted
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user
    }));

    useEffect(() => {
        dispatch(readPost(postId));
        // remove post date in redux when unmounted.
        return () => {
            dispatch(unloadPost());
        }
    }, [dispatch, postId]);

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        history.push('/write');
    }
    return <PostViewer
        post={post}
        loading={loading}
        error={error}
        actionButtons={<PostActionButtons onEdit={onEdit} />}
        ownPost={user && user.id === post && post.user.id}
    />
};

export default withRouter(PostViewerContainer);