import DocumentHead from '../components/document-head'
import ExtLink from '../components/ext-link'
import styles from '../styles/page.module.css'

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />

    <div>
      <h2>About</h2>
      <p>easy-notion-blogのこと、プログラミングのことを書いています。</p>
      <h2>Profile</h2>
      <p>プログラミング勉強中の機械系エンジニアです。</p>
      <p>
        詳しいプロフィールはTwitter(
        <ExtLink href="https://twitter.com/ChabesuB">@ChabesuB</ExtLink>
        )に載せています。
      </p>
      <h2>Link</h2>
      <ul>
        <li>
          <ExtLink href="https://zatsugaku-engineer.com/">
            雑学エンジニアブログ
          </ExtLink>
        </li>
        <li>
          <ExtLink href="https://note.com/chabesu_blog">note</ExtLink>
        </li>
      </ul>
    </div>
  </div>
)

export default RenderPage
