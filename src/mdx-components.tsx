import type { MDXComponents } from "mdx/types";

import { ArticleImage } from "@/components/articles/article-image";

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

  h4: ({ children, ...props }) => (
    <h4
      {...props}
      className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight sm:text-xl"
    >
      {children}
    </h4>
  ),

  h5: ({ children, ...props }) => (
    <h5
      {...props}
      className="mt-7 scroll-mt-24 text-base font-semibold tracking-tight sm:text-lg"
    >
      {children}
    </h5>
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

  table: ({ children, ...props }) => (
    <div
      className="my-6 overflow-x-auto border border-border"
      role="region"
      aria-label="Tabla desplazable horizontalmente"
      tabIndex={0}
    >
      <table
        {...props}
        className="w-full min-w-2xl border-collapse text-left text-sm sm:text-base"
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead {...props} className="bg-surface-elevated text-foreground">
      {children}
    </thead>
  ),

  th: ({ children, ...props }) => (
    <th
      {...props}
      className="border-b border-r border-border px-4 py-3 font-semibold last:border-r-0"
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      {...props}
      className="border-b border-r border-border px-4 py-3 align-top leading-6 text-muted last:border-r-0"
    >
      {children}
    </td>
  ),

  tr: ({ children, ...props }) => (
    <tr {...props} className="last:[&_td]:border-b-0">
      {children}
    </tr>
  ),

  hr: (props) => <hr {...props} className="my-10 border-border" />,

  ArticleImage,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
