const AddressSchema = require("../../../database_schema/profile/addressSchema");

const getUserAddress = async (req, res) => {
  const { userId } = req.params;
  try {
    const addressList = await AddressSchema.find({ userId: userId });
    res.status(200).json(addressList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addUserAddress = async (req, res) => {
  const { userId, firstName, lastName, address, province, postalCode } =
    req.body;
  try {
    if (!userId) {
      throw Error("you don't have a permission");
    }
    if (!firstName) {
      throw Error("please fill your first name");
    }
    if (!lastName) {
      throw Error("please fill your last name");
    }
    if (!address) {
      throw Error("please fill your address");
    }
    if (!province) {
      throw Error("please fill your province");
    }
    if (!postalCode) {
      throw Error("please fill your postal code");
    }
    await AddressSchema.create({
      userId,
      firstName,
      lastName,
      address,
      province,
      postalCode,
    });
    res.status(200).json({ mssg: "added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  const { userId } = req.params;
  const { addressId } = req.query;
  try {
    const address = await AddressSchema.findOne({ _id: addressId });
    if (address.userId == userId) {
      await AddressSchema.deleteOne({ _id: addressId });
      res.status(200).json({ mssg: "deleted successfully" });
    } else {
      throw Error("you don't have a permission to delete");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserAddress, addUserAddress, deleteAddress };
