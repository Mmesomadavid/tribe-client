import { useState } from "react";

import {
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Star,
  StarOff,
  Flag,
  UserMinus,
  UserPlus,
  ExternalLink,
  FileText,
} from "lucide-react";

import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

import {
  postsApi,
  ApiError,
} from "../../../lib/api";

import CommentSheet from "./CommentSheet";


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

  topic?: string;

  recommendationReason?: string;
}

interface BlogCardProps {
  blog: Blog;
}


// ============================================================
// COMPONENT
// ============================================================

const BlogCard = ({
  blog,
}: BlogCardProps) => {
  // ==========================================================
  // LIKE
  // ==========================================================

  const [liked, setLiked] = useState(
    blog.likedByMe ?? false
  );

  const [likesCount, setLikesCount] =
    useState(blog.likes);

  const [isLiking, setIsLiking] =
    useState(false);


  // ==========================================================
  // BOOKMARK
  // ==========================================================

  const [bookmarked, setBookmarked] =
    useState(
      blog.bookmarkedByMe ?? false
    );

  const [isBookmarking, setIsBookmarking] =
    useState(false);


  // ==========================================================
  // REPOST
  // ==========================================================

  const [reshared, setReshared] =
    useState(
      blog.resharedByMe ?? false
    );

  const [resharesCount, setResharesCount] =
    useState(blog.reshares);

  const [isResharing, setIsResharing] =
    useState(false);


  // ==========================================================
  // COMMENTS
  // ==========================================================

  const [
    commentSheetOpen,
    setCommentSheetOpen,
  ] = useState(false);


  // ==========================================================
  // LIKE HANDLER
  // ==========================================================

  const handleToggleLike =
    async () => {
      if (isLiking) return;

      const nextLiked = !liked;

      setLiked(nextLiked);

      setLikesCount(
        (count) =>
          count +
          (nextLiked ? 1 : -1)
      );

      setIsLiking(true);

      try {
        const data = nextLiked
          ? await postsApi.like(
              blog.id
            )
          : await postsApi.unlike(
              blog.id
            );

        setLikesCount(
          data.likesCount
        );
      } catch (error) {
        setLiked(!nextLiked);

        setLikesCount(
          (count) =>
            count +
            (nextLiked ? -1 : 1)
        );

        toast.error(
          error instanceof ApiError
            ? error.message
            : "Couldn't update rating right now."
        );
      } finally {
        setIsLiking(false);
      }
    };


  // ==========================================================
  // BOOKMARK HANDLER
  // ==========================================================

  const handleToggleBookmark =
    async () => {
      if (isBookmarking) return;

      const nextBookmarked =
        !bookmarked;

      setBookmarked(
        nextBookmarked
      );

      setIsBookmarking(true);

      try {
        if (nextBookmarked) {
          await postsApi.bookmark(
            blog.id
          );

          toast.success(
            "Saved to bookmarks"
          );
        } else {
          await postsApi.removeBookmark(
            blog.id
          );

          toast.success(
            "Removed from bookmarks"
          );
        }
      } catch (error) {
        setBookmarked(
          !nextBookmarked
        );

        toast.error(
          error instanceof ApiError
            ? error.message
            : "Couldn't update bookmark right now."
        );
      } finally {
        setIsBookmarking(false);
      }
    };


  // ==========================================================
  // REPOST HANDLER
  // ==========================================================

  const handleToggleReshare =
    async () => {
      if (isResharing) return;

      const nextReshared =
        !reshared;

      setReshared(nextReshared);

      setResharesCount(
        (count) =>
          count +
          (nextReshared ? 1 : -1)
      );

      setIsResharing(true);

      try {
        const data =
          nextReshared
            ? await postsApi.reshare(
                blog.id
              )
            : await postsApi.unreshare(
                blog.id
              );

        setResharesCount(
          data.resharesCount
        );

        if (nextReshared) {
          toast.success(
            "Post reposted to your network"
          );
        }
      } catch (error) {
        setReshared(
          !nextReshared
        );

        setResharesCount(
          (count) =>
            count +
            (nextReshared
              ? -1
              : 1)
        );

        toast.error(
          error instanceof ApiError
            ? error.message
            : "Couldn't repost right now."
        );
      } finally {
        setIsResharing(false);
      }
    };


  // ==========================================================
  // AUTHOR INITIALS
  // ==========================================================

  const authorInitials =
    blog.author.name
      .split(" ")
      .map(
        (name) => name[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <article
        className="
          group
          relative
          border-b
          border-gray-200
          py-7
          first:pt-6
          last:border-b-0
          sm:py-8
        "
      >

        {/* ====================================================
            RECOMMENDATION / TOPIC
        ===================================================== */}

        {(
          blog.recommendationReason ||
          blog.topic
        ) && (
          <div
            className="
              mb-5
              flex
              items-center
              gap-2
              text-xs
              text-gray-500
            "
          >
            <FileText
              className="
                h-3.5
                w-3.5
                shrink-0
                text-gray-500
              "
              strokeWidth={1.8}
            />

            <span>
              {blog.recommendationReason ??
                "Because you follow"}
            </span>

            {blog.topic && (
              <>
                <span className="text-gray-300">
                  ·
                </span>

                <span className="font-medium text-gray-700">
                  {blog.topic}
                </span>
              </>
            )}
          </div>
        )}


        {/* ====================================================
            AUTHOR ROW
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5
            "
          >

            <Avatar
              className="
                h-7
                w-7
                shrink-0
              "
            >
              <AvatarImage
                src={
                  blog.author.avatar
                }
                alt={
                  blog.author.name
                }
              />

              <AvatarFallback
                className="
                  bg-gray-100
                  text-[9px]
                  font-semibold
                  text-gray-700
                "
              >
                {authorInitials}
              </AvatarFallback>
            </Avatar>


            <div
              className="
                flex
                min-w-0
                flex-wrap
                items-center
                gap-x-1
                text-xs
              "
            >

              <span
                className="
                  font-semibold
                  text-gray-900
                "
              >
                {blog.author.name}
              </span>

              <span className="text-gray-300">
                ·
              </span>

              <span
                className="
                  truncate
                  text-gray-500
                "
              >
                {blog.date}
              </span>

            </div>
          </div>


          {/* MORE */}

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="More actions"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-gray-500
                  transition-colors
                  hover:bg-gray-100
                  hover:text-gray-950
                "
              >
                <MoreHorizontal
                  className="h-4 w-4"
                />
              </button>
            </PopoverTrigger>


            <PopoverContent
              align="end"
              className="
                w-48
                rounded-xl
                p-1.5
              "
            >

              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  text-gray-700
                  hover:bg-gray-100
                "
              >
                <UserPlus className="h-4 w-4" />
                Follow author
              </button>


              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  text-gray-700
                  hover:bg-gray-100
                "
              >
                <UserMinus className="h-4 w-4" />
                Unfollow author
              </button>


              <button
                type="button"
                onClick={
                  handleToggleBookmark
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  text-gray-700
                  hover:bg-gray-100
                "
              >
                <Bookmark className="h-4 w-4" />

                {bookmarked
                  ? "Remove bookmark"
                  : "Save post"}
              </button>


              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  text-gray-700
                  hover:bg-gray-100
                "
              >
                <ExternalLink className="h-4 w-4" />
                Share
              </button>


              <div
                className="
                  my-1
                  border-t
                  border-gray-100
                "
              />


              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  text-red-600
                  hover:bg-red-50
                "
              >
                <Flag className="h-4 w-4" />
                Report
              </button>

            </PopoverContent>
          </Popover>
        </div>


        {/* ====================================================
            ARTICLE BODY
        ===================================================== */}

        <div
          className="
            mt-4
            flex
            min-w-0
            items-start
            gap-5
            sm:gap-7
          "
        >

          {/* TEXT */}

          <div
            className="
              min-w-0
              flex-1
            "
          >

            <h2
              className="
                cursor-pointer
                text-[21px]
                font-extrabold
                leading-[1.18]
                tracking-[-0.035em]
                text-gray-950
                transition-colors
                group-hover:text-gray-700

                sm:text-[25px]
                sm:leading-[1.18]
              "
            >
              {blog.title}
            </h2>


            <p
              className="
                mt-2
                line-clamp-3
                text-[14px]
                leading-[1.55]
                text-gray-600

                sm:text-[15px]
                sm:leading-6
              "
            >
              {blog.content}
            </p>

          </div>


          {/* ==================================================
              IMAGE
          =================================================== */}

          {blog.image && (
            <div
              className="
                relative
                h-[92px]
                w-[120px]
                shrink-0
                overflow-hidden
                bg-gray-100

                sm:h-[105px]
                sm:w-[155px]
              "
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-[1.04]
                "
              />
            </div>
          )}

        </div>


        {/* ====================================================
            REACTIONS
        ===================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
          "
        >

          {/* LEFT ACTIONS */}

          <div
            className="
              flex
              items-center
              gap-0.5
            "
          >

            {/* STAR */}

            <button
              type="button"
              disabled={isLiking}
              onClick={
                handleToggleLike
              }
              aria-label={
                liked
                  ? "Remove star"
                  : "Star post"
              }
              className="
                group/action
                flex
                h-8
                items-center
                gap-1.5
                rounded-md
                px-2
                text-xs
                text-gray-500
                transition-colors
                hover:bg-gray-100
                hover:text-gray-950
              "
            >
              {liked ? (
                <Star
                  className="
                    h-[15px]
                    w-[15px]
                    transition-transform
                    group-hover/action:scale-110
                  "
                  fill="currentColor"
                />
              ) : (
                <StarOff
                  className="
                    h-[15px]
                    w-[15px]
                    transition-transform
                    group-hover/action:scale-110
                  "
                />
              )}

              <span>
                {likesCount}
              </span>
            </button>


            {/* COMMENTS */}

            <button
              type="button"
              onClick={() =>
                setCommentSheetOpen(
                  true
                )
              }
              aria-label="Open comments"
              className="
                group/action
                flex
                h-8
                items-center
                gap-1.5
                rounded-md
                px-2
                text-xs
                text-gray-500
                transition-colors
                hover:bg-gray-100
                hover:text-gray-950
              "
            >
              <MessageCircle
                className="
                  h-[15px]
                  w-[15px]
                  transition-transform
                  group-hover/action:scale-110
                "
              />

              <span>
                {blog.comments}
              </span>
            </button>


            {/* REPOST */}

            <button
              type="button"
              disabled={
                isResharing
              }
              onClick={
                handleToggleReshare
              }
              aria-label={
                reshared
                  ? "Undo repost"
                  : "Repost"
              }
              className="
                group/action
                flex
                h-8
                items-center
                gap-1.5
                rounded-md
                px-2
                text-xs
                text-gray-500
                transition-colors
                hover:bg-gray-100
                hover:text-gray-950
              "
            >
              <Repeat2
                className="
                  h-[15px]
                  w-[15px]
                  transition-transform
                  group-hover/action:scale-110
                "
              />

              <span>
                {resharesCount}
              </span>
            </button>
          </div>


          {/* BOOKMARK */}

          <button
            type="button"
            disabled={
              isBookmarking
            }
            onClick={
              handleToggleBookmark
            }
            aria-label={
              bookmarked
                ? "Remove bookmark"
                : "Bookmark post"
            }
            className="
              group/bookmark
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              text-gray-500
              transition-colors
              hover:bg-gray-100
              hover:text-gray-950
            "
          >
            {bookmarked ? (
              <BookmarkCheck
                className="
                  h-[17px]
                  w-[17px]
                  transition-transform
                  group-hover/bookmark:scale-110
                "
                fill="currentColor"
              />
            ) : (
              <Bookmark
                className="
                  h-[17px]
                  w-[17px]
                  transition-transform
                  group-hover/bookmark:scale-110
                "
              />
            )}
          </button>

        </div>
      </article>


      {/* ======================================================
          COMMENT SHEET
      ======================================================= */}

      <CommentSheet
        blog={blog}
        open={commentSheetOpen}
        onOpenChange={
          setCommentSheetOpen
        }
      />
    </>
  );
};

export default BlogCard;