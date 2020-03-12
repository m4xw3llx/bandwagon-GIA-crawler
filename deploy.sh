## default log folder
export BANDWAGON_DATA_DIR=~/bandwangon-data

## build docker in project directory
docker build -t bandwagon .

## create data bind directory for docker
mkdir -p "$BANDWAGON_DATA_DIR"
cd "$BANDWAGON_DATA_DIR"
mkdir public
cd public
touch project.log
cd "$BANDWAGON_DATA_DIR"

## run docker in data bind directory
docker run -d \
  -it \
  --name bandwagon-crawler \
  -p 8081:8081 \
  --mount type=bind,source="$(pwd)"/public,target=/app/public \
  bandwagon:latest