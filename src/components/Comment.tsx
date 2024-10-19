import * as React from 'react'

import {
    currentUser,
    FormLabels,
    STATE_ACTIONS,
    UserComment,
    UserReply
} from '../App'

import FormComponent from './FormComponent'

export default function Comment({
    comment,
    updateComment
}: {
    comment: UserComment
    updateComment: React.Dispatch<{
        type: STATE_ACTIONS,
        value?: string,
        comment?: UserComment,
        score?: number
    }>
}) {
    const [currentlySelected, setCurrentlySelected] = React.useState('')
    const [isEditted, setIsEditted] = React.useState(false)
    const [isHidden, setIsHidden] = React.useState(true)

    const user = comment.user
    const isCurrentUser = currentUser.username === user.username

    const replies = comment.replies

    const handleClick = (value: FormLabels) => setCurrentlySelected(selectedValue => selectedValue === value ? '' : value)

    const handleUpdateClick = (score: number) => {

        if (score < 0 || score > 50) return

        updateComment({
            type: 'UPDATE_SCORE',
            score,
            comment
        })
    }

    const handleReplyClick = (value: string) => {
        setCurrentlySelected('')

        updateComment({
            type: 'REPLY_COMMENT',
            comment,
            value
        })
    }

    const handleEdit = (newValue: string) => {
        setCurrentlySelected('')

        updateComment({
            type: 'EDIT_COMMENT',
            value: newValue,
            comment
        })

        setIsEditted(true)
    }

    return (
        <div className='comment-wrapper'>
            <div className='comment'>
                <div className="bg-white p-4 rounded-xl">
                    <div className="items-list flex gap-4">
                        <div className="score-component bg-[#eee] grid text-center p-2 rounded-lg self-start w-12">
                            <button className="text-neutral-grayish-blue" onClick={() => handleUpdateClick(comment.score + 1)}>+</button>
                            <span className='text-primary-moderate-blue font-bold py-3'>{comment.score}</span>
                            <button onClick={() => handleUpdateClick(comment.score - 1)}>-</button>
                        </div>

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
                                        <span className='bg-primary-moderate-blue px-3 rounded-md pb-[.25em] leading-tight text-white'>you</span>
                                    )}

                                    <span className='text-neutral-grayish-blue'>{comment.createdAt}</span>
                                </div>

                                <div className="buttons flex gap-4">
                                    {isCurrentUser && (
                                        <button className='btn' onClick={() => setIsHidden(false)}>
                                            <img src="/interactive-comments-section-main/assets/images/icon-delete.svg" alt="" />
                                            Delete
                                        </button>
                                    )}

                                    {isCurrentUser && (<button className='btn' onClick={() => handleClick('edit')}>
                                        <img src="/interactive-comments-section-main/assets/images/icon-edit.svg" alt="" />
                                        Edit
                                    </button>)}

                                    {!isCurrentUser && (<button className='btn' onClick={() => handleClick('reply')}>
                                        <img src="/interactive-comments-section-main/assets/images/icon-reply.svg" alt="" />
                                        Reply
                                    </button>)}
                                </div>
                            </div>

                            <p className='py-4'>
                                {(comment as any as UserReply).replyingTo && (
                                    <span className='font-bold text-primary-moderate-blue'>@{(comment as any as UserReply).replyingTo} </span>
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

            {!isHidden && <Modal
                handleHideClick={() => setIsHidden(true)}
                handleDeleteClick={() => {
                    setIsHidden(true)

                    updateComment({
                        type: 'DELETE_COMMENT',
                        comment
                    })
                }}
            />}

            {currentlySelected && (
                <FormComponent
                    type={currentlySelected == 'reply' ? 'reply' : 'edit'}
                    onUpdate={currentlySelected == 'reply' ? handleReplyClick : handleEdit}
                />
            )}

            {replies?.length > 0 && (
                <div className='replies-list grid gap-4 pl-4 mt-4'>
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

const Modal = ({
    handleHideClick,
    handleDeleteClick
}: {
    handleHideClick: () => void
    handleDeleteClick: () => void
}) => (
    <div className="bg-black bg-opacity-80 fixed inset-0 grid place-content-center z-50" onClick={(e: React.SyntheticEvent<HTMLElement>) => {
        if (e.currentTarget !== e.target) return
        handleHideClick()
    }}>
        <div className="bg-white rounded-lg max-w-sm p-4">
            <h2 className='font-bold text-neutral-grayish-blue text-xl'>Delete comment</h2>
            <p className='pt-3'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            
            <div className='flex gap-3 pt-4'>
                <button className='bg-neutral-grayish-blue modal-btn' onClick={handleHideClick}>No, Cancel</button>
                <button className='bg-primary-soft-red modal-btn' onClick={handleDeleteClick}>Yes, delete</button>
            </div>
        </div>
    </div>
)