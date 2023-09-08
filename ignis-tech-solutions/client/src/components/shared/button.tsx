import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    loading?: boolean;
  }
) {
  const { loading, ...rest } = props;
  return (
    <button
      {...rest}
      className={clsx(
        "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2",
        {
          "opacity-50 cursor-not-allowed": props.disabled || props.loading,
        },
        props.className
      )}
      disabled={props.disabled || props.loading}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ) : (
        <>{props.children}</>
      )}
    </button>
  );
}
