const axios = require("axios");
exports.stream = (req, res) => {
  const { id, number, resolution } = req.params;
  axios
    .get(
      `https://anikodcdn.net/static/media/mp4/${id}/${number}_${resolution}.mp4`,
      {
        responseType: "stream",
      }
    )
    .then((stream) => {
      res.writeHead(stream.status, stream.headers);
      stream.data.pipe(res);
    })
    .catch((err) => res.json({ status: false, msg: "Error" }));
};
