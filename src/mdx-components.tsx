import type { MDXComponents } from "mdx/types";

const components = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight first:mt-0 sm:text-3xl"
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-10 scroll-mt-24 text-xl font-semibold tracking-tight sm:text-2xl"
    >
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p {...props} className="mt-5 text-base leading-8 text-muted sm:text-lg">
      {children}
    </p>
  ),

  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className="my-5 ml-6 list-disc space-y-2 leading-7 text-muted marker:text-accent"
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className="my-5 ml-6 list-decimal space-y-2 leading-7 text-muted marker:text-accent"
    >
      {children}
    </ol>
  ),

  a: ({ children, className, ...props }) => (
    <a
      {...props}
      className={`font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-strong ${
        className ?? ""
      }`}
    >
      {children}
    </a>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-accent bg-surface px-5 py-1 italic text-muted"
    >
      {children}
    </blockquote>
  ),

  code: ({ children, className, ...props }) => (
    <code
      {...props}
      className={`rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-sm text-foreground ${
        className ?? ""
      }`}
    >
      {children}
    </code>
  ),

  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto border border-border bg-surface p-4 font-mono text-sm leading-7 text-foreground [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
    >
      {children}
    </pre>
  ),

  hr: (props) => <hr {...props} className="my-10 border-border" />,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
