import styles from './BusinessTitleBlock.module.css'

const BusinessTitleBlock = () => {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h2>food title</h2>
                <span>* * * * *</span>
            </div>
        </div>
    );
};

export default BusinessTitleBlock;