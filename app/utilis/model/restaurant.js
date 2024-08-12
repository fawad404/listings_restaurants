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
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  service: {
    type: String, // You can adjust this type based on how you want to store the service data
    required: false, // Set to true if you want this field to be required
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
  type: {
    type: String, // URL or path to the restaurant image
    required: false, // Set to true if you want this field to be required
  },
  verified: {
    type: Boolean, // URL or path to the restaurant image
    default: false, // Set to true if you want this field to be required
  },
});

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
