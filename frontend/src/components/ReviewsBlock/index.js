const ReviewsBlock = () => {
    // on app.js render, store all reviews into redux store as its own slice of state
    // ^done
    // when we load one particular business page, we can go to redux store to get all reviews
    // ^DOING
    // and useSelector to FILTER the ones where businessId matches current business.id
    return (
        <div>Hello from reviews block</div>
    )
}

export default ReviewsBlock;