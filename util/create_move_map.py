with open('data/processed/pokemon_moves.csv') as f:
	pokemon = []

	# Skip header
	f.readline()

	for line in f.readlines():
		line = line.strip()
		parts = line.split(',')

		i = int(parts[0])
		m = int(parts[1])
		l = int(parts[2])

		if len(pokemon) != i:
			pokemon.append([])

		pokemon[i - 1].append([m, l])

	import json

	print json.dumps(pokemon, indent=4, sort_keys=True)