import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { X, FileText as FileIcon } from 'lucide-react';
import FloatingToolbar, { type ToolbarStatus } from './FloatingToolbar';
// ASSUMPTION: your AuthContext exposes the access token under this name.
// generateTokens() returns an accessToken in the login/verify-otp response
// body (not a cookie), so something in your app must already be holding onto
// it — adjust this import/field name to match wherever that actually lives.
import { useAuth } from '../../contexts/Authcontext';

type PublishedPost = Record<string, unknown>;

type BlogEditorProps = {
  onClose: () => void;
  /** Called once the post is actually saved, with the post returned by the API. */
  onPublish?: (post: PublishedPost) => void;
};

export default function BlogEditor({ onClose, onPublish }: BlogEditorProps) {
  const { accessToken } = useAuth() as { accessToken?: string | null };
  const editorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const [title, setTitle] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [status, setStatus] = useState<ToolbarStatus>('idle');
  // Portals need `document`, which isn't available during SSR — only render
  // once mounted on the client.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // Lock page scroll behind the full-screen editor while it's open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      );
    }
  }, []);

  // The toolbar lives outside the contentEditable region, so clicking it would
  // normally blur the editor and lose the text selection. We track the last
  // selection made inside the editor and restore it before running a command.
  useEffect(() => {
    const saveSelection = () => {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
        savedRangeRef.current = sel.getRangeAt(0).cloneRange();
      }
    };
    document.addEventListener('selectionchange', saveSelection);
    return () => document.removeEventListener('selectionchange', saveSelection);
  }, []);

  const withSelection = (command: () => void) => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
    command();
  };

  const handleBold = () => withSelection(() => document.execCommand('bold'));
  const handleItalic = () => withSelection(() => document.execCommand('italic'));
  const handleColor = (color: string) =>
    withSelection(() => document.execCommand('foreColor', false, color));

  const handleInsertLink = () => {
    const url = window.prompt('Paste a URL');
    if (!url) return;
    withSelection(() => document.execCommand('createLink', false, url));
  };

  const handleInsertImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      withSelection(() => document.execCommand('insertImage', false, reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleAttachDocument = (file: File) => {
    setAttachments((prev) => [...prev, file.name]);
  };

  const handlePost = async () => {
    if (status !== 'idle') return;

    if (!title.trim()) {
      titleRef.current?.focus();
      return;
    }
    const html = editorRef.current?.innerHTML ?? '';
    if (!html.trim()) {
      editorRef.current?.focus();
      return;
    }

    setStatus('posting');

    try {
      const base = import.meta.env.VITE_API_URL ?? '';
      const res = await fetch(`${base}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ title, html, attachments }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? 'Failed to publish post');
      }

      setStatus('posted');
      onPublish?.(data.post);
      window.setTimeout(onClose, 700);
    } catch (err) {
      console.error(err);
      setStatus('idle');
      window.alert(err instanceof Error ? err.message : 'Something went wrong publishing your post.');
    }
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[65] h-screen w-screen overflow-hidden bg-white"
    >
      <style>{`
        .blog-editor-body:empty:before {
          content: attr(data-placeholder);
          color: #d4d4d8;
          pointer-events: none;
        }
        .blog-editor-body a {
          color: #111827;
          text-decoration: underline;
        }
        .blog-editor-body img {
          max-width: 100%;
          border-radius: 0.75rem;
          margin: 1.25rem 0;
        }
      `}</style>

      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-950"
          aria-label="Close editor"
        >
          <X size={18} />
        </button>
        <span className="text-[13px] font-medium text-gray-400">Draft</span>
      </div>

      <div
        ref={panelRef}
        className="mx-auto h-[calc(100vh-4rem)] max-w-2xl overflow-y-auto px-4 pb-32 pt-10 sm:px-0"
      >
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
          }}
          placeholder="Title"
          rows={1}
          className="w-full resize-none border-0 text-3xl font-semibold leading-tight text-gray-950 placeholder:text-gray-300 focus:outline-none sm:text-4xl"
        />

        {attachments.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {attachments.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-[12.5px] font-medium text-gray-600"
              >
                <FileIcon size={12} />
                {name}
              </span>
            ))}
          </div>
        )}

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Tell your story…"
          className="blog-editor-body mt-6 min-h-[50vh] text-[17px] leading-relaxed text-gray-800 focus:outline-none"
        />
      </div>

      <FloatingToolbar
        onBold={handleBold}
        onItalic={handleItalic}
        onColor={handleColor}
        onInsertLink={handleInsertLink}
        onInsertImage={handleInsertImage}
        onAttachDocument={handleAttachDocument}
        onPost={handlePost}
        status={status}
      />
    </motion.div>,
    document.body,
  );
}