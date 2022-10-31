const getPosts = (req, res) => {
  return res.status(200).send({
    posts: [{ title: 'First Post', content: 'This is the first post!' }],
  });
};

export default getPosts;
