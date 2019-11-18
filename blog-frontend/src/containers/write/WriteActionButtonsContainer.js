import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { title, body, tags, post, postError } = useSelector(
        ({ write }) => ({
            title: write.title,
            body: write.body,
            tags: write.tags,
            post: write.post,
            postError: write.postError
        })
    );

    // Add post
    const onPublish = () => {
        dispatch(writePost({
            title,
            body,
            tags
        }));
    };

    // cancel
    const onCancel = () => {
        history.goBack();
    };

    // after success or failure
    useEffect(() => {
        if (post) {
            const { _id, user } = post;
            history.push(`/@${user.username}/${_id}`);
        }
        if (postError) {
            console.log(postError);
        }
    }, [history, post, postError]);

    return <WriteActionButtons onCancel={onCancel} onPublish={onPublish}/>
};

export default withRouter(WriteActionButtonsContainer);