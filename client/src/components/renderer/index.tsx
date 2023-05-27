/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { FC, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import remarkGfm from "remark-gfm";
import styles from "./renderer.module.css";
import rehypeRaw from "rehype-raw";
import clsx from "clsx";
import remarkGemoji from "remark-gemoji";

export const Renderer: FC<{
  content: string;
  classes?: string;
  removeComponents?: boolean;
}> = ({ content, classes, removeComponents }) => {
  const components:
    | Partial<
        Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
      >
    | undefined = useMemo(() => {
    return {
      h1: ({ node, children, ...props }) => (
        <h1
          className={styles.h1}
          style={{
            ...props.style,
          }}
        >
          {children}
        </h1>
      ),
      h2: ({ node, children, ...props }) => (
        <h2
          {...props}
          className={styles.h2}
          style={{
            ...props.style,
          }}
        >
          {children}
        </h2>
      ),
      h3: ({ node, children, ...props }) => (
        <h3
          {...props}
          className={styles.h3}
          style={{
            ...props.style,
          }}
        >
          {children}
        </h3>
      ),
      h4: ({ node, ...props }) => (
        <h4
          {...props}
          className={styles.h4}
          style={{
            ...props.style,
          }}
        />
      ),
      h5: ({ node, ...props }) => (
        <h5
          {...props}
          className={styles.h5}
          style={{
            ...props.style,
          }}
        />
      ),
      h6: ({ node, ...props }) => (
        <h6
          {...props}
          className={styles.h6}
          style={{
            ...props.style,
          }}
        />
      ),
      ul: ({ node, ...props }) => (
        <ul {...props} className={"list-disc ml-4"} />
      ),
      ol: ({ node, ...props }) => (
        <ol {...props} className={"list-decimal ml-4"} />
      ),
      img: ({ node, ...props }) => (
        <>
          {/\b\.(?:mp4|mov|avi|flv|wmv|mkv|webm)\b$/.test(props.src!) ? (
            <video
              {...(props as any)}
              controls
              className={clsx("rounded-md", styles.video)}
            />
          ) : (
            <img {...props} />
          )}
        </>
      ),
    };
  }, []);
  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkGemoji]}
        components={removeComponents ? undefined : components}
        skipHtml={false}
        rehypePlugins={[rehypeRaw]}
        className={clsx(styles.renderer, classes)}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
