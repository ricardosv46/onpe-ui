import { SVGProps } from "react"

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#062A50"
      d="M24 12c0 6.625-5.375 12-12 12S0 18.625 0 12C.006 5.375 5.375 0 12.006 0 18.631 0 24 5.375 24 12Z"
    />
    <path
      fill="#fff"
      d="M17.176 6.915H6.83c-1.02 0-1.848.827-1.848 1.848v6.468c0 1.02.828 1.848 1.848 1.848h10.34c1.02 0 1.848-.827 1.848-1.848V8.763a1.84 1.84 0 0 0-1.842-1.848Zm-3.51 5.532-2.874 1.437a.499.499 0 0 1-.724-.447v-2.874c0-.369.392-.61.724-.447l2.875 1.437a.503.503 0 0 1 0 .894Z"
    />
  </svg>
)
export default YoutubeIcon
