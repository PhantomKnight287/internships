import { FC, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import remarkGfm from "remark-gfm";
import styles from "./renderer.module.css";
import rehypeRaw from "rehype-raw";
import clsx from "clsx";
import remarkGemoji from "remark-gemoji";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
      h1: ({ children, ...props }) => (
        <h1
          className={styles.h1}
          style={{
            ...props.style,
          }}
        >
          {children}
        </h1>
      ),
      h2: ({ children, ...props }) => (
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
      h3: ({ children, ...props }) => (
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
      h4: ({ ...props }) => (
        <h4
          {...props}
          className={styles.h4}
          style={{
            ...props.style,
          }}
        />
      ),
      h5: ({ ...props }) => (
        <h5
          {...props}
          className={styles.h5}
          style={{
            ...props.style,
          }}
        />
      ),
      h6: ({ ...props }) => (
        <h6
          {...props}
          className={styles.h6}
          style={{
            ...props.style,
          }}
        />
      ),
      ul: ({ ...props }) => <ul {...props} className={"list-disc ml-4"} />,
      ol: ({ ...props }) => <ol {...props} className={"list-decimal ml-4"} />,
      img: ({ ...props }) => (
        <>
          {/\b\.(?:mp4|mov|avi|flv|wmv|mkv|webm)\b$/.test(
            props.src as string
          ) ? (
            <video
              {...(props as unknown as React.VideoHTMLAttributes<HTMLVideoElement>)}
              controls
              className={clsx("rounded-md", styles.video)}
            />
          ) : (
            <img {...props} />
          )}
        </>
      ),
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, "")}
            language={match[1]}
            style={atomOneLight as any}
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
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
