const express = require('express');
const router = express.Router();

router.get('/',async function(req, res, next) {
	
    	try{
            res.status(200).json({status:"OK", "dbconnection":"sql"});
            console.log("connection successful");
         }catch (err) {
        res.status(500).json({status:"failed", "dbconnection":"sql"});
        console.log("connection failed", err);
        }
				
});

module.exports = router;