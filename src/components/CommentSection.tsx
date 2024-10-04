import * as React from 'react'

import FormComponent from './FormComponent'
import Comment from './Comment'

import {
    UserComment,
    reducer
} from '../App';

export default function CommentSection({
    comments
}: {
    comments: UserComment[]
}) {
    const [userComments, dispatch] = React.useReducer(reducer, comments)

    return (
        <div className='comments-section p-4 grid gap-4'>
            <FormComponent
                type='comment'
                onUpdate={(value: string) => {
                    dispatch({
                        type: 'CREATE_COMMENT',
                        value
                    })}
                }
            />

            {userComments.map((comment, i) => (
                <Comment
                    comment={comment}
                    updateComment={dispatch}
                    key={i}
                />
            ))}
        </div>
    )
}