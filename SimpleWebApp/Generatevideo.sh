
ECHO OFF
ECHO Hello World
/home/videoinaclick0710/ffmpeg-4.0.2-64bit-static/ffmpeg -i $1  -i $2 -filter_complex "[0:v][1:v] overlay=1:1:" -pix_fmt yuv420p -c:a copy $3
/home/videoinaclick0710/ffmpeg-4.0.2-64bit-static/ffmpeg -i $3 -vf palettegen $4
/home/videoinaclick0710/ffmpeg-4.0.2-64bit-static/ffmpeg -v warning -i $3 -i $4  -lavfi "paletteuse" -y $5
