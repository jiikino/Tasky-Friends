import userModel from "../models/userModel.js";

// Choose/update pet
export const choosePet = async (req, res) => {
    try {
      const { pet } = req.body;
      const allowedPets = ['cat', 'bunny', 'dog', 'turtle'];
  
      if (!pet || !allowedPets.includes(pet)) {
        return res.status(400).json({ success: false, message: 'Invalid pet' });
      }
  
      const userId = req.userId; // from userAuth
      const user = await userModel.findByIdAndUpdate(userId, { pet }, { new: true });
  
      if (!user) {
        return res.json({ success: false, message: 'User not found' });
      }
  
      return res.json({ success: true, message: 'Pet saved', pet: user.pet });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId; // from userAuth middleware
        const user = await userModel.findById(userId);

        if(!user) {
            return res.json({success: false, message: "User not found"});
        }

        return res.json({
            success: true,
            message: "User found",
            userData: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                pet: user.pet,
            }
        });

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}