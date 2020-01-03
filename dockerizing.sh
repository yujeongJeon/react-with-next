echo "start dockerizing!"
echo "."
echo ".."
echo "..."

sudo docker stop $(docker ps -q -a  --filter="name=leaflo-webchat-sdk")
sudo docker rm $(docker ps -q -a --filter="name=leaflo-webchat-sdk")

result=`docker images leaflo-webchat-sdk`
target=`echo $result | cut -d ' ' -f9`
sudo docker rmi $target

sudo docker build -t leaflo-webchat-sdk:v0.1 .
sudo docker run --name=leaflo-webchat-sdk -d -v /etc/localtime:/etc/localtime:ro -e TZ=Asia/Seoul -p 3001:3001 leaflo-webchat-sdk:v0.1

echo "."
echo "."
echo "."
echo "completed leaflo-webchat-sdk dockerizing!"