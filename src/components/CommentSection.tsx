import * as React from 'react'

import FormComponent from './FormComponent'
import Comment from './Comment'

import {
    currentUser,
    UserComment,
    UserReply
} from '../App';

export let nextID = 3

export default function CommentSection({
    comments
}: {
    comments: UserComment[]
}) {
    const [userComments, dispatch] = React.useReducer((state: UserComment[], action: {
        type: string
        value: UserComment
    }) => {
        switch (action.type) {
            case 'createComment':
                return [
                    ...state,
                    action.value
                ]

            default:
                return comments
        }
    }, comments)

    return (
        <div className='comments-section p-4 grid gap-4'>
            <FormComponent data={{
                type: 'Comment',
                updateComments(commentValue: string) {
                    const comment = {
                        id: nextID++,
                        content: commentValue,
                        createdAt: "now",
                        score: 0,
                        user: currentUser,
                        replies: [] as UserReply[]
                    }

                    dispatch({
                        type: 'createComment',
                        value: comment
                    })
                }
            }} />

            {userComments.map((comment, i) => {

                /* const addReply = (reply: UserReply) => {
                    replies.push({
                        ...reply,
                        id: nextID++
                    })

                    setUserComments(Array.from(new Set([
                        ...userComments,
                        comment
                    ])))
                } */

                return (
                    <Comment
                        data={comment}
                        key={i}
                    />
                )})
            }
        </div>
    )
}