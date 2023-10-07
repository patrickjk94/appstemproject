const mongoose = require("mongoose");
const { UUID } = require("mongoose/lib/types");
 
const ArticleSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  job_id: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});
 
const ArticleModel = mongoose.model("Article", ArticleSchema);

module.exports = ArticleModel;
