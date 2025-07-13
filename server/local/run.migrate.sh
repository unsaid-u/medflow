# Run DB migrations 
# since there are foreign key constraints, we need to run the migrations in the correct order

# * first run the migrations for the patients table
npm run migrate:single -- 20250712080613_create_patients_table

# * then run the migrations for the clinicians table
npm run migrate:single -- 20250712080643_create_clinicians_table

# * then run the migrations for the visits table
npm run migrate:single -- 20250712080647_create_visits_table