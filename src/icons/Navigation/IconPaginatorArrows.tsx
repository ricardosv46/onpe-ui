import { SVGProps } from "react";

export const IconArrowLeftPaginator = (props: SVGProps<SVGSVGElement>) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
  </svg>
);

export const IconArrowLeftDoublePaginator = (props: SVGProps<SVGSVGElement>) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z" />
    <path d="m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z" />
  </svg>
);

export const IconArrowRightPaginator = (props: SVGProps<SVGSVGElement>) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);

export const IconArrowRightDoublePaginator = (props: SVGProps<SVGSVGElement>) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z" />
    <path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z" />
  </svg>
);
