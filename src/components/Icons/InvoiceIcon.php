import classNames from "classnames";

export const ImageInvoiceIcon = ({ variant = "gray", className = "w-6 h-6" }) => {
  return (
    <svg
      className={classNames(className, {
        "text-gray-600": variant === "gray",
        "text-danger": variant === "danger",
        "text-warning": variant === "warning",
        "text-success": variant === "success",
        "text-info": variant === "info",
        "text-primary": variant === "primary",
        "text-secondary": variant === "secondary",
      })}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V4a2 2 0 0 0-2-2H6zm2 4h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
    </svg>
  )
}
