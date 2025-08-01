const notesModel = require("../models/notes");

async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      res.status(400).send({ message: "Title and content both are required" });
    const notes = await notesModel.create({
      userId: req.user._id,
      title,
      content,
    });
    return res.status(200).send({
      message: "Notes create successfully",
      notes: notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error?.message || "something went wrong",
    });
  }
}

async function getNotes(req, res) {
  try {
    const limit = parseInt(req.query && req.query.limit ? req.query.limit : 10);
    const pagination = parseInt(req.query && req.query.pagination ? req.query.pagination : 0);
    if (!req?.user?._id)
      res.status(400).send({ message: "Missing user details" });
    const notes = await notesModel.find({ userId: req.user._id },{userId:0}).sort({createdAt:-1}).limit(limit).skip(pagination*limit);
    const count = await notesModel.countDocuments({ userId: req.user._id });
    return res.status(200).send({
      message: "Notes create successfully",
      notes: notes,
      count: count,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error?.message || "something went wrong",
    });
  }
}

module.exports = { getNotes, createNotes };
