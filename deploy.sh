export BANDWAGON_DATA_DIR=~/banwangon-data

mkdir -p "$BANDWAGON_DATA_DIR"
cd "$BANDWAGON_DATA_DIR"
mkdir public
cd public
touch project.log
cd "$BANDWAGON_DATA_DIR"

docker run -d \
  -it \
  --name bandwagon-crawler \
  -p 8081:8081 \
  --mount type=bind,source="$(pwd)"/public,target=/app/public \
  bandwagon:latest