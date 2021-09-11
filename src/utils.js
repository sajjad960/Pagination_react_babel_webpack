const paginate = (follower) => {
  const itemPerPage = 10;
  const pages = Math.ceil(follower.length / itemPerPage);

  const newFollowers = Array.from({ length: pages }, (_, index) => {
    const start = index * itemPerPage;
    return follower.slice(start, start + itemPerPage);
  });
  return newFollowers;
};

export default paginate;
