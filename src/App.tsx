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
  type:
    | 'CREATE_COMMENT'
    | 'REPLY_COMMENT'
    | 'EDIT_COMMENT'
    | 'DELETE_COMMENT'
    
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

  const findAssociatedComment = (reply: UserReply) => state.find(comment => {
    const replies = comment.replies
    return replies.find(it => it === reply)
  })

  switch (action.type) {
    case 'CREATE_COMMENT':
      const newComment = {
        ...comment,
        replies: []
      }

      return [...state, newComment]

    case 'REPLY_COMMENT': {
      const userComment = action.comment!
      const userReply = action.comment as any as UserReply

      const associatedComment = findAssociatedComment(userReply)

      const user = userComment.user

      const reply = {
        ...comment,
        replyingTo: user.username
      }

      const updateReplies = (comment: UserComment) => state.map(it => {
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

      if (associatedComment) return updateReplies(associatedComment)

      return updateReplies(userComment)
    }

    case 'EDIT_COMMENT': {
      const userReply = action.comment as any as UserReply
      const associatedComment = findAssociatedComment(userReply)

      const editComment = (currentComment: UserComment) => state.map(it => {
        if (currentComment == it) {
          return {
            ...currentComment,
            content: action.value
          }
        }

        return it
      })

      if (associatedComment) {
        const userReply = action.comment as any as UserReply
        const associatedComment = findAssociatedComment(userReply)

        return state.map(it => {
          const replies = it.replies

          if (it !== associatedComment) return it

          return {
            ...it,
            replies: replies.map(reply => {
              if (userReply !== reply) return reply

              return {
                ...userReply,
                content: action.value
              }
            })
          }
        })
      }

      return editComment(action.comment!)
    }

    case 'DELETE_COMMENT':
      const userReply = (action.comment as any as UserReply)
      const associatedComment = findAssociatedComment(userReply)
      
      if (associatedComment) {
        const replies = associatedComment.replies

        return state.map(it => {
          if (associatedComment !== it) return it

          return {
            ...associatedComment,
            replies: replies?.filter(it => it !== userReply)
          }
        })
      }

      return state.filter(comment => comment !== action.comment)

    default:
      return state
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
