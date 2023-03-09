#!/bin/bash

getEnv() {
    local _envLocation_=$1

    while read _line_; do
        if [[ -z $(echo ${_line_} | grep "#") ]]; then
            eval ${_line_}
        fi
    done < ${_envLocation_}
}

getEnv ./apps/backend/.env

docker exec -it $(docker ps -q --filter name=${POSTGRES_HOST}) psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} ||
	echo "컨테이너를 실행해주세요"

