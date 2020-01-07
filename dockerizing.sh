echo "start dockerizing!"
echo "."
echo ".."
echo "..."

sudo docker stop $(docker ps -q -a  --filter="name=leaflo-web-chat")
sudo docker rm $(docker ps -q -a --filter="name=leaflo-web-chat")

result=`docker images leaflo-web-chat`
target=`echo $result | cut -d ' ' -f9`
sudo docker rmi $target

sudo docker build -t leaflo-web-chat:v0.1 .
sudo docker run --name=leaflo-web-chat --oom-score-adj=-1000 -d -v /etc/localtime:/etc/localtime:ro -e TZ=Asia/Seoul -p 4001:4001 leaflo-web-chat:v0.1

echo "."
echo "."
echo "."
echo "completed leaflo-web-chat dockerizing!"