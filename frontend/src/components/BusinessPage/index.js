import styles from './BusinessPage.module.css'
import BusinessTitleBlock from '../BusinessTitleBlock';
import ContentBlock from '../ContentBlock'

const BusinessPage = ({ businessesIsLoaded }) => {
    return (
        <div className={styles.main}>
            <BusinessTitleBlock businessesIsLoaded={businessesIsLoaded} />
            <ContentBlock businessesIsLoaded={businessesIsLoaded} />
        </div>
    );
};

export default BusinessPage;