import * as React from 'react'

import {
    currentUser,
    FormLabels,
    UserComment,
    UserReply
} from '../App'

import FormComponent from './FormComponent'

export default function Comment({
    comment,
    updateComment
}: {
    comment: UserComment
    updateComment: Function
}) {
    const [currentlySelected, setCurrentlySelected] = React.useState('')
    const [isEditted, setIsEditted] = React.useState(false)

    const user = comment.user
    const isCurrentUser = currentUser.username === user.username

    const replies = comment.replies

    const handleClick = (value: FormLabels) => setCurrentlySelected(selectedValue => selectedValue === value ? '' : value)

    return (
        <div className='comment-wrapper'>
            <div className='comment'>
                <div className="bg-white p-4 rounded-xl">
                    <div className="items-list flex gap-4">
                        <ScoreComponent defaultScore={comment.score} />

                        <div className='w-full'>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="user-img">
                                        <img
                                            src={user.image.png}
                                            className="w-10 h-10"
                                            alt=""
                                        />
                                    </div>

                                    <h2 className='font-bold'>{user.username}</h2>

                                    {isCurrentUser && (
                                        <span className='bg-primary-moderate-blue px-3 leading-tight text-white'>you</span>
                                    )}

                                    <span className='text-neutral-grayish-blue'>{comment.createdAt}</span>
                                </div>

                                <div className="buttons flex gap-4">
                                    {isCurrentUser && (
                                        <button className='btn' onClick={() => updateComment({
                                            type: 'delete',
                                            comment
                                        })}>
                                            <img src="/interactive-comments-section-main/assets/images/icon-delete.svg" alt="" />
                                            Delete
                                        </button>
                                    )}

                                    {isCurrentUser && (<button className='btn' onClick={() => handleClick('edit')}>
                                        <img src="/interactive-comments-section-main/assets/images/icon-edit.svg" alt="" />
                                        Edit
                                    </button>)}

                                    <button className='btn' onClick={() => handleClick('reply')}>
                                        <img src="/interactive-comments-section-main/assets/images/icon-reply.svg" alt="" />
                                        Reply
                                    </button>
                                </div>
                            </div>

                            <p className='py-4'>
                                {(comment as any).replyingTo && (
                                    <span className='font-bold text-primary-moderate-blue'>@{(comment as any).replyingTo} </span>
                                )}
                                
                                {comment.content}

                                {isEditted && (
                                    <span className='text-neutral-grayish-blue'> (edited)</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {currentlySelected == 'reply' && (
                <FormComponent
                    type={currentlySelected}
                    onUpdate={(value: string) => {
                        setCurrentlySelected('')

                        updateComment({
                            type: 'reply',
                            comment,
                            value
                        })
                    }}
                />
            )}

            {currentlySelected == 'edit' && (
                <FormComponent
                    type={currentlySelected}
                    onUpdate={(newValue: string) => {
                        setCurrentlySelected('')

                        updateComment({
                            type: 'edit',
                            value: newValue,
                            comment
                        })

                        setIsEditted(true)
                    }}
                />
            )}

            {replies?.length > 0 && (
                <div className='replies-list grid gap-4 ml-4 mt-4 pl-4'>
                    {replies.map((reply, i) => (
                        <Comment
                            comment={reply as UserReply as any}
                            updateComment={updateComment}
                            key={i}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export const ScoreComponent = ({
    defaultScore
}: {
    defaultScore: number
}) => {
    const [score, setScore] = React.useState(defaultScore)

    const handleIncreaseClick = () => score < 50 && setScore(score + 1)
    const handleDecreaseClick = () => score > 0 && setScore(score - 1)

    return (
        <div className="score-component bg-[#eee] grid text-center p-2 rounded-lg self-start w-12">
            <button className="text-neutral-grayish-blue" onClick={handleIncreaseClick}>+</button>
            <span className='text-primary-moderate-blue font-bold py-3'>{score}</span>
            <button onClick={handleDecreaseClick}>-</button>
        </div>
    )
}