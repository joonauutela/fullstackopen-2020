const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {

    return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    return blogs.reduce((mostLikes, blog) => blog.likes > mostLikes ? blog.likes : mostLikes, blogs[0].likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}