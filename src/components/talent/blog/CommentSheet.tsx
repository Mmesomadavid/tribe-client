import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
  ShieldCheck,
  MoreHorizontal,
  ChevronDown,
  Star,
  StarOff,
  MessageCircle,
  Send,
  Bold,
  Italic,
  Link2,
} from "lucide-react";

import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
} from "../../../components/ui/sheet";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

import {
  postsApi,
  ApiError,
  type Comment,
} from "../../../lib/api";


// ============================================================
// TYPES
// ============================================================

interface BlogAuthor {
  name: string;
  username: string;
  avatar?: string;
}

interface Blog {
  id: string;
  author: BlogAuthor;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  reshares: number;
  bookmarks: number;
  date: string;
  likedByMe?: boolean;
  bookmarkedByMe?: boolean;
  resharedByMe?: boolean;
}

interface CommentSheetProps {
  blog: Blog;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


// ============================================================
// COMPONENT
// ============================================================

const CommentSheet = ({
  blog,
  open,
  onOpenChange,
}: CommentSheetProps) => {

  // ==========================================================
  // COMMENTS
  // ==========================================================

  const [comments, setComments] = useState<Comment[]>(
    []
  );

  const [isLoading, setIsLoading] =
    useState(false);


  // ==========================================================
  // MAIN RESPONSE COMPOSER
  // ==========================================================

  const [newComment, setNewComment] =
    useState("");

  const [isPosting, setIsPosting] =
    useState(false);


  // ==========================================================
  // COMMENT RATING
  // ==========================================================

  const [ratedComments, setRatedComments] =
    useState<Record<string, boolean>>({});

  const [commentRatings, setCommentRatings] =
    useState<Record<string, number>>({});


  // ==========================================================
  // REPLY STATE
  // ==========================================================

  /**
   * The ID of the comment currently being replied to.
   */
  const [activeReplyId, setActiveReplyId] =
    useState<string | null>(null);

  /**
   * Text inside the inline reply composer.
   */
  const [replyText, setReplyText] =
    useState("");

  /**
   * Loading state for a reply.
   */
  const [isReplying, setIsReplying] =
    useState(false);

  /**
   * Reference to the currently active reply textarea.
   */
  const replyInputRef =
    useRef<HTMLTextAreaElement | null>(null);


  // ==========================================================
  // LOAD COMMENTS
  // ==========================================================

  useEffect(() => {
    if (!open) return;

    const loadComments = async () => {
      setIsLoading(true);

      try {
        const data =
          await postsApi.getComments(
            blog.id
          );

        setComments(data.comments);

        // Initialize rating counts.
        setCommentRatings((previous) => {
          const next = {
            ...previous,
          };

          data.comments.forEach(
            (comment) => {
              if (
                !(comment._id in next)
              ) {
                next[comment._id] = 0;
              }
            }
          );

          return next;
        });

      } catch (error) {
        toast.error(
          error instanceof ApiError
            ? error.message
            : "Couldn't load responses."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();

  }, [open, blog.id]);


  // ==========================================================
  // AUTO FOCUS REPLY INPUT
  // ==========================================================

  useEffect(() => {
    if (!activeReplyId) return;

    /**
     * Wait for React to render the textarea,
     * then focus it automatically.
     */
    requestAnimationFrame(() => {
      replyInputRef.current?.focus();
    });

  }, [activeReplyId]);


  // ==========================================================
  // SUBMIT MAIN RESPONSE
  // ==========================================================

  const handleSubmitComment =
    async () => {

      if (
        !newComment.trim() ||
        isPosting
      ) {
        return;
      }

      setIsPosting(true);

      try {

        const data =
          await postsApi.addComment(
            blog.id,
            newComment.trim()
          );

        setComments((previous) => [
          data.comment,
          ...previous,
        ]);

        setCommentRatings(
          (previous) => ({
            ...previous,
            [data.comment._id]: 0,
          })
        );

        setNewComment("");

        toast.success(
          "Response posted"
        );

      } catch (error) {

        toast.error(
          error instanceof ApiError
            ? error.message
            : "Couldn't post your response."
        );

      } finally {
        setIsPosting(false);
      }
    };


  // ==========================================================
  // OPEN REPLY
  // ==========================================================

  const handleOpenReply = (
    commentId: string
  ) => {

    /**
     * If another comment was previously
     * selected, switch directly to this one.
     */
    setActiveReplyId(commentId);

    setReplyText("");
  };


  // ==========================================================
  // CANCEL REPLY
  // ==========================================================

  const handleCancelReply = () => {

    setActiveReplyId(null);

    setReplyText("");
  };


  // ==========================================================
  // SUBMIT REPLY
  // ==========================================================

  const handleSubmitReply = async (
    comment: Comment
  ) => {

    if (
      !replyText.trim() ||
      isReplying
    ) {
      return;
    }

    setIsReplying(true);

    try {

      /**
       * Your current API method accepts:
       *
       * postsApi.addComment(
       *   blog.id,
       *   content
       * )
       *
       * Therefore this creates the response
       * using the existing API contract.
       *
       * When your backend supports nested replies,
       * pass comment._id as parentCommentId.
       */

      const data =
        await postsApi.addComment(
          blog.id,
          replyText.trim()
        );

      /**
       * Add the new response underneath
       * the existing comments for now.
       */
      setComments((previous) => [
        ...previous,
        data.comment,
      ]);

      setCommentRatings(
        (previous) => ({
          ...previous,
          [data.comment._id]: 0,
        })
      );

      setReplyText("");

      setActiveReplyId(null);

      toast.success(
        "Reply posted"
      );

    } catch (error) {

      toast.error(
        error instanceof ApiError
          ? error.message
          : "Couldn't post your reply."
      );

    } finally {
      setIsReplying(false);
    }
  };


  // ==========================================================
  // RATE COMMENT
  // ==========================================================

  const handleRateComment = (
    commentId: string
  ) => {

    const currentlyRated =
      ratedComments[commentId] ??
      false;

    setRatedComments(
      (previous) => ({
        ...previous,
        [commentId]:
          !currentlyRated,
      })
    );

    setCommentRatings(
      (previous) => ({
        ...previous,

        [commentId]:
          (previous[commentId] ?? 0) +
          (currentlyRated
            ? -1
            : 1),
      })
    );
  };


  // ==========================================================
  // INITIALS
  // ==========================================================

  const getInitials = (
    name: string
  ) => {

    return name
      .split(" ")
      .map(
        (part) => part[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent
        side="right"
        className="
          flex
          w-full
          max-w-full
          flex-col
          gap-0
          border-l
          border-gray-200
          bg-white
          p-0
          sm:max-w-[400px]
        "
      >

        {/* ====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            shrink-0
            border-b
            border-gray-100
            px-5
            py-5
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            {/* Title */}

            <h2
              className="
                text-[18px]
                font-bold
                tracking-[-0.02em]
                text-black
              "
            >
              Responses (
              {comments.length ||
                blog.comments}
              )
            </h2>

          </div>
        </div>


        {/* ====================================================
            SCROLLABLE CONTENT
        ===================================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
          "
        >


          {/* ==================================================
              MAIN RESPONSE COMPOSER
          =================================================== */}

          <section
            className="
              px-5
              pt-6
            "
          >

            {/* User */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Avatar
                className="
                  h-8
                  w-8
                "
              >

                <AvatarFallback
                  className="
                    bg-gray-100
                    text-[10px]
                    font-bold
                    text-black
                  "
                >
                  YOU
                </AvatarFallback>

              </Avatar>


              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  text-sm
                "
              >

                <span
                  className="
                    font-bold
                    text-black
                  "
                >
                  Chukwunoyelu Mmesoma
                </span>

                <span
                  className="
                    font-medium
                    text-black
                  "
                >
                  he/him
                </span>

              </div>
            </div>


            {/* Editor */}

            <div
              className="
                mt-3
                flex
                h-[100px]
                w-full
                flex-col
                overflow-hidden
                rounded-md
                bg-gray-100
              "
            >

              {/* Textarea */}

              <textarea
                value={newComment}
                onChange={(event) =>
                  setNewComment(
                    event.target.value
                  )
                }
                placeholder="What are your thoughts?"
                className="
                w-full
                flex-1
                resize-none
                border-0
                bg-transparent
                px-4
                pt-4
                text-sm
                leading-6
                text-gray-800
                outline-none
                placeholder:text-gray-400
                "
              />


              {/* Editor toolbar */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  justify-between
                  px-4
                  pb-4
                "
              >

                {/* Formatting */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <button
                    type="button"
                    className="
                      text-black
                      transition-opacity
                      hover:opacity-60
                    "
                  >
                    <Bold
                      className="h-4 w-4"
                      strokeWidth={2.5}
                    />
                  </button>


                  <button
                    type="button"
                    className="
                      text-black
                      transition-opacity
                      hover:opacity-60
                    "
                  >
                    <Italic
                      className="h-4 w-4"
                      strokeWidth={2.5}
                    />
                  </button>


                  <button
                    type="button"
                    className="
                      text-black
                      transition-opacity
                      hover:opacity-60
                    "
                  >
                    <Link2
                      className="h-4 w-4"
                      strokeWidth={2.5}
                    />
                  </button>

                </div>


                {/* Composer actions */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      setNewComment("")
                    }
                    className="
                      text-xs
                      font-bold
                      text-black
                      transition-opacity
                      hover:opacity-60
                    "
                  >
                    Cancel
                  </button>


                  <button
                    type="button"
                    disabled={
                      !newComment.trim() ||
                      isPosting
                    }
                    onClick={
                      handleSubmitComment
                    }
                    className="
                      flex
                      h-8
                      items-center
                      gap-1.5
                      rounded-full
                      bg-black
                      px-4
                      text-xs
                      font-bold
                      text-white
                      transition-all
                      hover:bg-gray-800
                      disabled:cursor-not-allowed
                      disabled:bg-gray-200
                      disabled:text-gray-400
                    "
                  >

                    {isPosting ? (
                      <span>
                        Posting...
                      </span>
                    ) : (
                      <>
                        <span>
                          Reply
                        </span>

                        <Send
                          className="h-3 w-3"
                          strokeWidth={2.5}
                        />
                      </>
                    )}

                  </button>

                </div>
              </div>
            </div>
          </section>


          {/* ==================================================
              SORTING
          =================================================== */}

          <div
            className="
              mt-10
              border-b
              border-gray-100
              px-7
              pb-5
            "
          >

            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                text-[11px]
                font-bold
                uppercase
                tracking-wide
                text-black
              "
            >

              Most relevant

              <ChevronDown
                className="h-3.5 w-3.5"
                strokeWidth={2.5}
              />

            </button>
          </div>


          {/* ==================================================
              RESPONSES
          =================================================== */}

          <section>

            {/* Loading */}

            {isLoading && (
              <div
                className="
                  flex
                  justify-center
                  py-12
                "
              >

                <div
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-gray-200
                    border-t-black
                  "
                />

              </div>
            )}


            {/* Empty state */}

            {!isLoading &&
              comments.length === 0 && (
                <div
                  className="
                    px-7
                    py-14
                    text-center
                  "
                >

                  <MessageCircle
                    className="
                      mx-auto
                      h-7
                      w-7
                      text-black
                    "
                    strokeWidth={2}
                  />

                  <p
                    className="
                      mt-3
                      text-sm
                      font-bold
                      text-black
                    "
                  >
                    No responses yet
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-500
                    "
                  >
                    Be the first to share
                    your thoughts.
                  </p>

                </div>
              )}


            {/* Response list */}

            {!isLoading &&
              comments.map(
                (comment) => {

                  const rated =
                    ratedComments[
                      comment._id
                    ] ?? false;

                  const ratingCount =
                    commentRatings[
                      comment._id
                    ] ?? 0;

                  const isReplyingTo =
                    activeReplyId ===
                    comment._id;


                  return (
                    <article
                      key={comment._id}
                      className={`
                        border-b
                        border-gray-100
                        px-5
                        py-6
                        transition-all
                        duration-200
                        ${
                          isReplyingTo
                            ? "bg-gray-50"
                            : "hover:bg-gray-50/40"
                        }
                      `}
                    >

                      {/* ========================================
                          AUTHOR
                      ========================================= */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >

                          {/* Avatar */}

                          <Avatar
                            className="
                              h-9
                              w-9
                              shrink-0
                            "
                          >

                            <AvatarImage
                              src={
                                comment
                                  .author
                                  .avatar ??
                                undefined
                              }
                              alt={
                                comment
                                  .author
                                  .name
                              }
                            />

                            <AvatarFallback
                              className="
                                bg-gray-100
                                text-xs
                                font-bold
                                text-black
                              "
                            >
                              {getInitials(
                                comment
                                  .author
                                  .name
                              )}
                            </AvatarFallback>

                          </Avatar>


                          {/* Author information */}

                          <div>

                            <div
                              className="
                                flex
                                items-center
                                gap-1.5
                              "
                            >

                              <span
                                className="
                                  text-sm
                                  font-bold
                                  text-black
                                "
                              >
                                {
                                  comment
                                    .author
                                    .name
                                }
                              </span>


                              {rated && (
                                <Star
                                  className="
                                    h-3.5
                                    w-3.5
                                    text-black
                                  "
                                  fill="currentColor"
                                  strokeWidth={2.5}
                                />
                              )}

                            </div>


                            <p
                              className="
                                mt-0.5
                                text-xs
                                font-medium
                                text-gray-500
                              "
                            >
                              Response
                            </p>

                          </div>

                        </div>


                        {/* More */}

                        <button
                          type="button"
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            text-black
                            transition-colors
                            hover:bg-gray-200
                          "
                          aria-label="More options"
                        >

                          <MoreHorizontal
                            className="h-4 w-4"
                            strokeWidth={2.5}
                          />

                        </button>

                      </div>


                      {/* ========================================
                          RESPONSE CONTENT
                      ========================================= */}

                      <div
                        className="
                          mt-4
                          max-w-[470px]
                        "
                      >

                        <p
                          className="
                            whitespace-pre-wrap
                            text-[14px]
                            leading-6
                            text-gray-800
                          "
                        >
                          {comment.content}
                        </p>

                      </div>


                      {/* ========================================
                          RESPONSE ACTIONS
                      ========================================= */}

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          gap-5
                        "
                      >

                        {/* Rating */}

                        <button
                          type="button"
                          onClick={() =>
                            handleRateComment(
                              comment._id
                            )
                          }
                          className="
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            font-bold
                            text-black
                            transition-opacity
                            hover:opacity-60
                          "
                        >

                          {rated ? (
                            <Star
                              className="
                                h-4
                                w-4
                                text-black
                              "
                              fill="currentColor"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <StarOff
                              className="
                                h-4
                                w-4
                                text-black
                              "
                              strokeWidth={2.5}
                            />
                          )}

                          {ratingCount > 0 && (
                            <span>
                              {ratingCount}
                            </span>
                          )}

                        </button>


                        {/* Reply */}

                        <button
                          type="button"
                          onClick={() =>
                            handleOpenReply(
                              comment._id
                            )
                          }
                          className="
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            font-bold
                            text-black
                            transition-opacity
                            hover:opacity-60
                          "
                        >

                          <MessageCircle
                            className="
                              h-4
                              w-4
                              text-black
                            "
                            strokeWidth={2.5}
                          />

                          Reply

                        </button>

                      </div>


                      {/* ========================================
                          INLINE REPLY COMPOSER
                      ========================================= */}

                      {isReplyingTo && (
                        <div
                          className="
                            mt-5
                            pl-0
                          "
                        >

                          {/* Replying to */}

                          <div
                            className="
                              mb-2
                              flex
                              items-center
                              gap-1.5
                              text-xs
                            "
                          >

                            <span
                              className="
                                font-medium
                                text-gray-500
                              "
                            >
                              Replying to
                            </span>

                            <span
                              className="
                                font-bold
                                text-black
                              "
                            >
                              @
                              {
                                comment
                                  .author
                                  .username
                              }
                            </span>

                          </div>


                          {/* Reply editor */}

                          <div
                            className="
                              overflow-hidden
                              rounded-xl
                              border
                              border-gray-200
                              bg-white
                              transition-all
                              focus-within:border-gray-400
                              focus-within:ring-2
                              focus-within:ring-gray-100
                            "
                          >

                            {/* Textarea */}

                            <textarea
                              ref={
                                replyInputRef
                              }
                              value={replyText}
                              onChange={(
                                event
                              ) =>
                                setReplyText(
                                  event.target
                                    .value
                                )
                              }
                              placeholder={`Reply to ${comment.author.name}...`}
                              rows={3}
                              className="
                                block
                                min-h-[85px]
                                w-full
                                resize-none
                                border-0
                                bg-transparent
                                px-4
                                pt-3
                                text-sm
                                leading-6
                                text-gray-800
                                outline-none
                                placeholder:text-gray-400
                              "
                            />


                            {/* Reply toolbar */}

                            <div
                              className="
                                flex
                                items-center
                                justify-between
                                px-3
                                pb-3
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                "
                              >

                                <button
                                  type="button"
                                  className="
                                    text-black
                                    transition-opacity
                                    hover:opacity-60
                                  "
                                >
                                  <Bold
                                    className="h-4 w-4"
                                    strokeWidth={
                                      2.5
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  className="
                                    text-black
                                    transition-opacity
                                    hover:opacity-60
                                  "
                                >
                                  <Italic
                                    className="h-4 w-4"
                                    strokeWidth={
                                      2.5
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  className="
                                    text-black
                                    transition-opacity
                                    hover:opacity-60
                                  "
                                >
                                  <Link2
                                    className="h-4 w-4"
                                    strokeWidth={
                                      2.5
                                    }
                                  />
                                </button>

                              </div>


                              {/* Reply actions */}

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                "
                              >

                                <button
                                  type="button"
                                  onClick={
                                    handleCancelReply
                                  }
                                  className="
                                    text-xs
                                    font-bold
                                    text-black
                                    transition-opacity
                                    hover:opacity-60
                                  "
                                >
                                  Cancel
                                </button>


                                <button
                                  type="button"
                                  disabled={
                                    !replyText.trim() ||
                                    isReplying
                                  }
                                  onClick={() =>
                                    handleSubmitReply(
                                      comment
                                    )
                                  }
                                  className="
                                    flex
                                    h-8
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    bg-black
                                    px-4
                                    text-xs
                                    font-bold
                                    text-white
                                    transition-all
                                    hover:bg-gray-800
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-200
                                    disabled:text-gray-400
                                  "
                                >

                                  {isReplying ? (
                                    <span>
                                      Replying...
                                    </span>
                                  ) : (
                                    <>
                                      <span>
                                        Reply
                                      </span>

                                      <Send
                                        className="
                                          h-3
                                          w-3
                                        "
                                        strokeWidth={
                                          2.5
                                        }
                                      />
                                    </>
                                  )}

                                </button>

                              </div>

                            </div>
                          </div>
                        </div>
                      )}

                    </article>
                  );
                }
              )}

          </section>

        </div>

      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;