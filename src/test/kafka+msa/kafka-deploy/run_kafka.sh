#!/bin/bash

COMPOSE_FILE="docker-compose.yml"

start() {
  echo "Starting Kafka and Zookeeper..."
  docker-compose -f $COMPOSE_FILE up -d
}

stop() {
  echo "Stopping Kafka and Zookeeper..."
  docker-compose -f $COMPOSE_FILE down
}

status() {
  echo "Checking status of Kafka and Zookeeper..."
  docker-compose -f $COMPOSE_FILE ps
}

logs() {
  echo "Fetching logs from Kafka and Zookeeper..."
  docker-compose -f $COMPOSE_FILE logs -f
}

case $1 in
  start)
    start
    ;;
  stop)
    stop
    ;;
  status)
    status
    ;;
  logs)
    logs
    ;;
  *)
    echo "Usage: $0 {start|stop|status|logs}"
    exit 1
    ;;
esac