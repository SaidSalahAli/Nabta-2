import React, { useEffect } from 'react';

export default function SEO({ title, description, keywords, image, url }) {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title ? `${title} | منصة نبتة` : 'منصة نبتة - محتوى تربوي وتعليمي للأطفال';
    document.title = formattedTitle;

    // Helper function to update meta tags
    const updateMetaTag = (selector, attribute, value) => {
      if (!value) return;
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, value);
      } else {
        // If it doesn't exist, create it
        const newMeta = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)[1];
          newMeta.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)[1];
          newMeta.setAttribute('property', prop);
        }
        newMeta.setAttribute(attribute, value);
        document.head.appendChild(newMeta);
      }
    };

    // 2. Description
    const defaultDesc = 'منصة نبتة لصناعة المحتوى التربوي والتعليمي المبتكر للأطفال، ودعم الأمهات والآباء بأدوات وأساليب تربوية إبداعية وأوراق عمل وتطبيقات متميزة.';
    const finalDesc = description || defaultDesc;
    updateMetaTag('meta[name="description"]', 'content', finalDesc);
    updateMetaTag('meta[property="og:description"]', 'content', finalDesc);
    updateMetaTag('meta[property="twitter:description"]', 'content', finalDesc);

    // 3. Keywords
    const defaultKeywords = 'منصة نبتة, تعليم الأطفال, كرتون أطفال, أوراق عمل أطفال, تطبيقات أطفال تعليمية, تربية الأطفال, Nabta Platform';
    const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
    updateMetaTag('meta[name="keywords"]', 'content', finalKeywords);

    // 4. URL
    const finalUrl = url ? `https://www.nabtastudio.com${url}` : 'https://www.nabtastudio.com/';
    updateMetaTag('meta[property="og:url"]', 'content', finalUrl);
    updateMetaTag('meta[property="twitter:url"]', 'content', finalUrl);

    // 5. Title in OG/Twitter
    updateMetaTag('meta[property="og:title"]', 'content', formattedTitle);
    updateMetaTag('meta[property="twitter:title"]', 'content', formattedTitle);

    // 6. Image
    const defaultImg = 'https://www.nabtastudio.com/favicon.png';
    const finalImg = image || defaultImg;
    updateMetaTag('meta[property="og:image"]', 'content', finalImg);
    updateMetaTag('meta[property="twitter:image"]', 'content', finalImg);
  }, [title, description, keywords, image, url]);

  return null; // This component doesn't render anything visually
}
