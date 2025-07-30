const router = require("express").Router();
const notesController = require("../controller/notes");
const Auth = require("../middleware/auth")

router.post("/", Auth.verifyJWTToken, notesController.createNotes);
router.get("/", Auth.verifyJWTToken, notesController.getNotes);

module.exports = router;
