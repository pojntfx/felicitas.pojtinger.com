SIZE=72 && convert -resize ${SIZE}x${SIZE} icon.png icon-${SIZE}x${SIZE}.png &
SIZE=96 && convert -resize ${SIZE}x${SIZE} icon.png icon-${SIZE}x${SIZE}.png &
SIZE=128 && convert -resize ${SIZE}x${SIZE} icon.png icon-${SIZE}x${SIZE}.png &
SIZE=144 && convert -resize ${SIZE}x${SIZE} icon.png icon-${SIZE}x${SIZE}.png &
SIZE=152 && convert -resize ${SIZE}x${SIZE} icon.png icon-${SIZE}x${SIZE}.png &
SIZE=192 && convert -resize ${SIZE}x${SIZE} icon.png icon-${SIZE}x${SIZE}.png &
SIZE=384 && convert -resize ${SIZE}x${SIZE} icon.png icon-${SIZE}x${SIZE}.png &
SIZE=512 && convert -resize ${SIZE}x${SIZE} icon.png icon-${SIZE}x${SIZE}.png &
SIZE=512 && let HALFSIZE=${SIZE}/2 && convert icon.png \
	-gravity Center \
	\( -size ${SIZE}x${SIZE} \
	xc:Black \
	-fill White \
	-draw "circle ${HALFSIZE} ${HALFSIZE} ${HALFSIZE} 1" \
	-alpha Copy \
	\) -compose CopyOpacity -composite \
	-trim icon-circle.png &
