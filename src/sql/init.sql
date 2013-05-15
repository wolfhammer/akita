CREATE TABLE issuetracker_issues (
	issue_id serial PRIMARY KEY,
	timestamp timestamptz NOT NULL DEFAULT NOW(),
	author int NOT NULL,
	department int NOT NULL,
	title text NOT NULL,
	description text NOT NULL,
	open boolean NOT NULL,
	owner int
);

CREATE TABLE issuetracker_depts (
	dept_id serial PRIMARY KEY,
	name text NOT NULL
);

INSERT INTO issuetracker_depts (dept_id, name) 
VALUES
	(DEFAULT, 'Development'), 
	(DEFAULT, 'Accounting'),
	(DEFAULT, 'Client Services'),
	(DEFAULT, 'Call Center'),
	(DEFAULT, 'Fulfillment');

INSERT INTO issuetracker_issues (issue_id, timestamp, author, department, title, 
	description, open, owner) 
VALUES (DEFAULT, DEFAULT, 5561, 2, 'Bug with submit form', 
	'I caught a bug on the submit form.', 't', NULL);