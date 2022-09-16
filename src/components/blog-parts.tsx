import React from 'react'
import Link from 'next/link'

import NotionBlocks from './notion-block'
import {
  getBeforeLink,
  getBlogLink,
  getDateStr,
  getTagLink,
  getTagBeforeLink,
} from '../lib/blog-helpers'
import styles from '../styles/blog-parts.module.css'

export const PostDate = ({ post }) => (
  <div className={styles.postDate}>
    {post.Date ? getDateStr(post.Date) : ''}
  </div>
)

export const PostThumbnail = ({ post }) => (
  <div className={styles.thumbnail}>
    <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
      <img
        src={`/notion_images/${post.PageId}.png`}
        width={300}
        height={160}
        alt="thumbnail"
      />
    </Link>
  </div>
)

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <h3 className={styles.postTitle}>
      {enableLink ? (
        <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
          <a>{postTitle}</a>
        </Link>
      ) : (
        postTitle
      )}
    </h3>
  )
}

export const PostTags = ({ post }) => (
  <div className={styles.postTags}>
    {post.Tags &&
      post.Tags.length > 0 &&
      post.Tags.map((tag) => (
        <Link href="/blog/tag/[tag]" as={getTagLink(tag)} key={tag} passHref>
          <a>{tag}</a>
        </Link>
      ))}
  </div>
)

export const PostExcerpt = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Excerpt ? post.Excerpt : ''}</p>
  </div>
)

export const PostBody = ({ blocks }) => (
  <div className={styles.postBody}>
    <NotionBlocks blocks={blocks} />
  </div>
)

export const ReadMoreLink = ({ post }) => (
  <div className={styles.readMoreLink}>
    <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
      <a className={styles.readMore}>Read more</a>
    </Link>
  </div>
)

export const NextPageLink = ({ firstPost, posts, tag = '' }) => {
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date === lastPost.Date) return null

  return (
    <div className={styles.nextPageLink}>
      <Link
        href={tag ? '/blog/tag/[tag]/before/[date]' : '/blog/before/[date]'}
        as={
          tag
            ? getTagBeforeLink(tag, lastPost.Date)
            : getBeforeLink(lastPost.Date)
        }
        passHref
      >
        <a>Next page ＞</a>
      </Link>
    </div>
  )
}

export const NoContents = ({ contents }) => {
  if (!!contents && contents.length > 0) return null

  return <div className={styles.noContents}>There are no contents yet</div>
}

export const BlogPostLink = ({ heading, posts }) => (
  <div className={styles.blogPostLink}>
    <h3>{heading}</h3>
    <NoContents contents={posts} />
    <PostLinkList posts={posts} />
  </div>
)

export const BlogTagLink = ({ heading, tags }) => (
  <div className={styles.blogTagLink}>
    <h3>{heading}</h3>
    <NoContents contents={tags} />
    <TagLinkList tags={tags} />
  </div>
)

export const PostLinkList = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.Slug}>
            <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
              <a>{post.Title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <ul>
      {tags.map((tag) => {
        return (
          <li key={tag}>
            <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
              <a>{tag}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const PostsNotFound = () => (
  <div className={styles.postsNotFound}>
    Woops! did not find the posts, redirecting you back to the blog index
  </div>
)
