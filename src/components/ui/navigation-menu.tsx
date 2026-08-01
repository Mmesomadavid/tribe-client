import * as React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { cn } from '../../lib/utils';

function NavigationMenu({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="navigation-menu"
      className={cn('relative z-10 flex items-center', className)}
      {...props}
    />
  );
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="navigation-menu-list"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, children, ...props }: React.ComponentProps<'li'>) {
  const [isOpen, setIsOpen] = React.useState(false);

  const renderedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child as React.ReactElement<any>, {
      isOpen,
      onOpenChange: setIsOpen,
    });
  });

  return (
    <li
      data-slot="navigation-menu-item"
      className={cn('relative group', className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...props}
    >
      {renderedChildren}
    </li>
  );
}

function NavigationMenuTrigger({
  className,
  children,
  isOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<'button'> & {
  isOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      data-slot="navigation-menu-trigger"
      aria-expanded={isOpen}
      className={cn(
        'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100 hover:text-gray-900',
        className
      )}
      onClick={() => onOpenChange?.(!isOpen)}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown size={14} className={cn('text-gray-400 transition-transform duration-150', isOpen && 'rotate-180')} />
    </button>
  );
}

function NavigationMenuContent({
  className,
  isOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<'div'> & {
  isOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      data-slot="navigation-menu-content"
      className={cn(
        'absolute left-0 top-full mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl',
        className
      )}
      onMouseEnter={() => onOpenChange?.(true)}
      onMouseLeave={() => onOpenChange?.(false)}
      {...props}
    />
  );
}

function NavigationMenuLink({ className, href, ...props }: React.ComponentProps<'a'> & { href?: string }) {
  if (!href) {
    return (
      <a
        data-slot="navigation-menu-link"
        className={cn(
          'flex items-center rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-gray-900',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <Link
      data-slot="navigation-menu-link"
      to={href}
      className={cn(
        'flex items-center rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-gray-900',
        className
      )}
      {...props}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
};
