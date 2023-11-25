#!/bin/bash
set -e

# wait for Postgres to start
# function postgres_ready() {
# python << END
# import sys
# import psycopg2
# try:
#     conn = psycopg2.connect(dbname="$POSTGRES_DB", user="$POSTGRES_USER", password="$POSTGRES_PASSWORD", host="db")
# except psycopg2.OperationalError:
#     sys.exit(-1)
# sys.exit(0)
# END
# }

# until postgres_ready; do
#   >&2 echo "Postgres is unavailable - sleeping"
#   sleep 1
# done

# >&2 echo "Postgres is up - executing command"

# sleep 30
# pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" < /docker-entrypoint-initdb.d/psql_backup.sql
# psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < /docker-entrypoint-initdb.d/psql_backup.sql
psql -U postgres -d raiting_team_events < /docker-entrypoint-initdb.d/psql_backup.sql
