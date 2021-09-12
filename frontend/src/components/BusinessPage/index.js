import styles from './BusinessPage.module.css'
import BusinessTitleBlock from '../BusinessTitleBlock';

const BusinessPage = () => {
    return (
        <div className={styles.main}>
            <BusinessTitleBlock />
            <div>
                placeholder for contentblock
            </div>
        </div>
    );
};

export default BusinessPage;