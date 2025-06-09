const { spawn } = require("child_process");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure the FFmpeg binary path is correct
const ffmpegPath = path.join(__dirname, "ffmpeg", "ffmpeg");

app.get("/", (req, res) => {
  res.send("FFmpeg Render App is running");
});

app.get("/convert", (req, res) => {
  // Replace these with actual files you upload or manage
  const inputFile = path.join(__dirname, "input.mp4");
  const outputFile = path.join(__dirname, "output.mp4");

  const ffmpeg = spawn(ffmpegPath, ["-i", inputFile, outputFile]);

  ffmpeg.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ffmpeg.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ffmpeg.on("close", (code) => {
    console.log(`ffmpeg exited with code ${code}`);
    res.send(`Conversion finished with exit code ${code}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
