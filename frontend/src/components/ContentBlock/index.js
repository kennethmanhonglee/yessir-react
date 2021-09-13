import styles from './ContentBlock.module.css';

const ContentBlock = () => {
    return (
        <>
            {/* general structure, might create individual components later */}
            <div className={styles.contentBlockButtons}>Content block buttons</div>
            <div className={styles.locationAndAddress}>Location and address</div>
            <div>Reviews</div>
        </>
    )
}

export default ContentBlock;