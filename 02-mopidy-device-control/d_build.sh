pushd ..
docker build -f 02-mopidy-device-control/Dockerfile -t $(cat 02-mopidy-device-control/tag):$(uname -i) .
popd
