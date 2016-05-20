with open('data/processed/pokemon_abilities.csv') as f:
	pokemon = []

	# Skip header
	f.readline()

	for line in f.readlines():
		line = line.strip()
		parts = line.split(',')

		i = int(parts[0])
		a = int(parts[1])
		s = int(parts[2])

		if len(pokemon) != i:
			pokemon.append([])

		pokemon[i - 1].append([a, s])

	import json

	print json.dumps(pokemon, indent=4, sort_keys=True)