import * as React from 'react'
import data from '../data.json'

import FormComponent from './FormComponent'
import Comment from './Comment'

export type UserComment = typeof comment
export type UserReply = typeof reply

export type CommentOrReply = 
    | UserComment
    | UserReply

export const currentUser = data.currentUser
const comments = data.comments

const [comment] = comments.filter(comment => comment.replies)
const [reply] = comment.replies

export const Context = React.createContext<{
    comments: UserComment[]
    setComments: React.Dispatch<React.SetStateAction<UserComment[]>>
}>({
    comments,
    setComments: () => {}
})

export default function CommentSection() {
    const [comments, setComments] = React.useState(data.comments)
    console.log(comments)

    return (
        <div className='grid gap-4'>
            <Context.Provider value={{
                comments,
                setComments
            }}>
                {comments.map((comment, i) => {
                    const replies = comment.replies

                    return (
                        <div key={i}>
                            <Comment
                                data={comment}
                            />
                            
                            {replies.length > 0 && (
                                <RepliesList replies={replies} />
                            )}
                        </div>
                    )})
                }

                <FormComponent data={{
                    updateComments: (newComment: UserComment) => {
                        return [...comments, newComment]
                    },
                    type: 'Comment'
                }} />
            </Context.Provider>
        </div>
    )
}

const RepliesList = ({
    replies
}: {
    replies: UserReply[]
}) => {
    return (
        <div className='grid gap-4 p-4 pr-0 ml-14'>
            {replies.map((reply, i) => (
                <Comment
                    data={reply}
                    key={i}
                />
            ))}
        </div>
    )
}