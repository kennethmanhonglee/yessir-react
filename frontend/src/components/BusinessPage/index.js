import styles from './BusinessPage.module.css'
import BusinessTitleBlock from '../BusinessTitleBlock';
import ContentBlock from '../ContentBlock'

const BusinessPage = () => {
    return (
        <div className={styles.main}>
            <BusinessTitleBlock />
            <ContentBlock />
        </div>
    );
};

export default BusinessPage;