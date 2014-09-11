exports.create = function(req, res) {
	if (req.body.customerId === "123" && req.body.password === "123")
	{
		res.send('hello');
	}
	else {
		res.statusCode = 401;
    	res.send("Unauthorized!");
	}
};