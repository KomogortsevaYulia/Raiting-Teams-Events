#!/bin/bash
_POSTFIX=_dev
_SQL_BAK_NAME=$(date +%Y-%m-%d-%H.%M.%S)$_POSTFIX.sql
_DB_NAME=raiting_team_events
_BAK_PATH=../../db/

PGPASSWORD="root" pg_dump -U postgres -d $_DB_NAME > $_BAK_PATH$_SQL_BAK_NAME
