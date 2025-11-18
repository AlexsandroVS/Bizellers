import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  noIndex?: boolean;
  schema?: Record<string, any>;
}

export function SEO({ title, description, keywords, noIndex, schema }: SEOProps) {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update Meta Keywords
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }
    
    // Handle noindex
    let noIndexTag = document.querySelector('meta[name="robots"]');
    if (noIndex) {
      if (!noIndexTag) {
        noIndexTag = document.createElement('meta');
        noIndexTag.setAttribute('name', 'robots');
        document.head.appendChild(noIndexTag);
      }
      noIndexTag.setAttribute('content', 'noindex, nofollow');
    } else {
      // Ensure it's set to index, follow if it exists from a previous navigation
      if (noIndexTag) {
        noIndexTag.setAttribute('content', 'index, follow');
      }
    }

    // Handle JSON-LD Schema
    const scriptId = 'structured-data-seo';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = scriptId;
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    } else {
      if (script) {
        document.head.removeChild(script);
      }
    }

    // Cleanup on unmount
    return () => {
      if (noIndex && noIndexTag) {
        // On leaving a noindex page, we should restore the default
        noIndexTag.setAttribute('content', 'index, follow');
      }
      if (schema && script) {
        // On leaving a page with schema, remove it to not pollute the next page
        if (script.parentElement) {
          script.parentElement.removeChild(script);
        }
      }
    };
  }, [title, description, keywords, noIndex, schema]);

  return null;
}
