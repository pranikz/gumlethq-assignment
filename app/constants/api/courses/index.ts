export default (req, res) => {
  res.status(200).json({
    firstCourse: "Web Development",
    secondCourse: "AI",
    thirdCourse: "Mobile Development",
  });
};
