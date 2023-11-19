const eventApi = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export default { eventApi };
