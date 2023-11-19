import userModel from "./user.model";

const findOne = async (query, field) => {
  try {
    let checkUser = await userModel.findOne(query).select([field]);

    return checkUser;
  } catch (error) {
    return { error: false, message: error.message };
  }
};

const findAll = async (query) => {
  try {
    let { search } = query;

    let searchQuery = search.length ? { username: new RegExp(search, "gi") } : {};
    return await userModel.find(searchQuery);
  } catch (error) {
    return { error: false, message: error.message };
  }
};

export default { findOne, findAll };
