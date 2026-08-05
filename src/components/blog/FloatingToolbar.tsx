import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  Bold,
  Italic,
  Link2,
  Image as ImageIcon,
  FileText,
  Palette,
  Loader2,
  Check,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip';
import { Separator } from '../ui/separator';

const COLORS = [
  '#0a0a0a',
  '#525252',
  '#dc2626',
  '#ea580c',
  '#ca8a04',
  '#16a34a',
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#0891b2',
];

export type ToolbarStatus = 'idle' | 'posting' | 'posted';

type FloatingToolbarProps = {
  onBold: () => void;
  onItalic: () => void;
  onColor: (color: string) => void;
  onInsertLink: () => void;
  onInsertImage: (file: File) => void;
  onAttachDocument: (file: File) => void;
  onPost: () => void;
  status: ToolbarStatus;
};

export default function FloatingToolbar({
  onBold,
  onItalic,
  onColor,
  onInsertLink,
  onInsertImage,
  onAttachDocument,
  onPost,
  status,
}: FloatingToolbarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const postBtnRef = useRef<HTMLButtonElement>(null);

  // Stagger the tool icons in once the bar itself has mounted.
  useEffect(() => {
    if (!barRef.current) return;
    const buttons = barRef.current.querySelectorAll('[data-tool-btn]');
    gsap.fromTo(
      buttons,
      { opacity: 0, y: 10, scale: 0.7 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.045, delay: 0.15 },
    );
  }, []);

  // Little "posted!" bounce on the post button when it succeeds.
  useEffect(() => {
    if (status === 'posted' && postBtnRef.current) {
      gsap
        .timeline()
        .to(postBtnRef.current, { scale: 0.88, duration: 0.12, ease: 'power2.out' })
        .to(postBtnRef.current, { scale: 1.08, duration: 0.22, ease: 'back.out(3)' })
        .to(postBtnRef.current, { scale: 1, duration: 0.15, ease: 'power2.out' });
    }
  }, [status]);

  const toolButtonClass =
    'flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-950';

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div
        ref={barRef}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4"
      >
        <div className="flex items-center gap-1 rounded-full border border-gray-100 bg-white/95 p-1.5 shadow-xl backdrop-blur-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                data-tool-btn
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onBold();
                }}
                className={toolButtonClass}
              >
                <Bold size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-[80]">Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                data-tool-btn
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onItalic();
                }}
                className={toolButtonClass}
              >
                <Italic size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-[80]">Italic</TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger asChild>
              <button
                data-tool-btn
                type="button"
                title="Text color"
                onMouseDown={(e) => e.preventDefault()}
                className={toolButtonClass}
              >
                <Palette size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" sideOffset={10} className="z-[80] w-auto p-2">
              <div className="grid grid-cols-5 gap-1.5">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onColor(color);
                    }}
                    className="h-6 w-6 rounded-full ring-1 ring-inset ring-black/10 transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    aria-label={color}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                data-tool-btn
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onInsertLink();
                }}
                className={toolButtonClass}
              >
                <Link2 size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-[80]">Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                data-tool-btn
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => imageInputRef.current?.click()}
                className={toolButtonClass}
              >
                <ImageIcon size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-[80]">Image</TooltipContent>
          </Tooltip>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onInsertImage(file);
              e.target.value = '';
            }}
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                data-tool-btn
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => docInputRef.current?.click()}
                className={toolButtonClass}
              >
                <FileText size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-[80]">Attach document</TooltipContent>
          </Tooltip>
          <input
            ref={docInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onAttachDocument(file);
              e.target.value = '';
            }}
          />

          <Separator orientation="vertical" className="mx-1 h-6 bg-gray-200" />

          <button
            ref={postBtnRef}
            data-tool-btn
            type="button"
            disabled={status !== 'idle'}
            onClick={onPost}
            className="flex h-9 items-center gap-1.5 rounded-full bg-gray-950 px-4 text-[13px] font-medium text-white transition-colors hover:bg-black disabled:opacity-90"
          >
            {status === 'posting' && <Loader2 size={14} className="animate-spin" />}
            {status === 'posted' && <Check size={14} />}
            {status === 'idle' && 'Post'}
            {status === 'posting' && 'Posting…'}
            {status === 'posted' && 'Posted'}
          </button>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}