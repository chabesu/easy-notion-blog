import DocumentHead from '../../../components/document-head'
import styles from '../../styles/page.module.css'

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />

    <div>
      <iframe
        className={styles.contact}
        src="https://www.noway-form.com/f/41b1d91e-7601-40a7-86df-b2c7208f4666/embed"
      />
    </div>
  </div>
)

export default RenderPage
