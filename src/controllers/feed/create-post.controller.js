const createPost = (req, res) => {
  const { title, content } = req.body;
  return res.status(201).send({
    message: `Post created successfully`,
    post: { id: new Date().toISOString(), title, content },
  });
};

export default createPost;
