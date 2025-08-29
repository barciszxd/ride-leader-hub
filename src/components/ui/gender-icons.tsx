import * as React from 'react';

// Lucide-like props
import { SVGProps } from 'react';

export const MarsIcon = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-mars-icon ${props.className || ''}`.trim()}
    {...props}
  >
    <path d="M16 3h5v5"/>
    <path d="m21 3-6.75 6.75"/>
    <circle cx="10" cy="14" r="6"/>
  </svg>
));

export const VenusIcon = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-venus-icon ${props.className || ''}`.trim()}
    {...props}
  >
    <path d="M12 15v7"/>
    <path d="M9 19h6"/>
    <circle cx="12" cy="9" r="6"/>
  </svg>
));
