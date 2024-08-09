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
});

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
