import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import UnderlineExtension from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "rounded-xl bg-gray-950 px-4 py-4 text-sm leading-7 text-gray-100",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "border-l-4 border-gray-300 pl-5 italic text-gray-600",
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: "my-8 border-gray-200",
          },
        },
      }),

      UnderlineExtension,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Highlight.configure({
        multicolor: false,
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),

      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "prose prose-gray mt-10 min-h-[500px] max-w-none text-[17px] leading-8 outline-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-gray-700 prose-a:text-gray-900 prose-blockquote:border-l-gray-300 prose-blockquote:text-gray-600 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5",
      },
    },

    onFocus: () => {
      setIsFocused(true);
    },

    onBlur: () => {
      setIsFocused(false);
    },
  });

  /*
   * Add / edit link.
   */
  const addLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter URL",
      previousUrl || "https://"
    );

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  /*
   * Toggle heading.
   */
  const toggleHeading = (level: 2 | 3) => {
    editor
      ?.chain()
      .focus()
      .toggleHeading({ level })
      .run();
  };

  /*
   * Insert divider.
   */
  const insertDivider = () => {
    editor?.chain().focus().setHorizontalRule().run();
  };

  /*
   * Insert code block.
   */
  const toggleCodeBlock = () => {
    editor?.chain().focus().toggleCodeBlock().run();
  };

  /*
   * Highlight selected text.
   */
  const toggleHighlight = () => {
    editor?.chain().focus().toggleHighlight().run();
  };

  /*
   * Save / publish post.
   *
   * status: "draft" | "published"
   */
  const savePost = async (status: "draft" | "published") => {
    if (!editor) return;

    if (!title.trim()) {
      alert("Please add a title before saving.");
      return;
    }

    if (editor.isEmpty) {
      alert("Please write some content before saving.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          excerpt,
          html: editor.getHTML(),
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save post");
      }

      console.log("Saved post:", data.post);

      // TODO: redirect to the post, or show a success toast
    } catch (error) {
      console.error("Save failed:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving your post"
      );
    } finally {
      setIsSaving(false);
    }
  };

  /*
   * Cleanup editor.
   */
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="relative mx-auto w-full max-w-4xl">
        {/* ========================================================= */}
        {/* Dynamic Island Toolbar */}
        {/* ========================================================= */}

        <div
          ref={toolbarRef}
          className={`
            sticky top-4 z-30 mb-10 flex justify-center
            transition-all duration-300
            ${
              isFocused
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-95"
            }
          `}
        >
          <div
            className="
              flex max-w-full items-center gap-1
              overflow-x-auto
              rounded-2xl
              border border-gray-200
              bg-white/95
              px-2 py-1.5
              shadow-lg shadow-black/5
              backdrop-blur-xl
              scrollbar-none
            "
          >
            {/* ===================================================== */}
            {/* Undo / Redo */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={!editor.can().undo()}
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor.chain().focus().undo().run()
                  }
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Undo</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={!editor.can().redo()}
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor.chain().focus().redo().run()
                  }
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Redo</TooltipContent>
            </Tooltip>

            <Separator
              orientation="vertical"
              className="mx-1 h-5 shrink-0"
            />

            {/* ===================================================== */}
            {/* Paragraph */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("paragraph")
                      ? "secondary"
                      : "ghost"
                  }
                  className="h-8 shrink-0 rounded-lg px-2.5 text-xs font-medium"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setParagraph()
                      .run()
                  }
                >
                  Paragraph
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Normal paragraph
              </TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* H2 */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("heading", {
                      level: 2,
                    })
                      ? "secondary"
                      : "ghost"
                  }
                  className="h-8 shrink-0 rounded-lg px-2.5 text-sm font-semibold"
                  onClick={() => toggleHeading(2)}
                >
                  H2
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Heading 2
              </TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* H3 */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("heading", {
                      level: 3,
                    })
                      ? "secondary"
                      : "ghost"
                  }
                  className="h-8 shrink-0 rounded-lg px-2.5 text-sm font-semibold"
                  onClick={() => toggleHeading(3)}
                >
                  H3
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Heading 3
              </TooltipContent>
            </Tooltip>

            <Separator
              orientation="vertical"
              className="mx-1 h-5 shrink-0"
            />

            {/* ===================================================== */}
            {/* Bold */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("bold")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor.chain().focus().toggleBold().run()
                  }
                >
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Bold</TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* Italic */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("italic")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleItalic()
                      .run()
                  }
                >
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Italic</TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* Underline */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("underline")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleUnderline()
                      .run()
                  }
                >
                  <Underline className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Underline</TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* Strikethrough */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("strike")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleStrike()
                      .run()
                  }
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Strikethrough
              </TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* Highlight */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("highlight")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={toggleHighlight}
                >
                  <Highlighter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Highlight
              </TooltipContent>
            </Tooltip>

            <Separator
              orientation="vertical"
              className="mx-1 h-5 shrink-0"
            />

            {/* ===================================================== */}
            {/* Alignment */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive({ textAlign: "left" })
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setTextAlign("left")
                      .run()
                  }
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Align left
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive({ textAlign: "center" })
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setTextAlign("center")
                      .run()
                  }
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Center
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive({ textAlign: "right" })
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setTextAlign("right")
                      .run()
                  }
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Align right
              </TooltipContent>
            </Tooltip>

            <Separator
              orientation="vertical"
              className="mx-1 h-5 shrink-0"
            />

            {/* ===================================================== */}
            {/* Lists */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("bulletList")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleBulletList()
                      .run()
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Bullet list
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("orderedList")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleOrderedList()
                      .run()
                  }
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Numbered list
              </TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* Quote */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("blockquote")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleBlockquote()
                      .run()
                  }
                >
                  <Quote className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Quote</TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* Code */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("codeBlock")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={toggleCodeBlock}
                >
                  <Code className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Code block
              </TooltipContent>
            </Tooltip>

            <Separator
              orientation="vertical"
              className="mx-1 h-5 shrink-0"
            />

            {/* ===================================================== */}
            {/* Link */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={
                    editor.isActive("link")
                      ? "secondary"
                      : "ghost"
                  }
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={addLink}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Add link
              </TooltipContent>
            </Tooltip>

            {/* ===================================================== */}
            {/* Divider */}
            {/* ===================================================== */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-lg"
                  onClick={insertDivider}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Divider
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Editor */}
        {/* ========================================================= */}

        <article className="px-4 pb-24 sm:px-8">
          {/* ======================================================= */}
          {/* Title */}
          {/* ======================================================= */}

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Title"
            className="
              w-full
              border-0
              bg-transparent
              text-4xl
              font-bold
              tracking-tight
              text-gray-950
              outline-none
              placeholder:text-gray-300
              sm:text-5xl
            "
          />

          {/* ======================================================= */}
          {/* Subtitle */}
          {/* ======================================================= */}

          <textarea
            value={excerpt}
            onChange={(event) =>
              setExcerpt(event.target.value)
            }
            placeholder="Write a short introduction..."
            rows={2}
            className="
              mt-4
              w-full
              resize-none
              border-0
              bg-transparent
              text-lg
              leading-relaxed
              text-gray-500
              outline-none
              placeholder:text-gray-300
            "
          />

          {/* ======================================================= */}
          {/* Cover Image */}
          {/* ======================================================= */}

          <button
            type="button"
            className="
              mt-8
              flex
              min-h-[180px]
              w-full
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-gray-50
              text-sm
              text-gray-400
              transition-colors
              hover:border-gray-300
              hover:bg-gray-100
            "
          >
            Add a cover image
          </button>

          {/* ======================================================= */}
          {/* TipTap Content */}
          {/* ======================================================= */}

          <div className="mt-10">
            <EditorContent editor={editor} />
          </div>

          {/* ======================================================= */}
          {/* Save / Publish */}
          {/* ======================================================= */}

          <div className="mt-10 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => savePost("draft")}
              className="rounded-full px-6"
            >
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>

            <Button
              type="button"
              disabled={isSaving}
              onClick={() => savePost("published")}
              className="rounded-full bg-gray-900 px-6 hover:bg-gray-800"
            >
              {isSaving ? "Publishing..." : "Publissh"}
            </Button>
          </div>
        </article>
      </div>
    </TooltipProvider>
  );
};

export default BlogEditor;