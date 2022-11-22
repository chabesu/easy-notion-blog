import DocumentHead from '../../components/document-head'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
  PostThumbnail,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../../lib/notion/client'
import * as imageCache from '../../lib/notion/image-cache'

export async function getStaticProps() {
  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPosts(),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ])

  posts.forEach((p) => p.OGImage && imageCache.store(p.PageId, p.OGImage))

  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPosts = ({
  posts = [],
  firstPost,
  rankedPosts = [],
  tags = [],
}) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Blog" />

      <div className={styles.mainContent}>
        <NoContents contents={posts} />

        {posts.map((post) => {
          return (
            <div className={styles.post} key={post.Slug}>
              <div className={styles.postContair}>
                <div className={styles.thumbnail}>
                  <PostThumbnail post={post} />
                </div>
                <div className={styles.postContent}>
                  <PostDate post={post} />
                  <PostTags post={post} />
                  <PostTitle post={post} />
                  <PostExcerpt post={post} />
                  <ReadMoreLink post={post} />
                </div>
              </div>
            </div>
          )
        })}

        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </div>

      <div className={styles.subContent}>
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogTagLink heading="Categories" tags={tags} />
      </div>
    </div>
  )
}

export default RenderPosts
