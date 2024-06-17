import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

import dynamic from 'next/dynamic'

import {loadBlogPost} from '@/helpers/file-helpers'

import MDX_COMPONENTS from '@/helpers/mdx-components'

import {MDXRemote} from 'next-mdx-remote/rsc'

import {BLOG_TITLE} from '@/constants'

export async function generateMetadata({params}) {
  const post = await loadBlogPost(params.postSlug)
  return {
    title: `${post.frontmatter.title} • ${BLOG_TITLE}`,
    description: post.frontmatter.abstract
  }
}

async function BlogPost({params}) {
  const post = await loadBlogPost(params.postSlug)
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={Date.parse(post.frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote 
          source={post.content}
          components={MDX_COMPONENTS}
        />
      </div>
    </article>
  );
}

export default BlogPost;
