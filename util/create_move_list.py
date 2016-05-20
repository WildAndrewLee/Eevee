with open('data/processed/move_names.csv') as f:
	moves = []

	# Skip header
	f.readline()

	for line in f.readlines():
		line = line.strip()
		parts = line.split(',')

		m = parts[1]

		moves.append(m)

	import json

	print json.dumps(moves, indent=4, sort_keys=True)