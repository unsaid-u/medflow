#!/bin/bash

DB_FILE="../../../db/data/database.sqlite"
# SQL_FILE1="dummyData.sql"
SQL_FILE1="dummyClinicianData.sql"
SQL_FILE2="dummyPatientData.sql"
SQL_FILE3="dummyVisitData.sql"

# Run the SQL commands on the SQLite database
echo "Running $SQL_FILE1"   
sqlite3 "$DB_FILE" < "$SQL_FILE1"
echo "Running $SQL_FILE2"
sqlite3 "$DB_FILE" < "$SQL_FILE2"
echo "Running $SQL_FILE3"
sqlite3 "$DB_FILE" < "$SQL_FILE3"

echo "Done, added dummy data in the tables for better testing"