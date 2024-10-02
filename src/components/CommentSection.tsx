import * as React from 'react'

import FormComponent from './FormComponent'
import Comment from './Comment'

import {
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
    }) => {
        switch (action.type) {
            case 'add':
                const comment = {
                    id: nextID + 1,
                    content: action.value,
                    createdAt: "now",
                    score: 0,
                    user: {
                        image: { 
                            png: "/interactive-comments-section-main/assets/images/avatars/image-juliusomo.png",
                            webp: "/interactive-comments-section-main/assets/images/avatars/image-juliusomo.webp"
                        },
                        username: "juliusomo"
                    },
                    replies: []
                }

                return [...state, comment]

            case 'reply':
                const userComment = action.comment!

                const reply = {
                    id: nextID + 1,
                    content: action.value,
                    createdAt: "now",
                    score: 0,
                    replyingTo: userComment.user.username,
                    user: {
                        image: { 
                            png: "/interactive-comments-section-main/assets/images/avatars/image-juliusomo.png",
                            webp: "/interactive-comments-section-main/assets/images/avatars/image-juliusomo.webp"
                        },
                        username: "juliusomo"
                    }
                }

                const updatedComments = state.map(comment => {
                    if (comment === userComment) return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            reply
                        ]
                    }

                    return comment
                })

                return updatedComments

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

            {userComments.map((comment, i) => {
                const replies = Array.from(new Set(comment.replies))

                return (
                    <div key={i}>
                        <Comment
                            comment={comment}
                            updateComment={dispatch}
                        />

                        {replies?.length > 0 && (
                            <div className='grid gap-4 ml-16 p-4 pb-0 pr-0'>
                                {replies.map((reply, i) => (
                                    <Comment 
                                        updateComment={dispatch}
                                        comment={reply as UserReply as any}
                                        key={i}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )})
            }
        </div>
    )
}