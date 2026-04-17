import { ArrowUpRight, X } from 'lucide-react';
import type { ReactNode } from 'react';

import { IconButton } from '../controls/IconButton';
import { Heading, Text } from '../typography';
import { cx } from '../utils/cx';

export type ToastTone = 'graph-1' | 'graph-2' | 'graph-3' | 'graph-4';

export interface ToastProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  meta?: ReactNode;
  actionLabel?: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
  onDismiss?: () => void;
  tone?: ToastTone;
  className?: string;
}

export function Toast({
  title,
  description,
  icon,
  meta,
  actionLabel,
  actionIcon,
  onAction,
  onDismiss,
  tone = 'graph-1',
  className,
}: ToastProps) {
  const leading = icon || onAction ? (
    <div className="ds-toast-leading">
      {icon ? <div className="ds-toast-icon">{icon}</div> : null}
      {onAction ? (
        <IconButton
          appearance="toolbar"
          className="ds-toast-open-button"
          label={actionLabel ?? `Open ${title}`}
          icon={actionIcon ?? <ArrowUpRight size={16} />}
          onClick={onAction}
        />
      ) : null}
    </div>
  ) : (
    <div className="ds-toast-leading-spacer" aria-hidden="true" />
  );
  const utility = onDismiss || onAction ? (
    <div className="ds-toast-utility">
      {onDismiss ? (
        <IconButton
          appearance="ghost"
          className="ds-toast-dismiss"
          label={`Dismiss ${title}`}
          icon={<X size={16} />}
          onClick={onDismiss}
        />
      ) : null}
    </div>
  ) : null;

  return (
    <section
      className={cx('ds-toast', className)}
      data-tone={tone}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="ds-toast-main">
        {leading}
        <div className="ds-toast-copy">
          <div className="ds-toast-copy-row">
            <Heading level="inline" as="span" className="ds-toast-title">
              {title}
            </Heading>
            {meta ? <div className="ds-toast-meta">{meta}</div> : null}
          </div>
          {description ? <Text variant="quiet">{description}</Text> : null}
        </div>
        {utility}
      </div>
    </section>
  );
}
