#!/bin/bash

# Start Redis
sudo service redis-server start

# Start MongoDB
sudo systemctl start mongod

# Start PostgreSQL
sudo service postgresql start

echo "All services started!"