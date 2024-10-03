import CommentSection from "./components/CommentSection"
import data from './data.json'

export const currentUser = data.currentUser
const comments = data.comments

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
  replies: UserReply[];
}

export type UserReply = Omit<UserComment, "replies"> & {
  replyingTo: string
}

export type FormLabels =
  | 'reply'
  | 'comment'
  | 'edit'

export const reducer = (state: UserComment[], action: {
  type: string
  value: string
  comment?: UserComment
}) => {
  const comment = {
    id: nextID++,
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
      const user = userComment.user

      const reply = {
        ...comment,
        replyingTo: user.username
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
        const associatedComment = state.find(comment => comment.replies.find(reply => reply === userReply))!

        return updateComments(associatedComment)
      }

      return updateComments(userComment)

    case 'edit':
      const editComment = (currentComment: UserComment) => state.map(it => {
        if (currentComment == it) {
          return {
            ...currentComment,
            content: action.value
          }
        }

        return it
      })

      if ((action.comment as any as UserReply).replyingTo) {
        const userReply = action.comment as any as UserReply

        const updatedComments = state.map(it => {
          const replies = it.replies

          if (replies) {
            return {
              ...it,
              replies: replies.map(reply => {
                if (reply === userReply) {
                  return {
                    ...userReply,
                    content: action.value
                  }
                }
  
                return reply
              })
            }
          }

          return it
        })

        return updatedComments
      }

      return editComment(action.comment!)

    default:
      return comments
  }
}

let nextID = 4

function App() {
  return (
    <div className="max-w-2xl mt-4">
      <CommentSection comments={comments} />
    </div>
  )
}

export default App
