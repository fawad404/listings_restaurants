import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  geolocation: {
    lat: {
      type: Number,
      required: false,
    },
    lon: {
      type: Number,
      required: false,
    },
  },
  service: {
    type: [String], // Array of strings
    required: false,
  },  
  tags: {
    type: [String], // Array of strings to store multiple tags
    required: false, // Set to true if you want this field to be required
  },
  city: {
    type: String,
    required: false, // Set to true if you want this field to be required
  },
  state: {
    type: String,
    required: false, // Set to true if you want this field to be required
  },
  zipCode: {
    type: String,
    required: false, // Set to true if you want this field to be required
  },
  restaurantImg: {
    type: String, // URL or path to the restaurant image
    required: false, // Set to true if you want this field to be required
  },
  slug: {
    type: String, // URL or path to the restaurant slug
    required: true, // Set to true if you want this field to be required
  },
  seoDescription: {
    type: String, // URL or path to the restaurant metadescription
    required: true, // Set to true if you want this field to be required
  },
  type: {
    type: String, // URL or path to the restaurant type
    required: false, // Set to true if you want this field to be required
  },
  verified: {
    type: Boolean, // URL or path to the restaurant image
    default: false, // Set to true if you want this field to be required
  },
});

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
