import * as React from "react";
import {
  Dialog as SheetPrimitive,
} from "@base-ui/react/dialog";
import {
  motion,
} from "framer-motion";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { XIcon } from "lucide-react";


// ============================================================
// ANIMATION
// ============================================================

const overlayAnimation = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};


const sheetAnimation = {
  initial: {
    x: "100%",
    opacity: 0,
  },

  animate: {
    x: 0,
    opacity: 1,
  },

  exit: {
    x: "100%",
    opacity: 0,
  },
};


const transition = {
  type: "spring" as const,
  stiffness: 320,
  damping: 32,
  mass: 0.8,
};


// ============================================================
// SHEET ROOT
// ============================================================

function Sheet({
  ...props
}: SheetPrimitive.Root.Props) {
  return (
    <SheetPrimitive.Root
      data-slot="sheet"
      {...props}
    />
  );
}


// ============================================================
// SHEET TRIGGER
// ============================================================

function SheetTrigger({
  ...props
}: SheetPrimitive.Trigger.Props) {
  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      {...props}
    />
  );
}


// ============================================================
// SHEET CLOSE
// ============================================================

function SheetClose({
  ...props
}: SheetPrimitive.Close.Props) {
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      {...props}
    />
  );
}


// ============================================================
// SHEET PORTAL
// ============================================================

function SheetPortal({
  ...props
}: SheetPrimitive.Portal.Props) {
  return (
    <SheetPrimitive.Portal
      data-slot="sheet-portal"
      {...props}
    />
  );
}


// ============================================================
// SHEET CONTENT
// ============================================================

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  const getAnimation = () => {
    switch (side) {
      case "left":
        return {
          initial: {
            x: "-100%",
            opacity: 0,
          },

          animate: {
            x: 0,
            opacity: 1,
          },

          exit: {
            x: "-100%",
            opacity: 0,
          },
        };

      case "top":
        return {
          initial: {
            y: "-100%",
            opacity: 0,
          },

          animate: {
            y: 0,
            opacity: 1,
          },

          exit: {
            y: "-100%",
            opacity: 0,
          },
        };

      case "bottom":
        return {
          initial: {
            y: "100%",
            opacity: 0,
          },

          animate: {
            y: 0,
            opacity: 1,
          },

          exit: {
            y: "100%",
            opacity: 0,
          },
        };

      case "right":
      default:
        return sheetAnimation;
    }
  };


  const animation = getAnimation();


  return (
    <SheetPortal>

      <SheetPrimitive.Backdrop
        render={
          <motion.div
            className="
              fixed
              inset-0
              z-50
              bg-black/20
              backdrop-blur-[2px]
            "

            initial="initial"
            animate="animate"
            exit="exit"

            variants={overlayAnimation}

            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        }
      />


      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}

        render={
          <motion.div
            variants={animation}

            initial="initial"
            animate="animate"
            exit="exit"

            transition={transition}

            style={{
              willChange: "transform, opacity",
            }}
          />
        }

        className={cn(
          `
          fixed
          z-50

          flex
          flex-col
          gap-4

          bg-popover
          bg-clip-padding
          text-sm
          text-popover-foreground

          shadow-2xl
          outline-none

          data-[side=right]:inset-y-0
          data-[side=right]:right-0
          data-[side=right]:h-full
          data-[side=right]:w-full
          data-[side=right]:border-l

          data-[side=left]:inset-y-0
          data-[side=left]:left-0
          data-[side=left]:h-full
          data-[side=left]:w-full
          data-[side=left]:border-r

          data-[side=top]:inset-x-0
          data-[side=top]:top-0
          data-[side=top]:h-auto
          data-[side=top]:border-b

          data-[side=bottom]:inset-x-0
          data-[side=bottom]:bottom-0
          data-[side=bottom]:h-auto
          data-[side=bottom]:border-t

          sm:data-[side=right]:w-[540px]
          sm:data-[side=left]:w-[540px]
          `,
          className
        )}

        {...props}
      >

        {children}


        {/* ====================================================
            CLOSE BUTTON
        ===================================================== */}

        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"

            render={
              <Button
                variant="ghost"

                className="
                  absolute
                  right-4
                  top-4
                  z-10

                  h-8
                  w-8

                  rounded-full
                  p-0

                  text-black

                  transition-all
                  duration-200

                  hover:bg-black/5
                  hover:text-black

                  active:scale-95
                "

                size="icon-sm"
              />
            }
          >

            <XIcon
              className="h-4 w-4"
              strokeWidth={2}
            />

            <span className="sr-only">
              Close
            </span>

          </SheetPrimitive.Close>
        )}

      </SheetPrimitive.Popup>

    </SheetPortal>
  );
}


// ============================================================
// SHEET HEADER
// ============================================================

function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1.5 p-4",
        className
      )}
      {...props}
    />
  );
}


// ============================================================
// SHEET FOOTER
// ============================================================

function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 p-4",
        className
      )}
      {...props}
    />
  );
}


// ============================================================
// SHEET TITLE
// ============================================================

function SheetTitle({
  className,
  ...props
}: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading font-medium text-foreground",
        className
      )}
      {...props}
    />
  );
}


// ============================================================
// SHEET DESCRIPTION
// ============================================================

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}


// ============================================================
// EXPORTS
// ============================================================

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};