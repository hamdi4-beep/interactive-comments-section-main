import * as React from 'react'

import CommentSection from "./components/CommentSection"
import data from './data.json'

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

function App() {
  const [comments, setComments] = React.useState(data.comments)

  return (
    <div className="max-w-xl">
      <Context.Provider value={{
        comments,
        setComments
      }}>
        <CommentSection />
      </Context.Provider>
    </div>
  )
}

export default App
