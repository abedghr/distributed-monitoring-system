#!/bin/bash
sleep 10

mongosh --host central_mongo1:27017 <<EOF
  var cfg = {
    "_id": "myReplicaSet",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "central_mongo1:27017",
        "priority": 2
      },
      {
        "_id": 1,
        "host": "central_mongo2:27017",
        "priority": 0
      },
      {
        "_id": 2,
        "host": "central_mongo3:27017",
        "priority": 0
      }
    ]
  };
  rs.initiate(cfg);
EOF