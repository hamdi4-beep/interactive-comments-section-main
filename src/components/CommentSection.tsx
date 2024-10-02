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
        value: string
        comment?: UserComment
        reply?: any
    }) => {
        const comment = {
            id: nextID + 1,
            content: action.value,
            createdAt: "now",
            score: 0,
            user: currentUser
        }

        switch (action.type) {
            case 'add':
                const newComment = {
                    ...comment,
                    replies: []
                }

                return [...state, newComment]

            case 'reply':
                const userComment = action.comment!

                const reply = {
                    ...comment,
                    replyingTo: userComment.user.username
                }

                const updateComments = (comment: UserComment) => state.map(it => {
                    const replies = comment.replies

                    if (it === comment) {
                        return {
                            ...comment,
                            replies: [
                                ...replies,
                                reply
                            ]
                        }
                    }

                    return it
                })

                if ((userComment as any as UserReply).replyingTo) {
                    const userReply = action.comment as any as UserReply

                    const associatedComment = state.find(comment => {
                        const replies = comment.replies
                        if (replies.find(reply => reply === userReply)) return comment
                    })

                    return updateComments(associatedComment!)
                }

                return updateComments(userComment)

            default:
                return comments
        }
    }, comments)

    return (
        <div className='comments-section p-4 grid gap-4'>
            <FormComponent
                type='comment'
                onUpdate={(value: string) => {
                    dispatch({
                        type: 'add',
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