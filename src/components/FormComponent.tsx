import * as React from 'react'

import {
    currentUser,
    FormLabels,
    UserComment
} from '../App'

const inputRef = React.createRef<HTMLTextAreaElement>()

export default function FormComponent({
    type,
    onUpdate,
    comment
}: {
    type: FormLabels
    onUpdate: Function
    comment?: UserComment
}) {
    const labels = {
        comment: ['Add comment...', 'Comment'],
        reply: ['Add reply...', 'Send'],
        edit: ['Edit reply...', 'Edit']
    }

    const getLabels = (label: FormLabels) => labels[label]
    const [placeholder, label] = getLabels(type)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const [[, value]] = new FormData(form)

        const input = form['comment']
        input.value = ''

        if (!value) {
            alert('Please add a comment!')
            return
        }

        onUpdate(value)
    }

    React.useEffect(() => {
        if (inputRef.current) {
            const elem = inputRef.current
            elem.focus()
        }
    }, [])

    return (
        <div className="form-component bg-white rounded-xl p-4 pt-8 -mt-4 flex gap-3 items-start">
            <div className="user-img self-start flex-shrink-0">
                <img
                    src={currentUser.image.png}
                    className="w-10 h-10"
                    alt=""
                />
            </div>

            <form className="w-full" onSubmit={handleSubmit}>
                <textarea
                    className='p-4 pt-2 pb-20 w-full border border-[hsl(223, 19%, 93%)] outline-none rounded-md'
                    name="comment"
                    ref={inputRef}
                    placeholder={placeholder}
                    defaultValue={type === 'edit' ? comment?.content : ''}
                />
                
                <button
                    className='bg-primary-moderate-blue p-2 px-4 mt-3 rounded-md text-white uppercase'
                >{label}</button>
            </form>
        </div>
    )
}