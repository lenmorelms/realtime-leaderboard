import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = mongoose.Schema(
    {
    username: { 
        type: String,
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true,
      }  
  },
  {
    timestamp: true
  }
);

// Add pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
  