import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
    what: {
        type: String,
        required: true, // Mark 'what' as a required field
      },
      location: {
        type: String,
        required: false, // Mark 'location' as a required field
      },
    }, {
      timestamps: true, // Add createdAt and updatedAt fields
});

const Search = mongoose.models.Search || mongoose.model('Search', searchSchema);

export default Search;
