const MongoClient	= require('mongodb').MongoClient;
const ObjectID		= require('mongodb').ObjectID;
const dbname		= 'Clothingbrand';
const url			= 'mongodb://localhost:27017';
//const mongoOptions	= {urlNewUrlParser : true};

const state	= {
	db : null
};

module.exports = {
	connect : (callback)=>{
		if(state.db)
		{
			callback();
		}
		else
		{
			MongoClient.connect(url,mongoOptions,(error,client)=>{
				if(error)
				{
					callback(error);
				}
				else
				{
					state.db = client.db(dbname);
					callback();
				}
			});
		}
	},

	getPrimaryKey : (_id)=>{
		return ObjectID(_id);
	},

	getDB : ()=>{
		return state.db;
	}
};
