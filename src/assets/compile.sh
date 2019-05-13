#!/bin/bash
SIZE=72 && convert -resize ${SIZE}x${SIZE} icon.webp icon-${SIZE}x${SIZE}.webp &
SIZE=96 && convert -resize ${SIZE}x${SIZE} icon.webp icon-${SIZE}x${SIZE}.webp &
SIZE=128 && convert -resize ${SIZE}x${SIZE} icon.webp icon-${SIZE}x${SIZE}.webp &
SIZE=144 && convert -resize ${SIZE}x${SIZE} icon.webp icon-${SIZE}x${SIZE}.webp &
SIZE=152 && convert -resize ${SIZE}x${SIZE} icon.webp icon-${SIZE}x${SIZE}.webp &
SIZE=192 && convert -resize ${SIZE}x${SIZE} icon.webp icon-${SIZE}x${SIZE}.webp &
SIZE=384 && convert -resize ${SIZE}x${SIZE} icon.webp icon-${SIZE}x${SIZE}.webp &
SIZE=512 && convert -resize ${SIZE}x${SIZE} icon.webp icon-${SIZE}x${SIZE}.webp &
SIZE=512 && let HALFSIZE=${SIZE}/2 && convert icon.webp \
	-gravity Center \
	\( -size ${SIZE}x${SIZE} \
	xc:Black \
	-fill White \
	-draw "circle ${HALFSIZE} ${HALFSIZE} ${HALFSIZE} 1" \
	-alpha Copy \
	\) -compose CopyOpacity -composite \
	-trim icon-circle.webp &
mogrify -format webp *.*
rm *.png
rm *.jpg
rm *~
