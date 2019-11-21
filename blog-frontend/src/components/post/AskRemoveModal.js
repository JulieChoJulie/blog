import React from 'react';
import AskModel from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <AskModel
            visible={visible}
            title="Delete the post."
            description="Do you want to delete this post?"
            confirmText="Delete"
            onCancel={onCancel}
            onConfirm={onConfirm}
        />
    );
};

export default AskRemoveModal;