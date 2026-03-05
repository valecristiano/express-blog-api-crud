let postsData = require("../data/postsData");

//index
function index(req, res) {
  //prova errore 500:
  // console.log(a.b);

  console.log("Read all elements");

  let filteredposts = [...postsData];

  const filterTagvalue = req.query.search;
  console.log(filterTagvalue);
  //filtro tag
  if (filterTagvalue) {
    filteredposts = filteredposts.filter((post) => {
      const normalizedValue = filterTagvalue.toLowerCase().trim();
      return post.tags.some((tag) => tag.toLowerCase().trim().includes(normalizedValue));
    });
  }
  //filtro title
  const filterTitlevalue = req.query.query;
  console.log(filterTitlevalue);

  if (filterTitlevalue) {
    filteredposts = filteredposts.filter((post) => {
      const normalizedValue = filterTitlevalue.toLowerCase().trim();
      const normalizedTitle = post.title.toLowerCase().trim();
      return normalizedTitle.includes(normalizedValue) || post.tags.some((tag) => tag.toLowerCase().trim().includes(normalizedValue));
    });
  }

  const responseData = {
    result: filteredposts,
    success: true,
  };
  res.json(responseData);
}

//show
function show(req, res) {
  console.log(`Read element with id:${req.params.id} `);
  const postId = parseInt(req.params.id);
  const post = postsData.find((post) => post.id === postId);

  if (!post) {
    const responseData = {
      result: `Blog post with id: ${postId} not found`,
      success: false,
    };
    return res.status(404).json(responseData);
  }

  const responseData = {
    result: post,
    success: true,
  };
  res.json(responseData);
}

//Store
function store(req, res) {
  console.log("Create new element");
  console.log(req.body);

  const newId = postsData[postsData.length - 1].id + 1;

  const { title, content, image, tags } = req.body;

  const newPost = {
    id: newId,
    title,
    content,
    image,
    tags,
  };

  postsData.push(newPost);

  const responseData = {
    result: "New element created",
    success: true,
    message: newPost,
  };
  console.log(postsData);

  res.status(201).json(responseData);
}

//Update
function update(req, res) {
  console.log(`Update element with id:${req.params.id} `);

  const postId = parseInt(req.params.id);
  const post = postsData.find((post) => post.id === postId);

  if (!post) {
    const responseData = {
      result: `Blog post with id: ${postId} not found`,
      success: false,
    };
    return res.status(404).json(responseData);
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  const responseData = {
    result: "Element updated",
    success: true,
    newpost: post,
  };

  console.log(postsData);

  res.json(responseData);
}

//Modify
function modify(req, res) {
  console.log(`Modify element with id:${req.params.id} `);

  const postId = parseInt(req.params.id);
  const post = postsData.find((post) => post.id === postId);

  if (!post) {
    const responseData = {
      result: `Blog post with id: ${postId} not found`,
      success: false,
    };
    return res.status(404).json(responseData);
  }

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.image) post.image = req.body.image;
  if (req.body.tags) post.tags = req.body.tags;

  const responseData = {
    result: "element modified",
    success: true,
    update: post,
  };

  console.log(postsData);

  res.json(responseData);
}

//Delete
function destroy(req, res) {
  console.log(`Delete element with id:${req.params.id} `);
  const postId = parseInt(req.params.id);
  const post = postsData.find((post) => post.id === postId);

  if (!post) {
    const responseData = {
      result: `Blog post with id: ${postId} not found`,
      success: false,
    };
    return res.status(404).json(responseData);
  }
  postsData = postsData.filter((post) => post.id !== postId);

  const responseData = {
    result: post,
    message: `element with id: ${postId} deleted`,
    success: true,
  };

  console.log("new Array:", postsData);

  res.json(responseData);
}

module.exports = { index, show, store, update, modify, destroy };
