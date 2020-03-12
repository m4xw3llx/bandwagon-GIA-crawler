export BANDWAGON_DATA_DIR=~/banwangon-data

mkdir -p "$BANDWAGON_DATA_DIR"
cd $BANDWAGON_DATA_DIR
mkdir public
cd public
touch project.log

docker run -it \ 
    --mount type=bind,source="$BANDWAGON_DATA_DIR/public",target=/app/public \ 
    -p 8081:8081 \ 
    --name bandwagon-crawler