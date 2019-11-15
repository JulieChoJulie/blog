import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 2rem;
 
    h4 {
        color: ${palette.gray[8]};
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.gray[9]}; /* initialize style */
    input,
    button {
        outline: none;
        border: none;
        font-size: 1rem;
    }
    
    input {
        padding: 0.5rem;
        flex: 1;
    }
    
    button {
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &:hover {
            background: ${palette.gray[6]};
        }
    }
`;

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

// using React.memo, TagItem is only re-rendered when tag is changed.
const TagItem = React.memo(({ tag }) => <Tag>#{tag}</Tag>);

// using React.memo, rerender taglist only when 'tags' is changed.
const TagList = React.memo(({ tags }) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} />
        ))}
    </TagListBlock>
));

const TagBox = () => {
    return (
        <TagBoxBlock>
            <h4>Tag</h4>
            <TagForm>
                <input placeholder="Type tag here.." />
                <button type="submit">Add</button>
            </TagForm>
            <TagList tags={['tag1', 'tag2', 'tag3']} />
        </TagBoxBlock>
    );
};

export default TagBox;