install:
	npm ci
gendiff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
