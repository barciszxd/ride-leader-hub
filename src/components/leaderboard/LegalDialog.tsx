import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

interface LegalDialogProps {
  title: string;
  markdownPath: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LegalDialog = ({ title, markdownPath, open, onOpenChange }: LegalDialogProps) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setError(null);
      setContent('');
      
      fetch(markdownPath)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load content');
          }
          return response.text();
        })
        .then((text) => {
          setContent(text);
          setIsLoading(false);
        })
        .catch((err) => {
          setError('Inhalt konnte nicht geladen werden.');
          setIsLoading(false);
          console.error('Failed to load markdown:', err);
        });
    } else {
      // Reset content when dialog closes
      setContent('');
    }
  }, [open, markdownPath]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}
          {!isLoading && !error && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-xl font-bold mt-0 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-semibold mt-6 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-semibold mt-4 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="mb-3 text-sm text-muted-foreground">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-5 mb-3 text-sm text-muted-foreground">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 text-sm text-muted-foreground">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <table className="w-full border-collapse mb-4 text-sm">
                      {children}
                    </table>
                  ),
                  thead: ({ children }) => <thead className="border-b">{children}</thead>,
                  tbody: ({ children }) => <tbody>{children}</tbody>,
                  tr: ({ children }) => <tr className="border-b">{children}</tr>,
                  th: ({ children }) => <th className="text-left py-2 px-2 font-medium">{children}</th>,
                  td: ({ children }) => <td className="py-2 px-2 text-muted-foreground">{children}</td>,
                  hr: () => <hr className="my-6 border-border" />,
                  code: ({ children }) => (
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">{children}</code>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
