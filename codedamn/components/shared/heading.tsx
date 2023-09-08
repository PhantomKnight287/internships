import { DetailedHTMLProps, HTMLAttributes } from "react"
import clsx from "clsx"

function Heading(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & {
    align?: "left" | "center" | "right"
  }
) {
  return (
    <h1
      {...props}
      className={clsx("text-3xl font-bold mb-6", props.className, {
        "text-left": props.align === "left",
        "text-center": props.align === "center",
        "text-right": props.align === "right",
      })}
    >
      {props.children}
    </h1>
  )
}

export default Heading
