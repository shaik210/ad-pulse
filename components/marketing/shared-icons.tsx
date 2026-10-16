import React from "react";

export const FacebookBlueIcon = ({ className = "size-5", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={className} {...props}>
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <path
      d="M15.36 12.07h-2.43v7.93h-3.25v-7.93H7.95V9.3h1.73V7.52c0-2.3 1.1-3.6 3.6-3.6h2.2v2.77h-1.37c-1.07 0-1.28.4-1.28 1.15V9.3h2.68l-.35 2.77z"
      fill="var(--background)"
    />
  </svg>
);

export const InstagramGradientIcon = ({ className = "size-5", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={className} {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
    <path
      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
);

export const MetaColorIcon = ({ className = "size-5", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={className} {...props}>
    <path
      d="M17.483 3.5c-2.103 0-3.87 1.19-5.483 2.978C10.387 4.69 8.62 3.5 6.517 3.5 2.918 3.5 0 6.84 0 11.875 0 16.91 2.918 20.25 6.517 20.25c2.103 0 3.87-1.19 5.483-2.978 1.613 1.788 3.38 2.978 5.483 2.978 3.599 0 6.517-3.34 6.517-8.375C24 6.84 21.082 3.5 17.483 3.5zm-10.966 14.5c-2.17 0-3.95-2.12-3.95-6.125s1.78-6.125 3.95-6.125c1.42 0 2.68.87 3.73 2.27-1.74 2.6-2.88 4.88-3.73 7.98-.38.16-.79.25-1.2.25zm10.966 0c-.41 0-.82-.09-1.2-.25-.85-3.1-1.99-5.38-3.73-7.98 1.05-1.4 2.31-2.27 3.73-2.27 2.17 0 3.95 2.12 3.95 6.125s-1.78 6.125-3.95 6.125z"
      fill="currentColor"
    />
  </svg>
);

export const GoogleIcon = ({ className = "size-5", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={className} {...props}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="currentColor"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="currentColor"
      fillOpacity="0.8"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="currentColor"
      fillOpacity="0.9"
    />
  </svg>
);
