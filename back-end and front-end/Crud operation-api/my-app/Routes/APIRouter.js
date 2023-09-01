const express = require("express")
const router = express.Router()
const empoly = require("../Controller/EmpolyeeController")
const user = require("../Controller/userRegisterController")
const auth = require("../middleware/auth")
// const cors = require("cors")

router.get("/employees",auth,empoly.index)
router.get("/:id",empoly.show)
router.get("/search/:name",empoly.search)
router.post("/add",auth,empoly.add)
router.put("/update/:id",auth,empoly.update)
router.delete("/delete/:employeeId",empoly.remove)
router.post("/register",user.register_user)
router.post("/login",user.user_login)
router.get('/checkUserAuth',auth,function(req,resp){
    resp.status(200).send({success:true,msg:"User Is AUthenticated"})
});



module.exports = router



