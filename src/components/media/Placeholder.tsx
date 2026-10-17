import React from 'react';

/**
 * ONE JOB: Fallback placeholder for media slots awaiting licensed assets.
 * Meets §6.5: flat surface, 1px border, centered mono label, carries data-placeholder="true".
 */

interface PlaceholderProps {
  label: string;
  aspect?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  label,
  aspect = 'aspect-video',
  className = '',
  width,
  height,
}) => {
  return (
    <div
      data-placeholder="true"
      className={`relative w-full ${aspect} bg-[#EAE8E1] border border-black/15 flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0, rgba(0, 0, 0, 0.03) 1px, transparent 0, transparent 16px)',
      }}
    >
      <div className="font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold px-3 py-1.5 border border-black/20 bg-[#F4F3EF]">
        {label}
      </div>
      <div className="font-tech text-[10px] uppercase tracking-wider text-neutral-500 mt-2">
        {width && height ? `${width} × ${height} · ` : ''}Awaiting Production Asset
      </div>
    </div>
  );
};
