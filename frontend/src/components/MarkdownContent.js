import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 支持 GitHub 风格 Markdown
import rehypeRaw from 'rehype-raw'; // 支持解析 HTML（如 iframe）
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 高亮主题
import './MarkdownContent.css';

function MarkdownContent({ content }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // 支持表格、任务列表等
        rehypePlugins={[rehypeRaw]} // 允许解析 HTML
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          iframe({ node, ...props }) {
            return (
              <iframe
                {...props}
                style={{
                  width: '100%',
                  height: '500px',
                  border: 'none',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
                title={props.title || 'Embedded Content'}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownContent;
