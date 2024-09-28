import FormComponent from './FormComponent'
import Comment from './Comment'

import {
    currentUser
 } from '../App'

export type UserComment = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: {
        image: {
            png: string;
            webp: string;
        };
        username: string;
    };
    replies: {
        id: number;
        content: string;
        createdAt: string;
        score: number;
        replyingTo: string;
        user: {
            image: {
            png: string;
            webp: string;
        };
            username: string;
        };
    }[];
}

export type UserReply = UserComment['replies'][0]

export type CommentOrReply = 
    | UserComment
    | UserReply

export default function CommentSection({
    comments
}: {
    comments: UserComment[]
}) {
    return (
        <div className='grid gap-4'>
            {comments.map((comment, i) => {
                const replies = comment.replies

                return (
                    <div key={i}>
                        <Comment data={comment} />
                        {replies.length > 0 && <RepliesList replies={replies} />}
                    </div>
                )})
            }

            <FormComponent data={{
                type: 'Comment',
                createComment(formValue: string) {
                    const comment = {
                        content: formValue,
                        createdAt: "now",
                        score: 0,
                        user: currentUser,
                        replies: []
                    }

                    return comment
                }
            }} />
        </div>
    )
}

const RepliesList = ({
    replies
}: {
    replies: UserComment['replies']
}) => (
    <div className='grid gap-4 p-4 pr-0 ml-14'>
        {replies.map((reply, i) => (
            <Comment
                data={reply}
                key={i}
            />
        ))}
    </div>
)