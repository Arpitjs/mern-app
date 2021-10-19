function catchAsync(thatFn) {
    return (req, res, next) => {
        thatFn(req, res, next)
        .catch(err => next(err))
    }
}

module.exports = catchAsync