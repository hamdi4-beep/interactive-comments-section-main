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
        reply?: any
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