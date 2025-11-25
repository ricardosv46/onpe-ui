import { SVGProps } from "react";

const FaceBookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M24 12c0 6.625-5.375 12-12 12S0 18.625 0 12 5.375 0 12 0s12 5.375 12 12Z"
    />
    <path
      fill="#fff"
      d="m15.551 11.07-.2 1.606a.54.54 0 0 1-.53.471h-2.598v6.71a9.395 9.395 0 0 1-2.669-.145v-6.57H7.555a.335.335 0 0 1-.332-.333v-2.011c0-.181.15-.332.332-.332h2V7.452a3.339 3.339 0 0 1 3.333-3.346h2.33c.182 0 .333.151.333.333v2.01c0 .182-.15.333-.332.333h-1.667c-.737 0-1.335.598-1.335 1.34v2.344h2.803c.326 0 .573.284.531.604Z"
    />
  </svg>
);
export default FaceBookIcon;
