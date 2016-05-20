#!/bin/bash
mkdir -p static/img

for (( x=1; x<494; x++ ))
do
    wget "http://pokeapi.co/media/sprites/pokemon/$x.png" -qO "static/img/$x.png" && echo "Got picture #$x"
done
