import React from 'react'
import useSWR from 'swr'
import axios from 'axios'

import { NEXT_PUBLIC_URL } from '../../app/server-constants'
import DocumentHead from '../../components/document-head'
import { Block } from '../../lib/notion/interfaces'
import {
  BlogPostLink,
  BlogTagLink,
  NoContents,
  PostBody,
  PostDate,
  PostTags,
  PostTitle,
  PostsNotFound,
} from '../../components/blog-parts'
import SocialButtons from '../../components/social-buttons'
import LikeButton from '../../components/like-button'
import Toc from '../../components/toc'
import styles from '../../styles/blog.module.css'
import { getBlogLink } from '../../lib/blog-helpers'
import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllBlocksByBlockId,
} from '../../lib/notion/client'

export async function getStaticProps({ params: { slug } }) {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  const [blocks, rankedPosts, recentPosts, tags, sameTagPosts] =
    await Promise.all([
      getAllBlocksByBlockId(post.PageId),
      getRankedPosts(),
      getPosts(5),
      getAllTags(),
      getPostsByTag(post.Tags[0], 6),
    ])

  const fallback = {}
  fallback[slug] = blocks

  return {
    props: {
      slug,
      post,
      rankedPosts,
      recentPosts,
      tags,
      sameTagPosts: sameTagPosts.filter((p) => p.Slug !== post.Slug),
      fallback,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map((post) => getBlogLink(post.Slug)),
    fallback: 'blocking',
  }
}

const fetchBlocks = async (slug: string): Promise<Array<Block>> => {
  try {
    const { data: blocks } = await axios.get(`/api/blocks?slug=${slug}`)
    return blocks as Array<Block>
  } catch (error) {
    console.log(error)
  }
}

const includeExpiredImage = (blocks: Array<Block>): boolean => {
  const now = Date.now()

  return blocks.some((block) => {
    if (block.Type === 'image') {
      const image = block.Image
      if (
        image.File &&
        image.File.ExpiryTime &&
        Date.parse(image.File.ExpiryTime) < now
      ) {
        return true
      }
    }
    // TODO: looking for the image block in Children recursively
    return false
  })
}

const RenderPost = ({
  slug,
  post,
  rankedPosts = [],
  recentPosts = [],
  sameTagPosts = [],
  tags = [],
  fallback,
}) => {
  const { data: blocks, error } = useSWR(
    includeExpiredImage(fallback[slug]) && slug,
    fetchBlocks,
    { fallbackData: fallback[slug] }
  )

  if (error || !blocks) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead
        title={post.Title}
        description={post.Excerpt}
        urlOgImage={
          NEXT_PUBLIC_URL &&
          new URL(`/api/og-image/${post.Slug}`, NEXT_PUBLIC_URL).toString()
        }
      />

      <div className={styles.mainContent}>
        <div className={styles.post}>
          <PostDate post={post} />
          <PostTags post={post} />
          <PostTitle post={post} enableLink={false} />

          <NoContents contents={blocks} />
          <PostBody blocks={blocks} />

          <footer>
            {NEXT_PUBLIC_URL && (
              <SocialButtons
                title={post.Title}
                url={new URL(
                  getBlogLink(post.Slug),
                  NEXT_PUBLIC_URL
                ).toString()}
                id={post.Slug}
              />
            )}
            <LikeButton slug={post.Slug} post={post.Like} />
          </footer>
        </div>
      </div>

      <div className={styles.subContent}>
        <BlogPostLink
          heading="Posts in the same category"
          posts={sameTagPosts}
        />
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogPostLink heading="Latest posts" posts={recentPosts} />
        <BlogTagLink heading="Categories" tags={tags} />
        <Toc />
      </div>
    </div>
  )
}

export default RenderPost
