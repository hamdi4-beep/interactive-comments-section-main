import * as React from 'react'

import FormComponent from './FormComponent'
import Comment from './Comment'

import { 
    Context,
    UserReply
 } from '../App'

export default function CommentSection() {
    const {
        comments,
        setComments
    } = React.useContext(Context)

    console.log(comments)

    return (
        <div className='grid gap-4'>
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
                updateComment: (comment: any) => setComments([
                    ...comments,
                    comment
                ]),
                type: 'Comment'
            }} />
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